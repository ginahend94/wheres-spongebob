import getData from './getData';
import { addCharacterImgs } from '../DOM-Elements/header';

const characters = [];
getData().then((res) => {
  Object.keys(res.characters).forEach((character) => {
    const name = character
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    characters.push({
      name,
      id: character,
      found: false,
    });
  });
  addCharacterImgs(characters);
});
// const getCharacters = () => characters;
const markAsFound = (character) => {
  const target = characters.find((char) => char.id === character);
  target.found = true;
};

export { markAsFound };
