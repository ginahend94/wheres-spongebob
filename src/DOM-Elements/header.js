import modal from './modal';

export default (() => {
  const container = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Where\'s SpongeBob?';
  const about = document.createElement('button');
  about.textContent = 'About';
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
    about,
  );

  return container;
})();
