var path = require('path') ;
var HtmlwebpackPlugin = require('html-webpack-plugin') ;
var webpack = require('webpack') ;
var cssnano = require('cssnano') ;

var ROOT_PATH = path.resolve(__dirname) ;
var APP_PATH = path.resolve(ROOT_PATH,'src') ;
var BUILD_PATH = path.resolve(ROOT_PATH,'build') ;
// var TEM_PATH = path.resovle(ROOT_PATH,'templates') ;
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 分离css文件

module.exports = {
	// name:'client',
	// target:'web',


	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry:{
		app:path.resolve(APP_PATH,'main.js') , //主入口文件
	} ,
	output:{
		path:BUILD_PATH,
		filename:'[name].[hash].js' // 这里加入[hash]表示使用hash来防止js文件缓存
	},
	plugins:[
		new HtmlwebpackPlugin({
			title:'React Gallery',
			// template:path.resovle(TEM_PATH,'index.html'),
			filename:'index.html',
			// chunks 指定要引用entry文件中哪个几个入口个文件
			chunks:['app','vendors'],
			// 表示script插入标签中
			inject:'body'
		}),
		// uglifyJS压缩代码
		new webpack.optimize.UglifyJsPlugin({minimize:true}),

		//new ExtractTextPlugin("[name].css")这一配置用于将css从js中分离出来

		new ExtractTextPlugin('[name].[contenthash].css', { allChunks: true})
	],
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,
		// contentBase:'./src/',
		// port: 8080,
		// publicPath:''
	},
	devtool:'eval-source-map',
	jshint:{esnext:true} // 开启jshint支持es6
	,
	resovle:{
		extensions:['','.js','.jsx'] //必须先写''否则会找index.js.js和index.js.jsx
		,
		alias:{
			//jquery:'../dist/jquery.min.js'
		}
	},
	postcss: function () {
	    return [require('autoprefixer'), require('precss')];
	}
	,
	module:{
		// 影响webpack 打包速度，建议在IDE中使用eslint

		// preLoaders:[
		// // {  // 使用preLoaders或者postLoaders
		// // 	test:/\.(js|jsx)$/,
		// // 	loader:'jshint-loader',
		// // 	include:APP_PATH
		// // },
		// {
		// 	test:/\.(js|jsx)$/,
		// 	loader:'eslint',
		// 	include:APP_PATH

		// }
		// ],
		loaders:[
			{
				test:/\.scss$/,
				loaders:['style','css?sourceMap&-minimize','postcss','sass?sourceMap'], // 多个使用loaders单个使用loader
				include:path.resolve(APP_PATH,'style/') // 表示这里放了公共的全局的样式
			},{
				test:/\.scss$/,
				exclude:path.resolve(APP_PATH,'style/'), // 公共样式之外的，都是用css-modules进行管理
				loaders:['style','css?modules&localIdentName=[name]__[local]-[hash:base64:5]','postcss','sass?sourceMap']
				// 这里放的是需要css_modules局部处理的样式
				// 一般ExtraText插件不会处理这里，因此必要时手动配置
				//loader: ExtractTextPlugin.extract('style','css?modules&localIdentName=[name]__[local]-[hash:base64:5]','postcss','sass?sourceMap')
			},{
				test:/\.(png|jpg)$/,
				loader:'url?limit=40000'
				// url-loader 用来加载图片资源
				// 省略文字loader，即url-loader简化为url
				// 也可以将参数写成单独一个项： query:{limit:40000}
			},{
				test:/\.(js|jsx)$/,
				loader:'babel',
				include:APP_PATH,
				exclude:/node_modules/,
			},
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=fonts/[name].[ext]'
			},
			//{ test: require.resolve("./src/js/tool/swipe.js"),  loader: "exports?swipe"}
			//以上配置用于暴露全局变量，例如jQuery等
		],
	}
};