const newToast = (bgColor = 'red', text = 'Error') => {
  const container = document.createElement('div');
  container.classList.add('toast', bgColor);
  container.textContent = text;
  const exit = document.createElement('span');
  exit.textContent = '\u2715';
  container.append(exit);
  return container;
};

const showToast = (bgColor = 'red', text = 'Error') => {
  const toast = newToast(bgColor, text);
  document.body.append(toast);
  setTimeout(() => toast.classList.add('show'), 5);
  const hide = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
  const remove = setTimeout(() => {
    document.body.removeChild(toast);
  }, 4500);
  toast.querySelector('span').addEventListener('click', () => {
    clearTimeout(hide);
    clearTimeout(remove);
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 500);
  });
};

export default showToast;
