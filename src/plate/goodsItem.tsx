import * as React from 'react';
import {getGoodsImageHeight, px2rem, getGoodsUrl} from './commonFun';
import {ImageService} from './service/service';


interface BasicItemProps {
    plate_type: string,
    url_website: string,
    image_url: string,
    imgDefault: string,
    plate_code: string,
    style_name: string,
    content_id: string,
    is_need_lazyLoad: string,
    content_name: string,
    plateAttrBean: string,
    sizeInfo: {
        x: string,
        y: string,
        w: string,
        h: string
    },
    boxInfo:{
        x: string,
        y: string,
        w: string,
        h: string
    }
    boxSize: {
        x: string,
        y: string,
        w: string,
        h: string
    },
    index: number,
    goods_list: {
        product_id: string,
        imgUrl: string,
        imgUrl_320_320: string,
        product_name: string,
        sales_price: number,
        market_price: number,
        brand_name: string,
        brand_code: string,
        displayTag: string,
        stock: number,
        colorProducts: [
            {
                colorCode: string,
                colorCodeId: string,
                colorName: string,
                colorSeriesCode: string,
                colorSeriesName: string,
                cpStatus: number,
                imgUrl: string,
                stock: number,
            }
            ],
        tagPosition: string,
        imgPx: string,
        icon: string,
    }
}

interface GoodsItemProps {
    data: BasicItemProps
}


export function cleanGoodsProps(itemProps: any): BasicItemProps {
    let {plate_type, url_website, image_url, imgDefault, plate_code, style_name, content_id, is_need_lazyLoad, content_name, sizeInfo, goods_list, index, plateAttrBean,boxSize,boxInfo} = itemProps;
    return {
        plate_type,
        url_website,
        image_url,
        imgDefault,
        plate_code,
        style_name,
        content_id,
        is_need_lazyLoad,
        content_name,
        sizeInfo,
        boxInfo,
        boxSize,
        goods_list,
        index,
        plateAttrBean,
    };
}


//商品项外层标签
let GoodsBoxTag = (props: GoodsItemProps) => {
    let {style_name, content_id, plate_code, sizeInfo} = props.data;

    //设置面板内容的样式
    let goodsBoxStyle: {
        position: 'absolute' | 'relative' | 'fixed',
        [id: string]: any
    } = {
        position: "absolute",
        width: sizeInfo.w + 'rem',
        height: sizeInfo.h + 'rem',
        top: sizeInfo.y + 'rem',
        left: sizeInfo.x + 'rem',
        lineHeight: sizeInfo.h + 'rem',
    };

    return (
        <div className={'goods_item list_item' + style_name}
             data-bgtj={'plate|' + plate_code + '|' + content_id} style={goodsBoxStyle}>
        </div>
    )
};

let listItemPicTag = (props: GoodsItemProps) => {
    let {goods_list, sizeInfo, index, image_url,boxSize,boxInfo} = props.data;
    let imageHeight = getGoodsImageHeight( 100, boxInfo,boxSize);
    let goodsListStyle = {
        width: sizeInfo['w'] + 'rem',
        height: imageHeight + 'rem',
    };
    return (
        <div className='list_item_pic' style={goodsListStyle}>
            <a href={getGoodsUrl(goods_list)} style={{width: '100%', height: '100%'}}>
                <img src={image_url} data-original={image_url} className="lazy_fadein"
                     style={{width: '100%', height: '100%'}} alt=""/>
            </a>
        </div>

    )
};

let listItemDateTag = (props: GoodsItemProps) => {
    let {goods_list, sizeInfo, index, image_url,boxSize,boxInfo} = props.data;
    let imageHeight = getGoodsImageHeight( 100, boxInfo,boxSize);
    let goodsListStyle = {
        width: sizeInfo['w'] + 'rem',
        height: imageHeight + 'rem',
    };
    return (
        <div className="list_item_data flex-item-1">
            <a href={getGoodsUrl(goods_list)}>
                <h3 className='data_title'>{goods_list['product_name']}</h3>
                <p className='goods_price'>
                    <span className="current_price">{goods_list['sales_price']}</span>
                </p>
            </a>
        </div>
    )
};


class GoodsItem extends React.Component<GoodsItemProps, any> {
    constructor(props: GoodsItemProps) {
        super(props);
    }

