import React,{Component,PropTypes} from 'react';
import {findDOMNode} from 'react-dom' ;
import {render} from 'react-dom' ;
import ImageView from '../ImageView' ;

function getStyles(props,context){
    var preparedStyles={
        root:{
            height:'100%',
            width:'100%'
        }
    }
    return preparedStyles ;
}

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'ImageList';
    }
     componentDidMount() {
        console.log("ImageList组件渲染...");
        this.props.passImageView(findDOMNode(this.refs.imageView0)) ;   // 传递给上层
    }
    render() {
    	const imgInfos = this.props.imgInfos ;
    	const selected = this.props.selected;
        const inversed = this.props.inversed;
        const onImgClick = this.props.onImgClick;

        const styles = getStyles(this.props) ;
        return <div style={styles.root}>
        	{imgInfos.map((info,index)=>
        		<ImageView 
        		key={index} 
        		ref={"imageView"+index}
        		{...info}
        		isSelected={selected == index}
                inversed = {inversed}
                onImgClick = {onImgClick}
        		/>
        	)}
        </div>;
    }
}
ImageList.propTypes={
    style:React.PropTypes.object,
    imgInfos:PropTypes.arrayOf(PropTypes.shape({
        index:PropTypes.number
    }).isRequired).isRequired,
    selected:PropTypes.number.isRequired,
    inversed:PropTypes.bool.isRequired,
    onImgClick:PropTypes.func,
}
ImageList.defaultProps = {

}
export default ImageList;
