import React,{Component,PropTypes} from 'react';
import Radium from 'radium' ;

function getStyles(props,ctx){ // 属性和上下文
    const preparedStyle =  {
        root:{
            position:'fixed',
            bottom:50,
            left:'50%',
            padding:0,
            transform:"translateX(-50%)"
        },
        ctrl:{
            display:"inline-block",
            height:"10px",
            width:"10px",
            borderRadius:"50%",
            background:"#999",
            marginRight:"12px",
            cursor:"pointer",
            verticalAlign:"middle",
            textAlign:"center",
            color:"#000",
            transition:'transform .8s ease-in-out'
        },
        selected:{
            width:"15px",
            height:"15px",
            background:"#eee",
            lineHeight:"15px",
            transform: props.inversed &&'rotateY(180deg)',
            border:'1px solid #f00'
        },
        inversed:{
            transform:'rotateY(180deg)'
        }
    }

    return Object.assign({}, preparedStyle,props.style) ; // 样式覆盖
}

class Control extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Control';
        this.handleClick = this.handleClick.bind(this) ;
    }
    handleClick(e){
    	let index = e.target.value ;
    	this.props.onControlClick(index) ;
    }
    render() {
        const {style,imgInfos,selected,inversed} = this.props;
        const styles = getStyles(this.props,this.context) ; // 获取预置的样式,一般逻辑造成的样式改变鞋子啊

        return <ul style={styles.root}>
        	{imgInfos.map((info,index)=>
        		<li 
                key={index} 
                onClick = {this.handleClick} 
                value={info.index}
                style = {[styles.ctrl, (selected == index) && styles.selected]}
        		>
                {selected == index &&<i className="iconfont" value={info.index}>&#xe97b;</i>}
                </li>
        	)}
        </ul>;
    }
}
Control.propTypes = {
    style:PropTypes.object,
    imgInfos:PropTypes.arrayOf(PropTypes.shape({
        index:PropTypes.number
    }).isRequired).isRequired,
    selected:PropTypes.number.isRequired,
    inversed:PropTypes.bool.isRequired,
    onControlClick:PropTypes.func
}
Control.defaultProps = {

}

export default Radium(Control);
