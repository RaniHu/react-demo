declare namespace BGWebApi {
  /**
   * 通用接口模型
   */
  export type IResponse<T> = {
    code: number,
    message: string,
    data: T,
  }

  /**
   * 面板项数据模型
   */
  export type IPlateItemType = {
    content_id: string,
    content_name: string,
    plate_type: string,
    image_url: string,
    is_need_lazyLoad: string,
    content: string,
    url_website: string,
    style_name: string,
    goods_list?: {
      product_id: string,
      product_name: string,
      imgUrl: string,
      imgUrl_320_320: string,
      market_price: number,
      sales_price: number,
      brand_name: string,
      brand_code: string,
    }
  }

  /**
   * 面板模板数据模型
   */
  export type IPlateAttrBeanType = {
    width: number,
    height: number,
    coordinate: string,
    foot_distance: string,
    template_code: string,
  }

  /**
   * 面板大小模型
   */
  export type IPlateSizeType = {
    x: string,
    y: string,
    w: string,
    h: string,
  }

  /**
   * 面板数据集合模型
   */
  export type IPlateDataType = {
    [id: string]: {
      plate_id: string,
      plate_name: string,
      plate_type: string,
      plate_attr_bean: IPlateAttrBeanType,
      plateContent: IPlateItemType[],
    }
  }

  export type IPlateDataResult = IResponse<IPlateDataType>

  /**
   * 面板数据索引结构
   */
  export type IPlateStorageIndex = {
    index: string[],
    version: string,
  }
}