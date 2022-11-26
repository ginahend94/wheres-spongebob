import modal from './modal';

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

export default (() => {
  const container = document.createElement('header');
  const title = document.createElement('h1');
  const about = document.createElement('button');
  const characters = document.createElement('div');
  const characterSrcs = importImages();
  const imgs = Object.keys(characterSrcs).map((key) => {
    const fig = document.createElement('figure');
    const img = new Image();
    const cap = document.createElement('figcaption');
    img.src = characterSrcs[key];
    img.classList.add(key.toLowerCase(), 'character');
    cap.textContent = key.replace(/-/g, ' ');
    fig.append(img, cap);
    return fig;
  });
  imgs.forEach((a) => characters.append(a));

  title.textContent = 'Where\'s SpongeBob?';
  about.textContent = 'About';
  characters.classList.add('characters');

  const setModal = () => {
    modal.setTitle('About');
    modal.setText(`
    <p>This is a game in the style of <cite>Where's Waldo</cite>. Search the image for the characters and click when you've found them!
    `);
    modal.open();
  };

  about.addEventListener('click', setModal);

  container.append(
    title,
    // about,
    characters,
  );

  return container;
})();
