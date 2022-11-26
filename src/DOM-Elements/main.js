export default (() => {
  const container = document.createElement('main');
  container.textContent = 'MAIN';

  // TEST
  const ital = document.createElement('span');
  ital.textContent = 'This will be italicized';
  const norm = document.createElement('div');
  norm.textContent = 'this won\'t';
  container.append(ital, norm);

  return container;
})();
