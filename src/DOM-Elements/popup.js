const popup = (() => {
  const list = [
    {
      name: 'Old Man Walker',
      position: [0, 0],
    },
    {
      name: 'Mama Krabs',
      position: [10, 10],
    },
    {
      name: 'Bubble Bass',
      position: [20, 20],
    },
  ];
  const container = document.createElement('ul');
  container.classList.add('popup');
  list.forEach((character) => {
    const item = document.createElement('li');
    item.textContent = character.name;
    item.dataset.position = character.position;
    container.append(item);
  });
  return container;
})();

export {
  popup,
};
