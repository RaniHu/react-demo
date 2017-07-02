import * as React from 'react';
import * as ReactDom from 'react-dom';


//切换子组件背景色
class SwitchBgChild extends React.Component<any, any> {

    defaultProps = {
        changeParentColor: '#e6e6e6'
    };


    render() {

        return (
            <div className="child">
                <p>点击改变父组件的背景色</p>
                <ul>
                    <li><a data-color="#7B77FF" onClick={this.props.changeParentColor}>&nbsp;</a></li>
                    <li><a data-color="#92CCE1" onClick={this.props.changeParentColor}>&nbsp;</a></li>
                    <li><a data-color="#F68686" onClick={this.props.changeParentColor}>&nbsp;</a></li>
                    <li><a data-color="#FFE3B9" onClick={this.props.changeParentColor}>&nbsp;</a></li>
                    <li><a data-color="#F1684E" onClick={this.props.changeParentColor}>&nbsp;</a></li>
                </ul>
            </div>
        )
    }
}

//切换父组件背景色
class SwitchBgParent extends React.Component<any, any> {

    state = {
        parentBgColor: ''
    };

    //改变父组件背景色
    changeParentBgColor(e){
        this.setState({parentBgColor: e.target.getAttribute("data-color")})
    };


    //改变子组件1背景色
    changeChild1Color(e){
        ReactDom.findDOMNode(this.refs.child1).style.background=e.target.getAttribute("data-color");
    };

    //改变子组件2背景色
    changeChild2Color(e){
        ReactDom.findDOMNode(this.refs.child2).style.background=e.target.getAttribute("data-color");
    };


    render() {
        let {parentBgColor} = this.state;
        return (
            <div>
                <div style={{"background": parentBgColor}} className="parent">
                    <div>
                        <p>点击改变第一个child背景色</p>
                        <ul>
                            <li><a data-color="#7B77FF" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#92CCE1" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F68686" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#FFE3B9" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F1684E" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                        </ul>
                    </div>
                    <div>
                        <span>点击改变第二个child背景色</span>
                        <ul>
                            <li><a data-color="#7B77FF" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#92CCE1" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F68686" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#FFE3B9" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F1684E" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <SwitchBgChild ref="child1" changeParentColor={this.changeParentBgColor.bind(this)}/>
                <SwitchBgChild ref="child2" changeParentColor={this.changeParentBgColor.bind(this)}/>
            </div>
        )
    }
}

export default SwitchBgParent;
