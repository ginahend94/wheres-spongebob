import './characters';
import header from '../DOM-Elements/header';
import curtain from '../DOM-Elements/curtain';
import main from '../DOM-Elements/main';
import footer from '../DOM-Elements/footer';
import { popup } from '../DOM-Elements/popup';
import { makeSelection } from './game';

export default () => {
  const root = document.body;
  root.innerHTML = '';
  root.append(
    header,
    main,
    footer,
    popup,
    curtain.cont,
  );
  main.addEventListener('click', makeSelection);
};
