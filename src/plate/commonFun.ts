//转换到rem，用来实现自适应
export function px2rem(px, width, rate = 16) {
    return (parseInt(px) / parseInt(width) * rate );
}

//面板类型
export enum PlateContentType {
    HTML_TYPE = 1,
    GOODS_LIST_TYPE = 2,
    IMAGE_TYPE = 3,
    TEXT_TYPE = 4,
    GOODS_TYPE = 6,
    TIMER_TYPE=7,
    SWIPE_TYPE = 9,
    HOT_TYPE = 10
}

//获取商品图片高度
export function getGoodsImageHeight(diff, boxInfo,boxSize) {
    debugger;
    console.log(boxInfo);
     let boxWidth = parseInt(boxSize.width);
     let imageHeight = parseInt(boxInfo['h']) - diff;
     return px2rem(imageHeight, boxWidth);
}

//获取内容位置及尺寸样式
export function getContentInfo(sizeInfo, index) {
    let item = sizeInfo[index];
    let result = 'left: ' + item['x'] + 'rem; ' + 'top: ' + item['y'] + 'rem; '
        + 'width: ' + item['w'] + 'rem; ' + 'height: ' + item['h'] + 'rem; ' +
        'line-height:' + item['h'] + 'rem';
    return result;
}

//获取商品地址
export function getGoodsUrl(goodsInfo) {
    return config.baseUrl + '/goods/' + goodsInfo['product_id'] + '.shtml';
}

//获取面板盒子大小样式
export function getBoxSize(boxinfo) {
    let width = boxinfo.width;
    let height = boxinfo.height;
    let bottom = boxinfo.foot_distance;
    return {
        width: px2rem(width, width) + 'rem',
        height: px2rem(height, width) + 'rem',
        marginBottom: px2rem(bottom, width) + 'rem'
    }
}


//获取模板盒子大小(单位为rem)
export function getBoxSizeInfo(boxinfo: BGWebApi.IPlateAttrBeanType) {
    let boxWidth=boxinfo.width;
    let coordinate: string[];
    if (boxinfo.coordinate.split(',')) {
        coordinate = boxinfo.coordinate.split(',');
    } else {
        coordinate = boxinfo.coordinate.split(' ');
    }
    let result: BGWebApi.IPlateSizeType[] = [];
    for (let item of coordinate) {
        let info = ('0' + item).split(/[a-zA-Z]/);
        result.push({
            x: (px2rem(parseFloat(info[1]),boxWidth).toString()),
            y: (px2rem(parseFloat(info[2]),boxWidth).toString()),
            w: (px2rem(parseFloat(info[3]),boxWidth).toString()),
            h: (px2rem(parseFloat(info[4]),boxWidth).toString()),
        })
    }
    return result;
}

//获取模板盒子大小(单位为px)
export function getBoxSizeInfoPx(boxinfo: BGWebApi.IPlateAttrBeanType) {
    debugger;
    let coordinate: string[];
    if (boxinfo.coordinate.split(',')) {
        coordinate = boxinfo.coordinate.split(',');
    } else {
        coordinate = boxinfo.coordinate.split(' ');
    }
    let result: BGWebApi.IPlateSizeType[] = [];
    for (let item of coordinate) {
        let info = ('0' + item).split(/[a-zA-Z]/);
        result.push({
            x: info[1],
            y: info[2],
            w: info[3],
            h: info[4],
        })
    }
    return result;
}
