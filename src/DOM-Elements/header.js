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
  const imgs = Object.keys(characterSrcs).map((key) => {
    const fig = document.createElement('figure');
    const img = new Image();
    const cap = document.createElement('figcaption');
    img.src = characterSrcs[key];
    fig.classList.add(key.toLowerCase(), 'character');
    fig.setAttribute('data-found', false);
    cap.textContent = key.replace(/-/g, ' ');
    fig.append(img, cap);
    return fig;
  });
  // Later, cycle through characters
  characterContainer.textContent = 'Loading...';
  const addCharacterImgs = (list) => {
    characterContainer.innerHTML = '';
    list.forEach((character) => {
      characterContainer.append(imgs.find((a) => a.classList.contains(character.id)));
    });
  };
  addCharacterImgs(getCharacters());

  title.textContent = 'Where\'s SpongeBob?';
  characterContainer.classList.add('characters');

  container.append(
    title,
    characterContainer,
    timer.container,
  );

  return container;
})();

// const addCharacterImgs = (list) => header.addCharacterImgs(list);

export default header;
// export { addCharacterImgs };
