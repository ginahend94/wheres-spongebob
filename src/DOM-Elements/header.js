import timer from './timer';
import { getCharacters } from '../functions/characters';

const importImages = () => {
  const imgObj = {};
  const importAll = (r) => {
    const keys = r.keys();
    const urls = r.keys().map(r);
    return urls.forEach((url, i) => {
      const key = keys[i].replace(/.\/|.png/g, '');
      imgObj[key] = url;
    });
  };
  importAll(
    // import all images
    require.context('../assets/images/characters', false, /\.png$/)
  );
  return imgObj;
};

const header = (() => {
  const container = document.createElement('header');
  const title = document.createElement('h1');
  const characterContainer = document.createElement('div');
  const characterSrcs = importImages();
  let imgs = Object.keys(characterSrcs).map((key) => {
    const fig = document.createElement('figure');
    const img = new Image();
    const cap = document.createElement('figcaption');
    img.src = characterSrcs[key];
    fig.classList.add(key.toLowerCase(), 'character');
    fig.setAttribute('data-found', false);
    fig.setAttribute('data-character', key);
    cap.textContent = key.replace(/-/g, ' ');
    fig.append(img, cap);
    return fig;
  });
  // Later, cycle through characters
  characterContainer.textContent = 'Loading...';
  const updateCharacterImgs = (list) => {
    characterContainer.textContent = '';
    // imgs = imgs.reduce((fig) => {
    //   const match = list.find((item) => {
    //     console.log(item)
    //     console.log(fig.dataset.character.toLowerCase())
    //     return item.id === fig.dataset.character.toLowerCase();
    //   });
    //   fig.setAttribute('data-found', match.found);
    //   return fig;
    // });
    imgs.forEach((img) => {
      const match = list.find((item) => item.id === img.dataset.character.toLowerCase());
      if (!match) return;
      img.setAttribute('data-found', match.found);
    });
    list.forEach((character) => {
      characterContainer.append(imgs.find((a) => a.classList.contains(character.id)));
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
