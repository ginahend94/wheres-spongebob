import header from '../DOM-Elements/header';
import main from '../DOM-Elements/main';
import footer from '../DOM-Elements/footer';
import modal from '../DOM-Elements/modal';

export default () => {
  const root = document.body;
  root.append(
    header,
    main,
    footer,
    modal.dialog,
  );
};
