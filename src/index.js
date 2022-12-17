import 'normalize-css/normalize.css';
import './style.css';
import './firebase';
import loading from './DOM-Elements/loading';
import render from './functions/render';

document.body.append(loading);
render();
