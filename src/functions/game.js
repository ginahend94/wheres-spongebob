import testData from '../test.json';
import { selectCharacter } from '../DOM-Elements/popup';

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

  const start = () => {
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
    setTimeDisplay('00', '00', '00');
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

const stopGame = () => {
  timer.stop();
  console.log('stopping game');
};

const resetGame = () => {
  timer.reset();
  console.log('resetting game');
};

let isSelecting = false;
const getIsSelecting = () => isSelecting;
const setIsSelecting = (bool) => (isSelecting = bool);

const makeSelection = async (e) => {
  // Bubble stops following
  setIsSelecting(true);
  // x and y recorded
  const { pageX, pageY } = e;
  try {
  // List of characters appears
  // Click character name
    const character = await selectCharacter(e);
    // Get character location
    // Compare location to input
    const { x1, y1, x2, y2 } = testData.characters[character.id];
    // If input is within bounds, show success
    if (pageX > x1 && pageX < x2 && pageY > y1 && pageY < y2) {
      // show success
      // TEST
      alert(`You found ${character.name}!`);
      // Disable character
      // Remove character from list
    } else {
      // show failure
      // TEST
      alert(`Oops, ${character.name} isn't there!`);
    }
    setIsSelecting(false);
  } catch (err) {
    console.log('clicked away');
  }
  setIsSelecting(false);
};

export {
  startGame,
  stopGame,
  resetGame,
  timer,
  getIsSelecting as isSelecting,
  makeSelection,
};
