import { formatScore } from '../functions/scores';

// const timer = (() => {
//   const container = document.createElement('div');
//   container.classList.add('timer');
//   const mm = document.createElement('span');
//   const ss = document.createElement('span');
//   const ms = document.createElement('span');
//   container.append(mm, ':', ss, '.', ms);

//   const setTimeDisplay = (mmTime, ssTime, msTime) => {
//     mm.textContent = mmTime.toString().padStart(2, '0');
//     ss.textContent = ssTime.toString().padStart(2, '0');
//     ms.textContent = parseInt(msTime, 10).toString().padStart(2, '0');
//   };

//   setTimeDisplay('00', '00', '0');

//   let int;

//   let mmTime = 0;
//   let ssTime = 0;
//   let msTime = 0;

//   const start = () => {
//     int = setInterval(() => {
//       msTime += 1;
//       if (msTime >= 100) {
//         ssTime += 1;
//         msTime = 0;
//       }
//       if (ssTime >= 60) {
//         mmTime += 1;
//         ssTime = 0;
//       }
//       setTimeDisplay(mmTime, ssTime, msTime);
//     }, 1);
//   };

//   const resetTimer = () => {
//     clearInterval(int);
//     int = null;
//     setTimeDisplay('00', '00', '00');
//   };

//   const stopTimer = () => {
//     clearInterval(int);
//     return {
//       mm: mmTime,
//       ss: ssTime,
//       ms: msTime,
//     };
//   };

//   return {
//     container,
//     start,
//     reset: resetTimer,
//     stop: stopTimer,
//   };
// })();

// TEST

const timer = (() => {
  const container = document.createElement('div');
  container.classList.add('timer');
  const mm = document.createElement('span');
  const ss = document.createElement('span');
  const ms = document.createElement('span');
  container.append(mm, ':', ss, '.', ms);

  const setTimeDisplay = (mmTime, ssTime, msTime) => {
    mm.textContent = mmTime.toString().padStart(2, '0');
    ss.textContent = ssTime.toString().padStart(2, '0');
    ms.textContent = parseInt(msTime, 10).toString().padStart(2, '0');
  };

  setTimeDisplay('00', '00', '0');

  let int;

  let mmTime = 0;
  let ssTime = 0;
  let msTime = 0;
  let startTime = 0;
  let currentTime = 0;
  let stopTime = 0;
  let running = false;

  const checkCurrentTime = () => (currentTime = Date.now());

  const start = () => {
    if (!startTime) startTime = Date.now();
    int = setInterval(() => {
      checkCurrentTime();
      const elapsedTime = currentTime - startTime;
      formatScore(elapsedTime);
      setTimeDisplay(elapsedTime);
      // msTime += 1;
      // if (msTime >= 100) {
      //   ssTime += 1;
      //   msTime = 0;
      // }
      // if (ssTime >= 60) {
      //   mmTime += 1;
      //   ssTime = 0;
      // }
      setTimeDisplay(mmTime, ssTime, msTime);
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(int);
    int = null;
    setTimeDisplay('00', '00', '00');
  };

  const stopTimer = () => {
    running = false;
    clearInterval(int);
    return {
      mm: mmTime,
      ss: ssTime,
      ms: msTime,
    };
  };

  return {
    container,
    start,
    reset: resetTimer,
    stop: stopTimer,
  };
})();

const controls = (() => {
  const startGame = () => {
    timer.start();
  };

  const stopGame = () => timer.stop();

  const resetGame = () => {
    timer.reset();
  };
  return {
    start: startGame,
    stop: stopGame,
    reset: resetGame,
  };
})();

// const controller = (() => {
//   let startTime;
//   let currentTime;
//   let stopTime;
//   let int;
//   const startTimer = () => (startTime = Date.now());
//   const checkCurrentTime = () => (currentTime = Date.now());
//   const stopTimer = () => (stopTime = Date.now());
//   // const start = () => {
//   //   int = setInterval(() => {
//   //     msTime += 1;
//   //     if (msTime >= 100) {
//   //       ssTime += 1;
//   //       msTime = 0;
//   //     }
//   //     if (ssTime >= 60) {
//   //       mmTime += 1;
//   //       ssTime = 0;
//   //     }
//   //     setTimeDisplay(mmTime, ssTime, msTime);
//   //   }, 1);
//   // }
// })();

const startBtn = (() => {
  const btn = document.createElement('button');
  btn.textContent = 'start';
  btn.addEventListener('click', timer.start);
  return btn;
})();
const stopBtn = (() => {
  const btn = document.createElement('button');
  btn.textContent = 'stop';
  btn.addEventListener('click', timer.stop);
  return btn;
})();

timer.container.append(startBtn, stopBtn);

export default timer;
export { controls };
