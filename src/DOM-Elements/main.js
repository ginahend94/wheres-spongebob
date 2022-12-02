import background from '../assets/images/background.jpg';
import { endGame, startGame } from '../functions/game';
import { bubble, bubbleFollow } from './cursor';

export default (() => {
  const container = document.createElement('main');
  const curtain = (() => {
    const cont = document.createElement('div');
    cont.classList.add('curtain');
    const start = document.createElement('button');
    const stop = document.createElement('button');
    start.textContent = 'Start';
    stop.textContent = 'Stop';
    start.addEventListener('click', startGame);
    stop.addEventListener('click', endGame);
    cont.append(
      start,
      stop,
    );
    return cont;
  })();
  const bg = new Image();
  bg.src = background;

  container.addEventListener('mousemove', bubbleFollow);

  container.append(
    curtain,
    bg,
    bubble,
  );

  return container;
})();
