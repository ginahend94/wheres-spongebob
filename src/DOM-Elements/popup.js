import testData from '../test.json';
import getData from '../functions/getData';

const popup = (() => {
  // const list = testData.characters;
  const container = document.createElement('ul');
  container.classList.add('popup');
  getData()
    .then((res) => {
      const list = res.characters;
      Object.keys(list).forEach((character) => {
        // Change name to title case
        const name = character
          .split('-')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' ');
        const item = document.createElement('li');
        item.textContent = name;
        item.dataset.character = character;
        item.dataset.name = name;
        container.append(item);
        item.addEventListener('click', () => {
          item.parentElement.childNodes.forEach((child) => child.setAttribute('data-active', false));
          item.dataset.active = true;
        });
      });
      const cancel = document.createElement('li');
      cancel.textContent = 'Cancel';
      cancel.classList.add('cancel');
      container.append(cancel);
    });
  return container;
})();

const hidePopup = () => {
  popup.style.display = 'none';
  popup.childNodes.forEach((child) => child.setAttribute('data-active', false));
  popup.parentElement.removeEventListener('click', hideOnOutsideClick);
};

const movePopup = (e) => {
  popup.style.display = 'block';
  popup.style.top = `${e.pageY}px`;
  popup.style.left = `${e.pageX + 50}px`;
};

const selectCharacter = async (e) => {
  movePopup(e);
  return new Promise((resolve, reject) => {
    popup.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('cancel')) {
          console.log('oh');
          reject();
        }
        resolve({
          id: item.dataset.character,
          name: item.dataset.name,
        });
        hidePopup();
      });
    });
  });
};

export { popup, selectCharacter };
