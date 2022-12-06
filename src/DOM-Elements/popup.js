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
    item.dataset.name = name;
    container.append(item);
    item.addEventListener('click', () => {
      item.parentElement.childNodes.forEach((child) => child.setAttribute('data-active', false));
      item.dataset.active = true;
    });
  });
  return container;
})();

const hidePopup = () => {
  popup.style.display = 'none';
  popup.childNodes.forEach((child) => child.setAttribute('data-active', false));
  popup.parentElement.removeEventListener('click', hideOnOutsideClick);
};

let clickAway;

const hideOnOutsideClick = (e) => {
  if (!e.target.closest('.popup')) {
    console.log('outside');
    hidePopup();
  }
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
        resolve({
          id: item.dataset.character,
          name: item.dataset.name,
        });
        hidePopup();
      });
    });
    clickAway = (event) => {
      hideOnOutsideClick(event);
      reject();
    };
    setTimeout(() => {
      document.addEventListener('click', clickAway, { once: true });
    }, 0);
  });
};

export {
  popup,
  selectCharacter,
};
