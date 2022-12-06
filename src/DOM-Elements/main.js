import background from '../assets/images/background.jpg';
import { stopGame, startGame, resetGame } from '../functions/game';
import { bubble, bubbleFollow } from './cursor';

const main = (() => {
  const container = document.createElement('main');
  const curtain = (() => {
    const cont = document.createElement('div');
    cont.classList.add('curtain');
    cont.textContent = 'Loading...';
    const fillCurtain = () => {
      const start = document.createElement('button');
      const stop = document.createElement('button');
      const reset = document.createElement('button');
      start.textContent = 'Start';
      stop.textContent = 'Stop';
      reset.textContent = 'Reset';
      start.addEventListener('click', startGame);
      stop.addEventListener('click', stopGame);
      reset.addEventListener('click', resetGame);
      cont.innerHTML = '';
      cont.append(start, stop, reset);
    };
    return {
      cont,
      fillCurtain,
    };
  })();
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
