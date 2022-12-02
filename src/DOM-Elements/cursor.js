const bubble = (() => {
  const container = document.createElement('div');
  container.classList.add('bubble');
  const shine1 = document.createElement('div');
  const shine2 = document.createElement('div');
  shine1.classList.add('shine', 'shine-1');
  shine2.classList.add('shine', 'shine-2');
  container.append(shine1, shine2);
  return container;
})();

const bubbleFollow = (e) => {
  // take in x and y of cursor
  // divide bubble in half, left is width - x
  // top is height - x

}

export default bubble;
