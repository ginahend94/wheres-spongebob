import background from '../assets/images/background.jpg';
import { bubble, bubbleFollow } from './cursor';

const main = (() => {
  const container = document.createElement('main');
  const bg = new Image();
  bg.src = background;

  container.addEventListener('mousemove', bubbleFollow);

  container.append(
    bg,
    bubble,
  );

  return {
    container,
  };
})();

export default main.container;
