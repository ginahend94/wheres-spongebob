import './characters';
import header from '../DOM-Elements/header';
import main from '../DOM-Elements/main';
import footer from '../DOM-Elements/footer';
import { popup } from '../DOM-Elements/popup';
import { makeSelection } from './game';

export default () => {
  const root = document.body;
  root.append(
    header,
    main,
    footer,
    popup,
  );
  main.addEventListener('click', makeSelection);
};
