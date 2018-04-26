//图片服务
/**
 * 图片尺寸服务
 */
export class ImageService{
    /**
     * 匹配图片中地址的正则
     */
    imageUrlMatch = /(<img\s[^>]*?)src=(['"])([^\2]+?)\2([^>]*?>)/g;
    /**
     * 匹配图片标签
     */
    imageTagMatch = /<img[^\w]*>|<img\s[^>]*>/g;
    /**
     * 匹配是图片url中的参数
     */
    imageUrlParamMatch = /(.*?)(?:(?:(_m[\d]))?--((?:[w|h]_\d+)?(?:_[w|h]_\d+)?))?\.(\w{2,5})$/;
    /**
     * 允许的图片类型
     */
    allowImageType = ['jpg'];
    /**
     * 匹配是否有延迟加载属性
     */
    lazyMatch = /\sdata-original=/;
    /**
     * 懒加载图片占位符图片
     */
    // lazyImageUrl: config.lazyImageUrl;

    /**
     * 允许的域名
     */
    allowChangeDomain = [/^m[1-4]\.banggo\.com$/, /^m[1-4]\.mbanggo\.com$/, /^pic[1-4]\.banggo\.com$/];

    /**
     * 检测是否允许修改图片
     */
    checkAllowChangeImage() {
        // if (config && config.allowChangeDomain != undefined) {
        //   return config.allowChangeImage;
        // }
        // else {
        //   return true;
        // }
        return true;
    };

    /**
     * 检测域名是否允许修改
     */
    checkAllowChangeDomain(url: string) {
        var domainMatch = url.match(/^(?:http(?:s)?:)?\/\/([^/]+)/), domain = '', isAllow = false, item;

        if (!this.checkAllowChangeImage()) {
            return isAllow;
        }

        if (domainMatch == null) {
            return isAllow;
        }

        domain = domainMatch[1];

        for (var i = 0, j = this.allowChangeDomain.length; i < j; i++) {
            item = this.allowChangeDomain[i];
            /* 如果是正则表达式则匹配 */
            if (item && typeof item == 'object' && item.constructor == RegExp && domain.match(item) != null) {
                isAllow = true;
                break;
            } else if (domain === item) {
                isAllow = true;
                break;
            }
        }

        return isAllow;
    };

    /**
     * 检测图片类型
     */
    checkAllowImageType(ext) {
        let isAllow = false;
        for (let item of this.allowImageType) {
            if (item == ext) {
                isAllow = true;
                break;
            }
        }
        return isAllow;
    };
    /**
     * 检测是否已经存在延迟加载属性
     */
    checkLazyAttr(image: string) {
        return image.match(this.lazyMatch) == null ? false : true;
    };

    /**
     * 处理图片延迟加载属性
     * @param matches {array} 正则匹配项
     * @param imageUrl {string} 图片地址
     * @return {string} 带延迟加载属性的html标签
     */
    lazyload(matches: any, imageUrl: string) {
        var _self = this;
        var lazy = _self.lazyImageUrl;
        var imageTag = matches[0];
        if (imageTag.match(_self.lazyMatch) != null) {
            return imageTag;
        }
        else {
            return matches[1] + 'src="' + lazy + '" data-original="' + imageUrl + '"' + matches[4];
        }
    };
    /**
     * 图片大小参数
     * @param param {object} 参数对象
     * @return {string} 返回修改后的图片大小参数
     */
    resize(param: any) {
        var size = '';
        if (param['width']) {
            size += 'w_' + param['width'];
        }
        if (param['height']) {
            if (size.length > 0) {
                size += '_';
            }
            size += 'h_' + param['height'];
        }
        return size;
    };
    /**
     * 图片质量参数
     * @param param {object} 参数对象
     * @return {string} 返回修改后的图片质量参数
     */
    quality(param: any) {
        var quality = '_' + param['quality'];
        return quality;
    };
    /**
     * 修改图片地址参数
     * @param html {string} html片段
     * @param param {object} 格式如下
     *   {
       *     'lazy': {boolean},
       *     'width': {ingeter},
       *     'height': {integer},
       *     'quality': [m1|m2]
       *   }
     * @return {string} 修改后的html片段
     */
    changeImage(html: string, param: { width?: number; height?: number; lazy?: boolean; quality?: 'm1' | 'm2' }) {
        var _self = this;
        var _callback = function () {
            var matches = arguments;
            var result = matches[0];
            var imageUrl = matches[3];
            // 移除地址多余空格
            imageUrl = imageUrl.replace(/^\s|\s$/g, '');
            if (!_self.checkLazyAttr(result)) {
                if (
                    param['quality'] ||
                    param['width'] ||
                    param['height']
                ) {
                    imageUrl = _self.changeImageUrl(imageUrl, param);
                }
                // 处理图片延迟加载
                if (param['lazy']) {
                    result = _self.lazyload(matches, imageUrl);
                }
                else {
                    result = matches[1] + 'src="' + imageUrl + '"' + matches[4];
                }
            }

            return result;
        };
        return html.replace(_self.imageUrlMatch, _callback);
    };
    /**
     * 修改图片url参数
     * @param imageUrl {string} 图片地址
     * @param param {object} 格式如下
     *   {
       *     'width': {ingeter},
       *     'height': {integer},
       *     'quality': [m1|m2]
       *   }
     * @return {string} 修改后的图片地址
     */
    changeImageUrl(imageUrl: string, param: { width?: number; height?: number; quality?: 'm1' | 'm2' }) {
        var _self = this;
        var matches = imageUrl.match(_self.imageUrlParamMatch);
        if (matches != null && _self.checkAllowChangeDomain(imageUrl) && _self.checkAllowImageType(matches[4])) {
            var url = matches[1];
            var quality = matches[2] || '';
            var size = matches[3] || '';
            var ext = matches[4];
            var query = matches[5] || '';

            if (param['quality']) {
                quality = _self.quality(param);
            }
            // 处理图片大小
            if (param['width'] || param['height']) {
                size = _self.resize(param);
            }
            imageUrl = url + quality + '--' + size + '.' + ext + query;
        }

        return imageUrl;
    }
    /**
     * 设置图片在盒子容器中居中
     */
    setImagePositionByBox(imgUrl: string, box: { width: number; height: number; },
                          pos: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }, scaled = true) {
        let _loadCallback = function () {
            let imgWidth: number = this.width;
            let imgHeight: number = this.height;
            let rate: number;
            let toWidth: number;
            let toHeigh: number;
            let style: {
                width?: number;
                height?: number;
                left?: number;
                right?: number;
                top?: number;
                bottom?: number;
            } = {};
            style.width = imgWidth;
            style.height = imgHeight;
            if (scaled) {
                rate = imgWidth / box.width;
                toWidth = box.width;
                toHeigh = Math.round(imgHeight / rate);
                if (toHeigh > box.height) {
                    rate = imgHeight / box.height;
                    toWidth = Math.round(imgWidth / rate);
                    toHeigh = box.height;
                }
                style.width = toWidth;
                style.height = toHeigh;
            }
            switch (pos.x) {
                case 'left':
                    style.left = 0;
                    break;
                case 'center':
                    style.left = (box.width - style.width) / 2;
                    break;
                case 'right':
                    style.right = 0;
            }
            switch (pos.y) {
                case 'top':
                    style.top = 0;
                    break;
                case 'center':
                    style.top = (box.height - style.height) / 2;
                    break;
                case 'bottom':
                    style.bottom = 0;
                    break;
            }
            // img.css(style);
            this.onload = this.onerror = null;
        }

        let tempImage = new Image();
        tempImage.onload = _loadCallback;
        tempImage.onerror = function () {
            this.onload = this.onerror = null;
        }
        tempImage.setAttribute('src', imgUrl);
    }
    // 构造函数，传入lazyImageUrl
    constructor(public lazyImageUrl: string) {

    }
    // 单例句柄
    static _instance: ImageService;
    // 静态入口
    static init() {
        if (!this._instance) {
            let lazyImageUrl =_vars.imgDefault || '';
            this._instance = new ImageService(lazyImageUrl);
        }
        return this._instance;
    }
}

//
//
// export class PlateBoxService {
//
// }
//
// export class DataTransform {
//
// }
//
//