    render() {
        let {image_url, style_name, content_id, plate_code, sizeInfo, goods_list,boxSize,boxInfo} = this.props.data;
        //设置面板内容的样式
        let goodsBoxStyle: {
            position: 'absolute' | 'relative' | 'fixed',
            [id: string]: any
        } = {
            position: "absolute",
            width: sizeInfo.w + 'rem',
            height: sizeInfo.h + 'rem',
            top: sizeInfo.y + 'rem',
            left: sizeInfo.x + 'rem',
            lineHeight: sizeInfo.h + 'rem',
        };
        let imageService= ImageService.init();
        let imgUrl = imageService.changeImageUrl(image_url, { width: 350, quality: 'm2' });
        let lazyImageUrl = imageService.lazyImageUrl;

        if (goods_list) {
            let imageHeight = getGoodsImageHeight(100,  boxInfo,boxSize);
            let goodsListStyle = {
                width: sizeInfo['w'] + 'rem',
                height: imageHeight + 'rem',
            };

            if (goods_list['tagPosition'] && goods_list['icon']) {
                let iconWidth = px2rem(50, 640);
                let iconPosition;
                let imgStyle = {
                    width: iconWidth + 'rem',
                    position: 'absolute',
                };

                switch (goods_list['tagPosition']) {
                    case 'leftTop':
                        iconPosition = 'left: 0; top: 0;';
                        break;
                    case 'leftBottom':
                        iconPosition = 'left: 0; bottom: 0;';
                        break;
                    case 'rightTop':
                        iconPosition = 'right: 0; top: 0;';
                        break;
                    case 'rightBottom':
                        iconPosition = 'right: 0; bottom: 0;';
                        break;
                }
                return (
                    <div className={'goods_item list_item' + style_name}
                         data-bgtj={'plate|' + plate_code + '|' + content_id} style={goodsBoxStyle}>
                        <img style={imgStyle + iconPosition} src={lazyImageUrl} data-original={goods_list['icon']}/>
                    </div>
                )
            }
            if (goods_list['displayTag']) {
                return (
                    <div className={'goods_item list_item' + style_name}
                         data-bgtj={'plate|' + plate_code + '|' + content_id} style={goodsBoxStyle}>
                        <p className="promotion_info">
                            <span className="promotion_tag">{goods_list['displayTag']}</span>
                        </p>
                    </div>
                )
            }
            if (goods_list['market_price'] != goods_list['sales_price']) {
                return (
                    <div className={'goods_item list_item' + style_name}
                         data-bgtj={'plate|' + plate_code + '|' + content_id} style={goodsBoxStyle}>
                        <div className='list_item_pic' style={goodsListStyle}>
                            <a href={getGoodsUrl(goods_list)} style={{width: '100%', height: '100%'}}>
                                <img src={lazyImageUrl} data-original={goods_list['imgUrl']} className="lazy_fadein"
                                     style={{width: '100%', height: '100%'}} alt=""/>
                            </a>
                        </div>
                        <div className="list_item_data flex-item-1">
                            <a href={getGoodsUrl(goods_list)}>
                                <h3 className='data_title'>{goods_list['product_name']}</h3>
                                <p className='goods_price'>
                                    <span className="current_price">{goods_list['sales_price']}</span>
                                    <span className='original_price'>{goods_list['market_price']}</span>
                                </p>
                            </a>
                        </div>
                    </div>
                )
            }

            return (
                <div className={'goods_item list_item' + style_name}
                     data-bgtj={'plate|' + plate_code + '|' + content_id} style={goodsBoxStyle}>
                    <div className='list_item_pic' style={goodsListStyle}>
                        <a href={getGoodsUrl(goods_list)} style={{width: '100%', height: '100%'}}>
                            <img src={lazyImageUrl} data-original={goods_list['imgUrl']} className="lazy_fadein"
                                 style={{width: '100%', height: '100%'}} alt=""/>
                        </a>
                    </div>
                    <div className="list_item_data flex-item-1">
                        <a href={getGoodsUrl(goods_list)}>
                            <h3 className='data_title'>{goods_list['product_name']}</h3>
                            <p className='goods_price'>
                                <span className="current_price">{goods_list['sales_price']}</span>
                            </p>
                        </a>
                    </div>
                </div>
            )
        }
        return (

            <div className={'goods_item list_item' + style_name} data-bgtj={'plate|' + plate_code + '|' + content_id} style={goodsBoxStyle}></div>

        )
    }
}

export default GoodsItem;
