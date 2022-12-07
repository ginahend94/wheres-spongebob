import timer from './timer';
import { getCharacters, getImages } from '../functions/characters';

// const importImages = () => {
//   const imgObj = {};
//   const importAll = (r) => {
//     const keys = r.keys();
//     const urls = r.keys().map(r);
//     return urls.forEach((url, i) => {
//       const key = keys[i].replace(/.\/|.png/g, '');
//       imgObj[key] = url;
//     });
//   };
//   importAll(
//     // import all images
//     require.context('../assets/images/characters', false, /\.png$/)
//   );
//   return imgObj;
// };

const header = (() => {
  const container = document.createElement('header');
  const title = document.createElement('h1');
  const characterContainer = document.createElement('div');
  const images = getImages();
  // Later, cycle through characters
  characterContainer.textContent = 'Loading...';
  const updateCharacterImgs = (list) => {
    characterContainer.textContent = '';
    images.forEach((img) => {
      const match = list.find((item) => item.id === img.dataset.character.toLowerCase());
      if (!match) return;
      img.setAttribute('data-found', match.found);
    });
    list.forEach((character) => {
      characterContainer.append(images.find((a) => a.classList.contains(character.id)));
    });
  };
  updateCharacterImgs(getCharacters());

  title.textContent = 'Where\'s SpongeBob?';
  characterContainer.classList.add('characters');

  container.append(
    title,
    characterContainer,
    timer.container,
  );

  return {
    container,
    addCharacterImgs: updateCharacterImgs
  };
})();

const addCharacterImgs = (list) => header.addCharacterImgs(list);

export default header.container;
export { addCharacterImgs };
