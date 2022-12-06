import background from '../assets/images/background.jpg';
import { bubble, bubbleFollow } from './cursor';
import curtain from './curtain';

const main = (() => {
  const container = document.createElement('main');
  const bg = new Image();
  bg.src = background;

  container.addEventListener('mousemove', bubbleFollow);

  container.append(
    curtain.cont,
    bg,
    bubble
  );

  return {
    container,
    fillCurtain: curtain.fillCurtain,
  };
})();

const fillCurtain = () => main.fillCurtain();

export default main.container;
export { fillCurtain };
