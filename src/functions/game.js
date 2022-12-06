import data from './getData';
import { selectCharacter } from '../DOM-Elements/popup';
import showToast from '../DOM-Elements/toast';
import { getCharacters, markAsFound } from './characters';
import { addCharacterImgs } from '../DOM-Elements/header';

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
    const { x1, y1, x2, y2 } = data.characters[character.id];
    // If input is within bounds, show success
    if (pageX > x1 && pageX < x2 && pageY > y1 && pageY < y2) {
      // show success
      showToast('green', `You found ${character.name}!`);
      // Disable character
      // Remove character from list
      markAsFound(character.id);
      setTimeout(() => {
        addCharacterImgs(getCharacters());
      }, 10);
    } else {
      // show failure
      showToast('red', `Oops, ${character.name} isn't there.`);
    }
    setIsSelecting(false);
  } catch (err) {
    setIsSelecting(false);
  }
};

export {
  getIsSelecting as isSelecting,
  makeSelection,
};
