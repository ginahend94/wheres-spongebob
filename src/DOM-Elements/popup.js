// import data from '../functions/getData';
import { getCharacters } from '../functions/characters';

const popup = (() => {
  const container = document.createElement('div');
  container.classList.add('popup-container');
  const bg = document.createElement('div');
  bg.classList.add('popup-bg');
  const ul = document.createElement('ul');
  ul.classList.add('popup');

  container.append(bg, ul);
  return container;
})();

const populateList = (list) => {
  const ul = popup.querySelector('ul');
  ul.textContent = '';
  list.forEach((character) => {
    if (character.found) return;
    const item = document.createElement('li');
    item.textContent = character.name;
    item.dataset.character = character.id;
    item.dataset.name = character.name;
    ul.append(item);
    item.addEventListener('click', () => {
      item.parentElement.childNodes.forEach((child) => {
        child.setAttribute('data-active', false);
      });
      item.dataset.active = true;
    });
  });
};

const hidePopup = () => {
  popup.style.display = 'none';
  popup.querySelector('.popup').childNodes.forEach((child) => {
    child.setAttribute('data-active', false);
  });
};

const movePopup = (e) => {
  popup.style.display = 'block';
  popup.style.top = `${e.pageY}px`;
  popup.style.left = `${e.pageX + 50}px`;
};
// TODO - fix page overflow of popup
const characters = getCharacters();

const selectCharacter = async (e) => {
  populateList(characters);
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

// const populateList = (list) => popup.populateList(list);

export default popup;
export { selectCharacter, populateList };
