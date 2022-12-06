import data from './getData';

const characters = [];

Object.keys(data.characters).forEach((character) => {
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
const getCharacters = () => characters;
const markAsFound = (character) => {
  const target = characters[characters.findIndex((char) => char.id === character)];
  target.found = true;
  console.log(characters);
};

export {
  getCharacters,
  markAsFound,
};
