/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import 'iconify-icon';

const hideElement = (element, selector) => {
  const hide = (e) => {
    if (!e.target.closest(selector)) {
      element.style.display = 'none';
      removeListener();
    }
  };
  const removeListener = () => {
    document.body.removeEventListener('click', hide);
  };
  document.body.addEventListener('click', hide);
};

const icon = (name) => {
  const iconifyIcon = document.createElement('iconify-icon');
  iconifyIcon.setAttribute('icon', name);
  return iconifyIcon;
};

const createLink = (opts) => {
  const a = document.createElement('a');
  a.append(opts.text);
  a.setAttribute('href', opts.href);
  a.target = '_blank';
  if (opts.title) a.title = opts.title;
  return a;
};

const load = (name) => {
  if (localStorage.getItem(name) == null) {
    // console.log('You haven\'t created this value yet.')
    return false;
  }
  return JSON.parse(localStorage.getItem(name));
};

const save = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export {
  hideElement,
  icon,
  createLink,
  load,
  save,
};
