/* eslint-disable no-param-reassign */
import 'iconify-icon';

const hideElement = (element, selector) => {
  const hide = (e) => {
    if (!e.target.closest(selector)) {
      element.style.display = 'none';
      // removeListener();
    }
  };
  const removeListener = () => {
    document.body.removeEventListener('click', hide);
  };
  document.body.addEventListener('click', hide, { once: true });
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
    return false;
  }
  return JSON.parse(localStorage.getItem(name));
};

const save = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

const importImages = (folder) => {
  const imgObj = {};
  const importAll = (r) => {
    const keys = r.keys();
    const urls = r.keys().map(r);
    return urls.forEach((url, i) => {
      const key = keys[i].replace(/.\/|.jpg|.png/g, '');
      imgObj[key] = url;
    });
  };
  importAll(
    // import all images
    require.context(folder, false, /\.jpg$|\.png$/)
  );
  return imgObj;
};

export {
  hideElement,
  icon,
  createLink,
  load,
  save,
  importImages,
};
