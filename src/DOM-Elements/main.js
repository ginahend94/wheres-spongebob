import background from '../assets/images/background.jpg';

export default (() => {
  const container = document.createElement('main');
  const bg = new Image();
  bg.src = background;
  container.append(bg);

  return container;
})();
