import header from '../DOM-Elements/header';
import main from '../DOM-Elements/main';
import footer from '../DOM-Elements/footer';
import modal from '../DOM-Elements/modal';
import { popup, movePopup } from '../DOM-Elements/popup';

export default () => {
  const root = document.body;
  root.append(
    header,
    main,
    footer,
    modal.dialog,
    popup,
  );
  // main.addEventListener('click', movePopup);
};
