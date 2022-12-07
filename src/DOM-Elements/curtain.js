import { controls } from './timer';

const curtain = (() => {
  const cont = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = 'Where\'s SpongeBob?';
  const h3 = document.createElement('h3');
  h3.textContent = 'FIND:';
  const characterContainer = document.createElement('div');
  cont.classList.add('curtain');
  cont.addEventListener('click', (e) => e.stopImmediatePropagation());
  cont.textContent = 'Loading...';
  const fillCurtain = () => {
    const start = document.createElement('button');
    const stop = document.createElement('button');
    const reset = document.createElement('button');
    start.textContent = 'Start';
    stop.textContent = 'Pause';
    reset.textContent = 'Reset';
    start.addEventListener('click', controls.start);
    stop.addEventListener('click', controls.stop);
    reset.addEventListener('click', controls.reset);
    cont.innerHTML = '';
    cont.append(
      start,
      // stop,
      // reset,
    );
  };
  fillCurtain();
  return {
    cont,
    fillCurtain,
  };
})();

export default curtain;
