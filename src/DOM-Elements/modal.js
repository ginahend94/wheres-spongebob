export default (() => {
  const container = document.createElement('dialog');
  const close = document.createElement('button');
  const title = document.createElement('h2');
  const body = document.createElement('div');

  close.addEventListener('click', () => container.close());

  container.append(
    close,
    title,
    body
  );

  const setTitle = (text) => (title.textContent = text);
  const setText = (text) => (body.innerHTML = text);
  const open = () => container.showModal();

  return {
    container,
    setTitle,
    setText,
    open,
  };
})();
