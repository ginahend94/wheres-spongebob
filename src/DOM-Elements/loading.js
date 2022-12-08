const loading = (() => {
  const container = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = 'Loading...';
  container.append(h2);
  container.classList.add('loading');
  return container;
})();

export default loading;
