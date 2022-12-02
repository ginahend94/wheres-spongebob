const timer = (() => {
  const container = document.createElement('div');
  container.classList.add('timer');
  const mm = document.createElement('span');
  const ss = document.createElement('span');
  const ms = document.createElement('span');
  container.append(
    mm,
    ':',
    ss,
    '.',
    ms,
  );

  const setTimeDisplay = (mmTime, ssTime, msTime) => {
    mm.textContent = mmTime.toString().padStart(2, '0');
    ss.textContent = ssTime.toString().padStart(2, '0');
    ms.textContent = parseInt(msTime, 10).toString().padStart(2, '0');
  };

  setTimeDisplay('00', '00', '0');

  let int;

  const start = () => {
    let mmTime = 0;
    let ssTime = 0;
    let msTime = 0;
    int = setInterval(() => {
      msTime += 1;
      if (msTime >= 100) {
        ssTime += 1;
        msTime = 0;
      }
      if (ssTime >= 60) {
        mmTime += 1;
        ssTime = 0;
      }
      setTimeDisplay(mmTime, ssTime, msTime);
    }, 1);
  };

  const resetTimer = () => {
    clearInterval(int);
    int = null;
    setTimeDisplay('00', '00', '000');
  };

  const stopTimer = () => {
    clearInterval(int);
  };

  return {
    container,
    start,
    reset: resetTimer,
    stop: stopTimer,
  };
})();

const startGame = () => {
  timer.start();
  console.log('starting game');
};

export {
  startGame,
  timer,
};
