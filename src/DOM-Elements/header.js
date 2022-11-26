import modal from "./modal";

export default (() => {
  const container = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Where\'s SpongeBob?';
  const about = document.createElement('button');
  about.textContent = 'About';
  about.addEventListener('click', () => modal.open());

  container.append(
    title,
    about,
  );

  return container;
})();
