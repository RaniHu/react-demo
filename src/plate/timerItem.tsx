import * as React from 'react';


interface BasicItemProps {
    content: string,
    plate_code: string,
    style_name: string,
    content_id: string,
    sizeInfo: {
        x: string,
        y: string,
        w: string,
        h: string
    }
}

interface TimerItemProps {
    data: BasicItemProps
}


export function cleanTimerProps(itemProps: any): BasicItemProps {
    let {content, plate_code, style_name, content_id,sizeInfo} = itemProps;
    return {
        content,
        plate_code,
        style_name,
        content_id,
        sizeInfo,
    };
}


//倒计时类型组件
class TimerItem extends React.Component<TimerItemProps, any> {
    constructor(props: TimerItemProps) {
        super(props);
    }

    render() {
        let {content, plate_code, style_name, content_id, sizeInfo} = this.props.data;
        let mobileStyle;
        let text = "";

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
            fontSize: '0',
            textAlign: 'center'
        };


        //判断倒计时类型
        if (style_name == "1" || style_name == "3") {
            mobileStyle = {
                fontSize: '0.6rem',
                color: '#F84C42',
                fontWeight: 'bold',
            };
            text = '剩余';
        } else if (style_name == "4" || style_name == "2") {
            mobileStyle = {
                fontSize: '0.4rem',
                color: '#363636',
            };
            text = '距开始仅剩';
        }

        return (
            <div className="timer_item" data-bgtj={'plate|' + plate_code + '|' + content_id}
                 data-timestamp={content} style={info}>
                <span style={mobileStyle}>{text}</span>
                <span className="timer_hour" style={mobileStyle}></span>
                <span className="timer_min" style={mobileStyle}></span>
                <span className="timer_sec" style={mobileStyle}></span>
            </div>
        )
    }
}

export default TimerItem;