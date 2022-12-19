import { getChars } from '../firebase';
import { selectCharacter } from '../DOM-Elements/popup';
import showToast from '../DOM-Elements/toast';
import { getCharacters, markAsFound, resetCharacters } from './characters';
import { addCharacterImgs } from '../DOM-Elements/header';
import { controls } from '../DOM-Elements/timer';
import curtain from '../DOM-Elements/curtain';
import { isHigh } from './scores';

let isSelecting = false;
const getIsSelecting = () => isSelecting;
const setIsSelecting = (bool) => (isSelecting = bool);

const startGame = () => {
  // Remove curtain
  curtain.remove();
  // Start timer
  controls.start();
};
curtain.startButton.addEventListener('click', startGame);

const endGame = () => {
  // End game
  const score = controls.stop();
  // Draw curtain
  curtain.display();
  // Show postgame
  curtain.postGame.init(score, isHigh(score));
};

const resetGame = () => {
  // fill with pregame
  curtain.preGame.init();
  // reset timer
  controls.reset();
  // set all characters to not found
  resetCharacters();
};
curtain.replayButton.addEventListener('click', resetGame);

const gameWon = () => getCharacters().every((character) => character.found);

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
    const charData = await getChars();
    // Compare location to input
    const {
      x1, y1, x2, y2
    } = charData[character.id];
    // If input is within bounds, show success
    if (pageX > x1 && pageX < x2 && pageY > y1 && pageY < y2) {
      // show success
      showToast('green', `You found ${character.name}!`);
      // Disable character
      // Remove character from list
      markAsFound(character.id);
      addCharacterImgs(getCharacters());
      if (gameWon()) {
        endGame();
      }
    } else {
      // show failure
      showToast('red', `Oops, ${character.name} isn't there.`);
    }
    setIsSelecting(false);
  } catch (err) {
    setIsSelecting(false);
  }
};

export { getIsSelecting as isSelecting, makeSelection };
