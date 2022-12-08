import { controls } from './timer';
import { getCharacters, getImages } from '../functions/characters';

const curtain = (() => {
  const cont = document.createElement('div');
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  const characterContainer = document.createElement('div');
  const start = document.createElement('button');

  cont.classList.add('curtain');
  h2.textContent = 'Where\'s SpongeBob?';
  h3.textContent = 'FIND:';
  characterContainer.classList.add('character-container');

  const characters = getCharacters();
  const images = getImages();
  characters.forEach((character) => characterContainer.append(
    images[
      images.findIndex(
        (img) => img.dataset.character.toLowerCase() === character.id
      )
    ]
  ));

  start.textContent = 'Start';
  start.addEventListener('click', controls.start);
  cont.append(
    h2,
    h3,
    characterContainer,
    start,
  );
  return cont;
})();

export default curtain;
