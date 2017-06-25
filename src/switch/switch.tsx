import * as React from 'react';
import * as ReactDOM from 'react-dom';


//切换背景色子组件
class SwitchBgChild extends React.Component<any, any> {

    defaultProps = {
        changeParentColor: '#e6e6e6'
    };


    render() {

        return (
            <div style={{"background":this.props.childBgColor}} className="child">
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

//切换背景色父组件
class SwitchBgParent extends React.Component<any, any> {

    state = {
        parentBgColor: '',
        tipsColor:'',
        childBgColor:''
    };

    //改变父组件背景色
    changeParentBgColor(e) {
        this.setState({parentBgColor: e.target.getAttribute("data-color")})
        // let parentTips=ReactDOM.findDOMNode(this.refs.parentTips);
        this.setState({tipsColor:"#ffffff"});
    };


    //改变子组件1背景色
    changeChild1Color (e){
        ReactDOM.findDOMNode(this.refs.child1).style.background=e.target.getAttribute("data-color");
        // this.setState({childBgColor:e.target.getAttribute("data-color")})
    };

    //改变子组件2背景色
    changeChild2Color (e){
        ReactDOM.findDOMNode(this.refs.child2).style.background=e.target.getAttribute("data-color");
        // this.setState({childBgColor:e.target.getAttribute("data-color")})
    
    };


    render() {
        let {parentBgColor} = this.state;
        let {tipsColor} = this.state;
    
        return (
            <div>
                <div style={{"background": parentBgColor}} className="parent">
                    <div>
                        <span style={{"color":tipsColor}}>改变第一个child背景色</span>
                        <ul>
                            <li><a data-color="#7B77FF" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#92CCE1" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F68686" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#FFE3B9" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F1684E" onClick={this.changeChild1Color.bind(this)}>&nbsp;</a></li>
                        </ul>
                    </div>
                    <div>
                        <span style={{"color":tipsColor}}>改变第二个child背景色</span>
                        <ul>
                            <li><a data-color="#7B77FF" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#92CCE1" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F68686" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#FFE3B9" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                            <li><a data-color="#F1684E" onClick={this.changeChild2Color.bind(this)}>&nbsp;</a></li>
                        </ul>
                    </div>
                <hr/>
                </div>
                    <SwitchBgChild ref="child1" changeParentColor={this.changeParentBgColor.bind(this)} childBgColor={this.state.childBgColor}/>
                    <SwitchBgChild ref="child2" changeParentColor={this.changeParentBgColor.bind(this)} childBgColor={this.state.childBgColor}/>

            </div>
        )
    }
}

export default SwitchBgParent;
