import testData from '../test.json';

const popup = (() => {
  const list = testData.characters;
  const container = document.createElement('ul');
  container.classList.add('popup');
  Object.keys(list).forEach((character) => {
    // Change name to title case
    const name = character
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    const item = document.createElement('li');
    item.textContent = name;
    item.dataset.character = character;
    container.append(item);
    item.addEventListener('click', () => {
      item.parentElement.childNodes.forEach((child) => child.setAttribute('data-active', false));
      item.dataset.active = true;
    });
  });
  return container;
})();

const movePopup = (e) => {
  popup.style.display = 'block';
  popup.style.top = `${e.pageY}px`;
  popup.style.left = `${e.pageX}px`;
};

const hidePopup = () => {
  popup.style.display = 'none';
};

const selectCharacter = async (e) => {
  movePopup(e);
  return new Promise((resolve) => {
    popup.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        resolve(item.dataset.character);
        hidePopup();
      });
    });
  });
};

export {
  popup,
  selectCharacter,
};
