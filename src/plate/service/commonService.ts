// import Ndoo from "../../../../multi/src/library/ndoo_ts";
// /**
//  * --------------------------------------------------
//  *   FileName: commonService.js
//  *       Desc: 公共服务模块，从ts编译
//  *     Author: chenglifu
//  *      Email: chenglfiu@metersbonwe.com
//  *    Version: 1.0
//  * LastChange: 2016-09-22
//  *    History: 2016-09-22 添加图片url处理模块 chenglifu
//  * --------------------------------------------------
//  */
//
// namespace BGWeb {
//   const _n = ndoo;
//   const _vars = _n.vars;
//   const _func = _n.func;
//   const _stor = _n.storage;
//
//   export namespace Default {
//     /**
//      * 滚动加载服务
//      */
//     @Ndoo.Component('bgweb.default.scrollService', Ndoo.RegType.Service, true)
//     export class ScrollService {
//       _handler: [string, Function][] = [];
//       _status: number = -1;
//
//       find(id: string): number {
//         let _handler = this._handler;
//         for (let i = _handler.length - 1; i >= 0; i--) {
//           if (_handler[i][0] == id) {
//             return i;
//           }
//         }
//         return -1;
//       }
//
//       register(id: string, callback: Function): string {
//         if (this.find(id) < 0) {
//           this._handler.push([id, callback]);
//         }
//
//         return id;
//       }
//
//       unRegister(id: string): number {
//         let index = this.find(id);
//         if (index > -1) {
//           this.remove(index)
//         }
//         return index;
//       }
//
//       remove(index) {
//         return this._handler.splice(index, 1);
//       }
//
//       scrollCallback() {
//         // 执行
//         let {_status, _handler} = this;
//         if (_handler.length && _status) {
//           let _self = this;
//           for (let i = _handler.length - 1; i >= 0; i--) {
//             _handler[i][1](
//               ((index: number) => () => _self.remove(index))(i)
//             );
//           }
//         }
//       }
//
//       start() {
//         if (this._status == -1) {
//           this._status = 1;
//           // 每100ms执行一次
//           $(window).on('scroll', _.throttle(_.bind(this.scrollCallback, this), 100));
//         }
//       }
//
//       stop() {
//         this._status = 0;
//       }
//
//       constructor() {
//         this.start();
//       }
//
//       static _instance: ScrollService;
//       static init() {
//         if (!this._instance) {
//           this._instance = new ScrollService;
//         }
//         return this._instance;
//       }
//     }
//
//     /**
//      * 延迟加载服务
//      */
//     @Ndoo.Component('bgweb.default.lazyloadService', Ndoo.RegType.Service, true)
//     export class LazyloadService {
//       static loadImageByElem(elem: any): void {
//         $(elem).lazyload({
//           effect: "fadeIn",
//           failure_limit: 20,
//           skip_invisible: true
//         });
//       }
//
//       static checkInviewport(elem: HTMLElement, options: any = { container: window, threshold: 0 }): boolean {
//         let $el = $(elem);
//         return $el.is(':visible') && $.inviewport(elem, options)
//       }
//     }
//
//     /**
//      * 日志级别
//      */
//     export enum LogLevel {
//       /**
//        * Off 最高等级，用于关闭所有日志记录
//        */
//       Off,
//       /**
//        * Fatal 指出每个严重的错误事件将会导致应用程序的退出
//        */
//       Fatal,
//       /**
//        *  Error 指出虽然发生错误事件，但仍然不影响系统的继续运行
//        */
//       Error,
//       /**
//        *  Warm 表明会出现潜在的错误情形
//        */
//       Warm,
//       /**
//        *  Info 一般和在粗粒度级别上，强调应用程序的运行全程
//        */
//       Info,
//       /**
//        *  Debug 一般用于细粒度级别上，对调试应用程序非常有帮助
//        */
//       Debug,
//       /**
//        *  All 最低等级，用于打开所有日志记录
//        */
//       All
//     }
//
//     /**
//      * 日志服务
//      */
//     @Ndoo.Component('bgweb.default.loggerService', Ndoo.RegType.Service, true)
//     export class LoggerService {
//       /**
//        * 发送日志到服务端
//        * level {LoggerLevel} 日志级别
//        * message {string} 日志内容
//        * category {string} 日志分类
//        */
//       send(level, message, category) {
//         if (!this.reportUrl) {
//           throw new Error("日志地址未配置");
//         }
//         // 参数
//         let param = {
//           level, message, category
//         }
//         let requestParam = $.param(param);
//         // 请求地址
//         let url = this.reportUrl + (this.reportUrl.indexOf('?') > -1 ? '&' : '?');
//         let logImage = new Image();
//         // 加载日志
//         try {
//           logImage.src = url + requestParam;
//         }
//         catch (e) {
//
//         }
//       }
//
//       /**
//        * Fatal 指出每个严重的错误事件将会导致应用程序的退出
//        * message {string} 日志级别
//        * category {string} 日志分类
//        */
//       fatal(message: string, category: string) {
//         if (this.level <= LogLevel.Fatal)
//           this.send(LogLevel.Fatal, message, category);
//       }
//
//       /**
//        * Error 指出虽然发生错误事件，但仍然不影响系统的继续运行
//        * message {string} 日志级别
//        * category {string} 日志分类
//        */
//       error(message: string, category: string) {
//         if (this.level >= LogLevel.Error)
//           this.send(LogLevel.Error, message, category);
//       }
//
//       /**
//        * Warm 表明会出现潜在的错误情形
//        * message {string} 日志级别
//        * category {string} 日志分类
//        */
//       warm(message: string, category: string) {
//         if (this.level >= LogLevel.Warm)
//           this.send(LogLevel.Warm, message, category);
//       }
//
//       /**
//        * Info 一般和在粗粒度级别上，强调应用程序的运行全程
//        * message {string} 日志级别
//        * category {string} 日志分类
//        */
//       info(message: string, category: string) {
//         if (this.level >= LogLevel.Info)
//           this.send(LogLevel.Info, message, category);
//       }
//
//       /**
//        * Debug 一般用于细粒度级别上，对调试应用程序非常有帮助
//        * message {string} 日志级别
//        * category {string} 日志分类
//        */
//       debug(message: string, category: string) {
//         if (this.level >= LogLevel.Debug)
//           this.send(LogLevel.Debug, message, category);
//       }
//
//       /**
//        * All 最低等级，用于打开所有日志记录
//        * message {string} 日志级别
//        * category {string} 日志分类
//        */
//       all(message: string, category: string) {
//         this.send(LogLevel.All, message, category);
//       }
//
//       constructor(private level: number, private reportUrl: string) {
//       }
//       static _instance: LoggerService;
//       static init() {
//         if (!this._instance) {
//           this._instance = new LoggerService(_vars.logLevel || LogLevel.Error, _vars.logUrl || '');
//         }
//         return this._instance;
//       }
//     }
//
//     /**
//      * 图片尺寸服务
//      */
//     @Ndoo.Component('bgweb.default.imageUrlService', Ndoo.RegType.Service, true)
//     export class ImageUrlService {
//       /**
//        * 匹配图片中地址的正则
//        */
//       imageUrlMatch = /(<img\s[^>]*?)src=(['"])([^\2]+?)\2([^>]*?>)/g;
//       /**
//        * 匹配图片标签
//        */
//       imageTagMatch = /<img[^\w]*>|<img\s[^>]*>/g;
//       /**
//        * 匹配是图片url中的参数
//        */
//       imageUrlParamMatch = /(.*?)(?:(?:(_m[\d]))?--((?:[w|h]_\d+)?(?:_[w|h]_\d+)?))?\.(\w{2,5})$/;
//       /**
//          * 允许的图片类型
//          */
//       allowImageType = ['jpg'];
//       /**
//        * 匹配是否有延迟加载属性
//        */
//       lazyMatch = /\sdata-original=/;
//       /**
//        * 懒加载图片占位符图片
//        */
//       // lazyImageUrl: config.lazyImageUrl;
//
//       /**
//        * 允许的域名
//        */
//       allowChangeDomain = [/^m[1-4]\.banggo\.com$/, /^m[1-4]\.mbanggo\.com$/, /^pic[1-4]\.banggo\.com$/];
//
//       /**
//        * 检测是否允许修改图片
//        */
//       checkAllowChangeImage() {
//         // if (config && config.allowChangeDomain != undefined) {
//         //   return config.allowChangeImage;
//         // }
//         // else {
//         //   return true;
//         // }
//         return true;
//       };
//
//       /**
//        * 检测域名是否允许修改
//        */
//       checkAllowChangeDomain(url: string) {
//         var domainMatch = url.match(/^(?:http(?:s)?:)?\/\/([^/]+)/), domain = '', isAllow = false, item;
//
//         if (!this.checkAllowChangeImage()) {
//           return isAllow;
//         }
//
//         if (domainMatch == null) {
//           return isAllow;
//         }
//
//         domain = domainMatch[1];
//
//         for (var i = 0, j = this.allowChangeDomain.length; i < j; i++) {
//           item = this.allowChangeDomain[i];
//           /* 如果是正则表达式则匹配 */
//           if (item && typeof item == 'object' && item.constructor == RegExp && domain.match(item) != null) {
//             isAllow = true;
//             break;
//           } else if (domain === item) {
//             isAllow = true;
//             break;
//           }
//         }
//
//         return isAllow;
//       };
//
//       /**
//        * 检测图片类型
//        */
//       checkAllowImageType(ext) {
//         let isAllow = false;
//         for (let item of this.allowImageType) {
//           if (item == ext) {
//             isAllow = true;
//             break;
//           }
//         }
//         return isAllow;
//       };
//       /**
//        * 检测是否已经存在延迟加载属性
//        */
//       checkLazyAttr(image: string) {
//         return image.match(this.lazyMatch) == null ? false : true;
//       };
//
//       /**
//        * 处理图片延迟加载属性
//        * @param matches {array} 正则匹配项
//        * @param imageUrl {string} 图片地址
//        * @return {string} 带延迟加载属性的html标签
//        */
//       lazyload(matches: any, imageUrl: string) {
//         var _self = this;
//         var lazy = _self.lazyImageUrl;
//         var imageTag = matches[0];
//         if (imageTag.match(_self.lazyMatch) != null) {
//           return imageTag;
//         }
//         else {
//           return matches[1] + 'src="' + lazy + '" data-original="' + imageUrl + '"' + matches[4];
//         }
//       };
//       /**
//        * 图片大小参数
//        * @param param {object} 参数对象
//        * @return {string} 返回修改后的图片大小参数
//        */
//       resize(param: any) {
//         var size = '';
//         if (param['width']) {
//           size += 'w_' + param['width'];
//         }
//         if (param['height']) {
//           if (size.length > 0) {
//             size += '_';
//           }
//           size += 'h_' + param['height'];
//         }
//         return size;
//       };
//       /**
//        * 图片质量参数
//        * @param param {object} 参数对象
//        * @return {string} 返回修改后的图片质量参数
//        */
//       quality(param: any) {
//         var quality = '_' + param['quality'];
//         return quality;
//       };
//       /**
//        * 修改图片地址参数
//        * @param html {string} html片段
//        * @param param {object} 格式如下
//        *   {
//        *     'lazy': {boolean},
//        *     'width': {ingeter},
//        *     'height': {integer},
//        *     'quality': [m1|m2]
//        *   }
//        * @return {string} 修改后的html片段
//        */
//       changeImage(html: string, param: { width?: number; height?: number; lazy?: boolean; quality?: 'm1' | 'm2' }) {
//         var _self = this;
//         var _callback = function () {
//           var matches = arguments;
//           var result = matches[0];
//           var imageUrl = matches[3];
//           // 移除地址多余空格
//           imageUrl = imageUrl.replace(/^\s|\s$/g, '');
//           if (!_self.checkLazyAttr(result)) {
//             if (
//               param['quality'] ||
//               param['width'] ||
//               param['height']
//             ) {
//               imageUrl = _self.changeImageUrl(imageUrl, param);
//             }
//             // 处理图片延迟加载
//             if (param['lazy']) {
//               result = _self.lazyload(matches, imageUrl);
//             }
//             else {
//               result = matches[1] + 'src="' + imageUrl + '"' + matches[4];
//             }
//           }
//
//           return result;
//         };
//         return html.replace(_self.imageUrlMatch, _callback);
//       };
//       /**
//        * 修改图片url参数
//        * @param imageUrl {string} 图片地址
//        * @param param {object} 格式如下
//        *   {
//        *     'width': {ingeter},
//        *     'height': {integer},
//        *     'quality': [m1|m2]
//        *   }
//        * @return {string} 修改后的图片地址
//        */
//       changeImageUrl(imageUrl: string, param: { width?: number; height?: number; quality?: 'm1' | 'm2' }) {
//         var _self = this;
//         var matches = imageUrl.match(_self.imageUrlParamMatch);
//         if (matches != null && _self.checkAllowChangeDomain(imageUrl) && _self.checkAllowImageType(matches[4])) {
//           var url = matches[1];
//           var quality = matches[2] || '';
//           var size = matches[3] || '';
//           var ext = matches[4];
//           var query = matches[5] || '';
//
//           if (param['quality']) {
//             quality = _self.quality(param);
//           }
//           // 处理图片大小
//           if (param['width'] || param['height']) {
//             size = _self.resize(param);
//           }
//           imageUrl = url + quality + '--' + size + '.' + ext + query;
//         }
//
//         return imageUrl;
//       }
//       /**
//        * 设置图片在盒子容器中居中
//        */
//       setImagePositionByBox(imgUrl: string, img: JQuery, box: { width: number; height: number; },
//         pos: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }, scaled = true) {
//         let _loadCallback = function () {
//           let imgWidth: number = this.width;
//           let imgHeight: number = this.height;
//           let rate: number;
//           let toWidth: number;
//           let toHeigh: number;
//           let style: {
//             width?: number;
//             height?: number;
//             left?: number;
//             right?: number;
//             top?: number;
//             bottom?: number;
//           } = {};
//           style.width = imgWidth;
//           style.height = imgHeight;
//           if (scaled) {
//             rate = imgWidth / box.width;
//             toWidth = box.width;
//             toHeigh = Math.round(imgHeight / rate);
//             if (toHeigh > box.height) {
//               rate = imgHeight / box.height;
//               toWidth = Math.round(imgWidth / rate);
//               toHeigh = box.height;
//             }
//             style.width = toWidth;
//             style.height = toHeigh;
//           }
//           switch (pos.x) {
//             case 'left':
//               style.left = 0;
//               break;
//             case 'center':
//               style.left = (box.width - style.width) / 2;
//               break;
//             case 'right':
//               style.right = 0;
//           }
//           switch (pos.y) {
//             case 'top':
//               style.top = 0;
//               break;
//             case 'center':
//               style.top = (box.height - style.height) / 2;
//               break;
//             case 'bottom':
//               style.bottom = 0;
//               break;
//           }
//           img.css(style);
//           this.onload = this.onerror = null;
//         }
//
//         let tempImage = new Image();
//         tempImage.onload = _loadCallback;
//         tempImage.onerror = function () {
//           this.onload = this.onerror = null;
//         }
//         tempImage.setAttribute('src', imgUrl);
//       }
//       // 构造函数，传入lazyImageUrl
//       constructor(public lazyImageUrl: string) {
//
//       }
//       // 单例句柄
//       static _instance: ImageUrlService;
//       // 静态入口
//       static init() {
//         if (!this._instance) {
//           let lazyImageUrl = _vars.imgDefault || '';
//           this._instance = new ImageUrlService(lazyImageUrl);
//         }
//         return this._instance;
//       }
//     }
//
//     /**
//      * 本地存储服务
//      */
//     @Ndoo.Component('bgweb.default.localStroageService', Ndoo.RegType.Service, true)
//     export class LocalStorageService {
//       private key: string = 'BGStorageItemIndex';
//       private timeout: number = 5 * 60000;
//       // private timeout: number = 20000;
//       // 检测存储是否启用，维护索引结构
//       private checkStorateEnable() {
//         let ret = false;
//         let key = this.key;
//         let version = this.version;
//         let oldVersion, index, indexJSON;
//         // 如果不支持本地存储api则退出
//         if (!this.enabled || !window['localStorage'] || !window['JSON']) {
//           return ret;
//         }
//         try {
//           indexJSON = localStorage.getItem(key) || '{"index": [], "version": ""}';
//           index = JSON.parse(indexJSON);
//           if (index && index.version) {
//             oldVersion = index.version;
//           }
//           // 更新索引
//           if (oldVersion != version) {
//             localStorage.clear();
//             indexJSON = '{"index": [], "version": "' + version + '"}';
//             localStorage.setItem(key, indexJSON);
//           }
//           if (localStorage.getItem(key) == indexJSON) {
//             ret = true;
//           }
//         } catch (e) { }
//         return ret;
//       }
//       // 更新索引
//       private updateStorageItemIndex(key, action) {
//         let indexKey = this.key;
//         let indexJSON = localStorage.getItem(indexKey);
//         let version = this.version;
//         let pos, removeKey;
//         let index = JSON.parse(indexJSON) as BGWebApi.IPlateStorageIndex;
//         pos = _.indexOf(index.index, key);
//         // 如果不存在
//         if (pos > -1) {
//           return;
//         } else {
//           index.index.unshift(key);
//         }
//         // 清理后10个
//         if (index.index.length >= 50) {
//           removeKey = index.index.splice(49);
//           for (var i = 0, j = removeKey.length; i < j; i++) {
//             localStorage.removeItem(removeKey[i]);
//           }
//         }
//         localStorage.setItem(indexKey, JSON.stringify(index));
//       }
//       // 获取本地存储key
//       getStorageItem(key, timestamp) {
//         var item;
//         // 如果不支持本地存储
//         if (!this.checkStorateEnable()) {
//           return false;
//         }
//         // 如果不存在
//         item = localStorage.getItem(key);
//         if (!item) {
//           return false;
//         }
//         item = JSON.parse(item);
//         // 如果过期
//         if (item.timestamp != timestamp) {
//           localStorage.removeItem(key);
//           return false;
//         }
//         // 如果超时效 5 分钟
//         if (item.createtime + this.timeout < +new Date()) {
//           return false;
//         }
//         return item.data;
//       }
//       // 添加本地key
//       setStorageItem(key, value, timestamp) {
//         var item;
//         if (!this.checkStorateEnable()) {
//           return false;
//         }
//         item = {
//           data: value,
//           timestamp: timestamp,
//           createtime: +new Date()
//         }
//         item = JSON.stringify(item);
//         localStorage.setItem(key, item);
//         this.updateStorageItemIndex(key, 'set');
//         return value;
//       }
//
//       constructor(private version: string, private enabled: boolean) {
//
//       }
//
//       static _instance: LocalStorageService;
//       static getInstance(version: string, enabled: boolean) {
//         if (!this._instance) {
//           this._instance = new LocalStorageService(version, enabled);
//         }
//         return this._instance;
//       }
//     }
//
//   }
// }
