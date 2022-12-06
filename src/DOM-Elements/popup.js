import getData from '../functions/getData';

const popup = (() => {
  const container = document.createElement('div');
  container.classList.add('popup-container');
  const bg = document.createElement('div');
  bg.classList.add('popup-bg');
  const ul = document.createElement('ul');
  ul.classList.add('popup');
  getData().then((res) => {
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
      ul.append(item);
      item.addEventListener('click', () => {
        item.parentElement.childNodes.forEach((child) =>
          child.setAttribute('data-active', false)
        );
        item.dataset.active = true;
      });
    });
    const cancel = document.createElement('li');
    cancel.textContent = 'Cancel';
    cancel.classList.add('cancel');
    ul.append(cancel);
  });
  container.append(bg, ul);
  return container;
})();

const hidePopup = () => {
  popup.style.display = 'none';
  popup.childNodes.forEach((child) => child.setAttribute('data-active', false));
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
          reject(new Error('canceled'));
        }
        resolve({
          id: item.dataset.character,
          name: item.dataset.name,
        });
        hidePopup();
      });
    });
    popup.querySelector('.popup-bg').addEventListener('click', () => {
      reject(new Error('clicked outside'));
      hidePopup();
    });
  });
};

export { popup, selectCharacter };
