import * as React from 'react';
import {PlateContentType} from './commonFun';
import {ImageService} from './service/service';

interface BasicItemProps {
    plate_type: string,
    url_website: string,
    image_url: any,
    imgDefault: string,
    plate_code: string,
    style_name: string,
    content_id: string,
    is_need_lazyLoad: string,
    content_name: string,
    sizeInfo: {
        x: string,
        y: string,
        w: string,
        h: string
    }
}

interface ImageItemProps {
    data: BasicItemProps
}


export function cleanItemProps(itemProps: any): BasicItemProps {
    let {plate_type, url_website, image_url, imgDefault, plate_code, style_name, content_id, is_need_lazyLoad, content_name, sizeInfo} = itemProps;
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
    };
}

//创建img标签
let ImgTag = (props: ImageItemProps) => {
    let {image_url, is_need_lazyLoad, plate_type, content_name} = props.data;
    let imageService= ImageService.init();
    let imgUrl = imageService.changeImageUrl(image_url, { width: 350, quality: 'm2' });
    let lazyImageUrl = imageService.lazyImageUrl;

    //判断是否为图片类型
    if (parseInt(plate_type)== PlateContentType.IMAGE_TYPE) {

        // 是否懒加载
        if (is_need_lazyLoad && image_url) {
            return (
                <img src={lazyImageUrl} data-original={imgUrl} style={{width: '100%', height: '100%'}}/>
            )
        }
        else {
            return (
                // 如果图片为空则不显示
                <img src={image_url} style={{width: '100%', height: '100%', display: 'none'}}/>
            )
        }
    }else if(parseInt(plate_type)==PlateContentType.TEXT_TYPE){
        return(
            <div>{ content_name }</div>
        )
    }
};


class BasicItem extends React.Component<ImageItemProps, any> {
    constructor(props: ImageItemProps) {
        super(props);
    }

    render() {
        let {url_website, style_name, content_id, plate_code, sizeInfo} = this.props.data;
        let {data} = this.props;

        //设置面板内容的样式
        let info: {
            position: 'absolute' | 'relative' | 'fixed',
            [id: string]: any
        } = {
            position: "absolute",
            width: sizeInfo.w+'rem',
            height: sizeInfo.h+'rem',
            top: sizeInfo.y+'rem',
            left: sizeInfo.x+'rem',
            lineHeight:sizeInfo.h+'rem',
        };

        //是否带链接
        if (url_website) {
            return (
                <a className={style_name} data-bgtj={'plate|' + plate_code + '|' + content_id} href={url_website}
                   target="_blank" style={ info }>
                    <ImgTag data={ data }/>
                </a>

            )
        }
        else {
            return (
                <div className={style_name} data-bgtj={'plate|' + plate_code + '|' + content_id} style={info}>
                    <ImgTag data={ data }/>
                </div>
            )
        }
    }
}

export default BasicItem;