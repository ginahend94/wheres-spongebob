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
  // if x or y is outside main, return closest, stop updating
  
  // take in x and y of cursor
  const cursorX = e.pageX;
  const cursorY = e.pageY;
  // divide bubble in half
  const bubbleCenter = 50;
  // left is x - width
  const left = cursorX - bubbleCenter;
  // top is y - height - header height
  const header = parseInt(getComputedStyle(document.querySelector('header')).height, 10);
  const top = cursorY - bubbleCenter - header;
  bubble.style.top = `${top}px`;
  bubble.style.left = `${left}px`;
};

export {
  bubble,
  bubbleFollow,
};
