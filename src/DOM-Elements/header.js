import { timer } from '../functions/game';

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
  const characters = document.createElement('div');
  const characterSrcs = importImages();
  const imgs = Object.keys(characterSrcs).map((key) => {
    const fig = document.createElement('figure');
    const img = new Image();
    const cap = document.createElement('figcaption');
    img.src = characterSrcs[key];
    img.classList.add(key.toLowerCase(), 'character');
    img.setAttribute('data-found', false);
    cap.textContent = key.replace(/-/g, ' ');
    fig.append(img, cap);
    return fig;
  });
  // Later, cycle through characters
  // imgs.forEach((a) => characters.append(a));
  const addCharacterImgs = (list) => {
    list.forEach((character) => {
      characters.append(imgs.find((a) => a.querySelector(`.${character.id}`)));
    });
  };
  // characters.append(
  //   imgs.find((a) => a.querySelector('.old-man-walker')),
  //   imgs.find((a) => a.querySelector('.mama-krabs')),
  //   imgs.find((a) => a.querySelector('.bubble-bass')),
  // );

  title.textContent = 'Where\'s SpongeBob?';
  characters.classList.add('characters');

  container.append(
    title,
    characters,
    timer.container,
  );

  return {
    container,
    addCharacterImgs,
  };
})();

const addCharacterImgs = () => header.addCharacterImgs();

export default header.container;
export { addCharacterImgs };
