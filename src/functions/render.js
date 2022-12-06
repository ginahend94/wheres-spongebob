import header from '../DOM-Elements/header';
import main from '../DOM-Elements/main';
import footer from '../DOM-Elements/footer';
import modal from '../DOM-Elements/modal';
import { popup } from '../DOM-Elements/popup';
import { makeSelection } from './game';
// TEST
import { newToast } from '../DOM-Elements/toast';

export default () => {
  const root = document.body;
  root.append(
    header,
    main,
    footer,
    modal.dialog,
    popup,
    newToast('red', 'fail'), // TEST
    newToast('green', 'You found Old Man Walker!') // TEST
  );
  main.addEventListener('click', makeSelection);
};
