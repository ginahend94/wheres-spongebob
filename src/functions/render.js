import header from '../DOM-Elements/header';
import main from '../DOM-Elements/main';
import footer from '../DOM-Elements/footer';

export default () => {
  const root = document.body;
  root.append(
    header,
    main,
    footer
  );
};
