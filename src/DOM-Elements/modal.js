export default (() => {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');
  const close = document.createElement('button');
  close.textContent = 'Close';
  const title = document.createElement('h2');
  const body = document.createElement('div');

  close.addEventListener('click', () => dialog.close());

  dialog.append(
    close,
    title,
    body
  );

  const setTitle = (text) => (title.textContent = text);
  const setText = (text) => (body.innerHTML = text);
  const open = () => dialog.showModal();

  return {
    dialog,
    setTitle,
    setText,
    open,
  };
})();
