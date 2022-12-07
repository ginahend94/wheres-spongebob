import data from './getData';

const images = (() => {
  const characterSrcs = (() => {
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
  })();
  const imgs = Object.keys(characterSrcs).map((key) => {
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
  return imgs;
})();

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
const getImages = () => images;
const markAsFound = (character) => {
  const target =
    characters[characters.findIndex((char) => char.id === character)];
  target.found = true;
};

export { getCharacters, getImages, markAsFound };
