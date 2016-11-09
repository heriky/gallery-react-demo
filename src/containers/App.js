import React from 'react';
import {render,findDOMNode} from 'react-dom' ;
import ImageList from '../components/ImageList';
import Control from '../components/Control' ;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.setImageView = this.setImageView.bind(this) ; // 组件渲染顺序是从内到外，因此内部组件的ComponentDidMount先执行，从而获得图片的尺寸，再传递出来。
        this.handleControlClick = this.handleControlClick.bind(this) ;
        this.handleImgClick = this.handleImgClick.bind(this) ;

      	let infos = this.getImgInfos();
        this.state = {         //getInitialState只能用在createClass中，不能用在ES6中
        	imgInfos:infos,
        	selected:0,
            inversed:false  // 表示当前selected的元素是否处于inversed状态
        };
        
        this.Constant = {
        	ivWidth:0, // ImageView挂载后的尺寸
        	ivHeight:0,
        	leftSecLowX:0, // 表示左边区域X值的下限
        	leftSecUpX:0,
        	rightSecLowX:0, // 右边区域X值的上下限
        	rightSecUpX:0,
        	lrWholeLowY:0, // 左右区域公用一个Y值的上下限
        	lrWholwUpY:0,

        	centerSecLowX:0, // 中间局域左右上下的界限
        	centerSecUpx:0,
        	centerSecUpY:0,
        	centerSecLowY:0
        }
    }
    getImgInfos(){
    	let imgInfos = [] ;
		for(let i=0;i<10;i++){
			imgInfos.push({
				src:`./assets/pic${i}.jpg`,
				desc:`这是第${i}张图片!`,
				rotate:Math.floor(Math.random()*180),
				pos:{top:0,left:0},
				index:i,
			})
		}; 
		return imgInfos;  
    }
    getImgNewInfos(){
    	let imgInfos = [] ;
		for(let i=0;i<10;i++){
			let pos = Math.random() > 0.5 ? this.getRandomPosLeft(i) : this.getRandomPosRight(i);
			imgInfos.push({
				src:`./assets/pic${i}.jpg`,
				desc:`这是第${i}张图片!`,
				rotate:Math.floor(Math.random()*180),
				pos:pos,
				index:i,
			})
		}; 
		return imgInfos;  
    }
    componentDidMount() {
    	//alert('x')
    	this.setConstant() ; // 初始化Constant中各个边界值
		let imgNewInfos = this.getImgNewInfos();
		this.setState(Object.assign({},this.state,{  // 新的state去覆盖旧的state，不要直接去修改state对象
            imgInfos:imgNewInfos
        }))
		console.info("App组件渲染");
    }
    setConstant(){

    	let imDOM = findDOMNode(this.refs.imList);
    	//let h = imDOM.scrollHeight; // 容器宽高
    	let h = 700; // 挂载的时候计算由外部css一起的样式变化的值，真是蛋疼
    	let w = imDOM.offsetWidth ;

    	this.Constant.leftSecLowX = -this.Constant.ivWidth / 2; // 表示左边区域X值的下限
    	this.Constant.leftSecUpX = w / 2 - this.Constant.ivWidth/2 * 3;
    	this.Constant.rightSecLowX =  w / 2 + this.Constant.ivWidth / 2; // 右边区域X值的上下限
    	this.Constant.rightSecUpX = w - this.Constant.ivWidth / 2 ;
    	this.Constant.lrWholeLowY = -this.Constant.ivHeight / 2; // 左右区域公用一个Y值的上下限
    	this.Constant.lrWholwUpY = h - this.Constant.ivHeight / 2;
    	
    	this.Constant.centerSecLowX = w/2 - this.Constant.ivWidth; // 中间局域左右上下的界限
    	this.Constant.centerSecUpx = w / 2;
    	this.Constant.centerSecUpY = -this.Constant.ivHeight/2;
    	this.Constant.centerSecLowY = h/2 - this.Constant.ivHeight/2*3;

    }
    getRandomPosLeft(index){
    	return{
    		top:this.Constant.lrWholeLowY + Math.random()*(this.Constant.lrWholwUpY - this.Constant.lrWholeLowY),
    		left:this.Constant.leftSecLowX + Math.random()*(this.Constant.leftSecUpX - this.Constant.leftSecLowX)
    	}
    }
    getRandomPosRight(index){
    	return{
    		top:this.Constant.lrWholeLowY + Math.random()*(this.Constant.lrWholwUpY - this.Constant.lrWholeLowY),
    		left:this.Constant.rightSecLowX + Math.random()*(this.Constant.rightSecUpX - this.Constant.rightSecLowX)
    	}
    }
    getRandomPosCenter(index){

    }
    setImageView(imageView){
    	this.Constant.ivWidth = imageView.scrollWidth;
    	this.Constant.ivHeight = imageView.scrollHeight;
    }
    handleControlClick(index){
    	const imgInfos = this.getImgNewInfos();
    	this.setState(Object.assign({},this.state,{
    		imgInfos,
    		selected:index,
            inversed:false
    	}));
    }
    handleImgClick(){
        let currentInversed = this.state.inversed;
        this.setState(Object.assign({},this.state,{
            inversed:!currentInversed 
        }))
    }
    render() {
        return <div style={{height:'100%',width:'100%'}}>
			<ImageList 
				ref='imList'
				passImageView={this.setImageView} 
                onImgClick = {this.handleImgClick}
				{...this.state}
				/>
			<Control 
			{...this.state}
			onControlClick = {this.handleControlClick}/>
        </div>;
    }
}

export default App;
