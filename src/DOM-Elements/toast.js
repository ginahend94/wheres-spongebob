const newToast = (bgColor = 'red', text = 'Error') => {
  const container = document.createElement('div');
  container.classList.add('toast', bgColor);
  container.textContent = text;
  return container;
};

const showToast = (bgColor = 'red', text = 'Error') => {
  const toast = newToast(bgColor, text);
  document.body.append(toast);
  setTimeout(() => toast.classList.add('show'), 5);
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 4500);
};

export default showToast;
export { newToast }; // TEST
