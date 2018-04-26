import * as React from 'react';
import {render} from 'react-dom';
import {mockData} from './mockData';
import {PlateContentType, px2rem, getBoxSizeInfo, getContentInfo, getBoxSizeInfoPx, getBoxSize} from './commonFun';
import BasicItem from './basicItem';
import TimerItem from './timerItem';
import GoodsItem from './goodsItem';
import SwipeItem from './swipeItem';
import HotItem from './hotItem';

import {cleanItemProps} from './basicItem';
import {cleanTimerProps} from './timerItem';
import {cleanGoodsProps} from './goodsItem';
import {cleanSwipeProps} from './swipeItem';
import {cleanHotProps} from './hotItem';

// interface BasicItemProps {
//     plate_type: string,
//     url_website: string,
//     image_url: string
// }
//
// let cleanItemProps = (itemProps: any):BasicItemProps  => {
//     let {plate_type, url_website, image_url} = itemProps;
//     return {plate_type, url_website, image_url};
// }
//
// interface ImageItemProps {
//     data: BasicItemProps
// }
//
// let ImageItem = (props: ImageItemProps) => {
//     let { image_url, url_website } = props.data;
//     if (url_website.length) {
//         return (<a href={ url_website }>
//             <img src={ image_url} />
//         </a>)
//     }
//     else {
//         return (<div>
//             <img src={ image_url } />
//         </div>)
//     }
// }

interface PanelProps {
    text: string;
}

class Panel extends React.Component<PanelProps, any> {
    constructor(props: PanelProps) {
        super(props);
    }

    render() {
        for (let i in mockData) {
            let plate_attr_bean = mockData[i].plate_attr_bean;
            let plateContent = mockData[i].plateContent;
            let starid = mockData[i].plate_code;
            let goodsListContent: string[] = [];
            let goodsListContentHtml = '<div></div>';
            let itemIndex = 0;
            let boxSize = getBoxSize(plate_attr_bean);
            let boxContentInfo = getBoxSizeInfo(plate_attr_bean);
            let boxContentInfoPx = getBoxSizeInfoPx(plate_attr_bean);

            plateContent.forEach(function (item) {
                if (parseInt(item.plate_type) == PlateContentType.GOODS_LIST_TYPE) {
                    goodsListContent.push('<div></div>');
                    itemIndex++;
                }
            });
            if (goodsListContent.length > 1) {
                goodsListContentHtml = goodsListContent.join(',');
            }

            return (
                <div className="pannel_box" id="pannel_wrap">

                    <div className="custom_box" data-bgtj={'plate|' + mockData[i].plate_code}
                         data-plate-code={plate_attr_bean.template_code} style={boxSize}>
                        {
                            plateContent.map(function (item, index) {
                                let itemData = cleanItemProps(item);
                                itemData.sizeInfo = boxContentInfo[index];
                                itemData.plate_code = starid;

                                let timerData = cleanTimerProps(item);
                                timerData.sizeInfo = boxContentInfo[index];

                                let goodsData = cleanGoodsProps(item);
                                goodsData.sizeInfo = boxContentInfo[index];
                                goodsData.boxSize = plate_attr_bean;
                                goodsData.boxInfo = boxContentInfoPx[index];
                                goodsData.index = index;
                                goodsData.plate_code = starid;

                                let swipeData=cleanSwipeProps(item);
                                swipeData.sizeInfo = boxContentInfo[index];
                                swipeData.boxSize = plate_attr_bean;
                                swipeData.boxInfo = boxContentInfoPx[index];
                                swipeData.plate_code = starid;

                                let hotData=cleanHotProps(item);
                                hotData.sizeInfo = boxContentInfo[index];
                                hotData.boxSize = plate_attr_bean;
                                hotData.boxInfo = boxContentInfoPx[index];
                                hotData.plate_code = starid;

                                //判断面板内容类型
                                switch (parseInt(item.plate_type)) {
                                    case PlateContentType.IMAGE_TYPE:
                                    case PlateContentType.TEXT_TYPE:
                                        return <BasicItem key={ index } data={ itemData } />
                                    case PlateContentType.GOODS_TYPE:
                                    return <GoodsItem key={index} data={goodsData}/>;
                                    case PlateContentType.TIMER_TYPE:
                                        return <TimerItem key={index} data={timerData}/>
                                    case PlateContentType.SWIPE_TYPE:
                                        return <SwipeItem key={index} data={swipeData}/>
                                    case PlateContentType.HOT_TYPE:
                                        return <HotItem key={index} data={hotData}/>
                                }
                            })
                        }
                    </div>
                    <div dangerouslySetInnerHTML={{__html: goodsListContentHtml}}></div>
                </div>
            )
        }
    }
}


export default function (rootEl: HTMLElement) {
    render(
        <Panel text="react app"/>,
        rootEl
    )
}