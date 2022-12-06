const newToast = (bgColor = 'red', text = 'Error') => {
  const container = document.createElement('div');
  container.classList.add('toast', bgColor);
  container.textContent = text;
  return container;
};

const showToast = (bgColor = 'red', text = 'Error') => {
  const toast = newToast(bgColor, text);
  document.body.append(toast);
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3500);
};

export default showToast;
export { newToast };
