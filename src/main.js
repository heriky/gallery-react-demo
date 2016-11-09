import React from 'react';
import {render} from 'react-dom' ;
import './style/normalize.scss';
import './style/style.scss';
import App from './containers/App';

const container = document.createElement('div') ;
container.className = 'container' ;
document.body.appendChild(container) ;
render(<App />,container,function(){
	//alert('x')
});
