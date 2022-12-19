import { formatScore } from '../functions/scores';

const timer = (() => {
  const container = document.createElement('div');
  container.classList.add('timer');
  const hrs = document.createElement('span');
  const mm = document.createElement('span');
  const ss = document.createElement('span');
  const cs = document.createElement('span');
  container.append(hrs, ':', mm, ':', ss, '.', cs);

  const setTimeDisplay = (hrTime = 0, mmTime = 0, ssTime = 0, csTime = 0) => {
    hrs.textContent = hrTime.toString().padStart(2, '0');
    mm.textContent = mmTime.toString().padStart(2, '0');
    ss.textContent = ssTime.toString().padStart(2, '0');
    cs.textContent = csTime.toString().padStart(2, '0');
  };

  setTimeDisplay();

  let int;

  let startTime = 0;
  let currentTime = 0;
  let elapsedTime = 0;

  const checkCurrentTime = () => (currentTime = Date.now());

  const start = () => {
    if (!startTime) startTime = Date.now();
    int = setInterval(() => {
      checkCurrentTime();
      elapsedTime = currentTime - startTime;
      const time = formatScore(elapsedTime);
      setTimeDisplay(time.hrs, time.mm, time.ss, time.cs);
    }, 10);
  };

  const stop = () => {
    clearInterval(int);
    return elapsedTime;
  };

  const reset = () => {
    stop();
    setTimeDisplay();
  };

  return {
    container,
    start,
    stop,
    reset,
  };
})();

const controls = (() => {
  const startGame = () => timer.start();

  const stopGame = () => timer.stop();

  const resetGame = () => timer.reset();

  return {
    start: startGame,
    stop: stopGame,
    reset: resetGame,
  };
})();

export default timer;
export { controls };
