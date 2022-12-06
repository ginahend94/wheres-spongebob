import { controls } from './timer';

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
    start.addEventListener('click', controls.start);
    stop.addEventListener('click', controls.stop);
    reset.addEventListener('click', controls.reset);
    cont.innerHTML = '';
    cont.append(start, stop, reset);
  };
  return {
    cont,
    fillCurtain,
  };
})();

export default curtain;
