import React,{Component,PropTypes} from 'react';
import {render} from 'react-dom' ;
import className from 'classname' ;
import Radium from 'radium' ;

function getStyles(props,ctx){ // 属性和上下文
    const preparedStyle =  {
        root:{
            position:'absolute',
            perspective:800,
            textAlign: "center",
            top:props.pos.top,
            left:props.pos.left,
            transform:`rotate(${props.rotate}deg)`,
            transition:'all .8s ease-in-out',
        },
        // 备注：通过props的值来动态生成style，如果一次性影响的值太多，那么就单独写一个对象处理
        // 例如这里的center对象，并在style属性中使用radium进行判断
        //但是如果只是少于三个的属性被影响，则直接写内联的表达式，善用&&即可。例如下面的fig中的transform
        center:{   
            top: "50%",
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(0deg)',
            zIndex: 1,
            cursor:'pointer',
        }
        ,
        fig:{
            margin:0,
            padding: "3px",
            borderRadius: "3px",
            boxShadow: "1px 1px 2px #aaa",
            background: "#fff",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transformOrigin:'left',
            transform:props.isSelected && props.inversed &&'translate(100%) rotateY(180deg)',
            transition:'all .8s ease-in-out'
        },
        img:{
            width:230
        },
        backface:{
            position:'absolute',
            top:0,
            left:0,
            height:'100%',
            width:'100%',
            fontSize:20,
            color:'#f00',
            overflow:'hidden',
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transformOrigin:'left',
            transform:props.isSelected&&props.inversed ?'rotateY(0deg)':'translate(100%) rotateY(-180deg)',
            transition:'all .8s ease-in-out',
            backgroundColor:'rgba(255,255,255,1)'
        },
    }

    return preparedStyle;
}

class ImageView extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'ImageView';

        this.handleClick = this.handleClick.bind(this) ;
    }
    handleClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onImgClick();
    }
    render() {
    	const {src,desc,rotate,pos,isSelected,inversed} = this.props;   // 也可以直接将styleObject从父元素传递过来，这里就不用辛苦拼接了
    	const im = require(src) ; // 加载图片
    	const styles = getStyles(this.props) ;
        return <div style= {[styles.root,isSelected && styles.center]}
                     onClick = {isSelected ? this.handleClick : ()=>{}}>
            <figure
                style={styles.fig}
                >  
            <img 
                title="标题"
                src={im} 
                style = {styles.img}
                />
            <figcaption >{desc}</figcaption>
        </figure>
        <span style={styles.backface}>这是背面，我露个脸</span>
        </div>;
            
    }
}

ImageView.propTypes = {
    src:PropTypes.string.isRequired, // style只是使用inline-style用来覆盖root的样式的
    desc:PropTypes.string,
    rotate:PropTypes.number,
    pos:PropTypes.shape({
        left:PropTypes.number,
        top:PropTypes.number
    }.isRequired).isRequired,
    isSelected:PropTypes.bool.isRequired,
    style:PropTypes.object
}

ImageView.defaultProps = {

}

export default Radium(ImageView);

    	 	
