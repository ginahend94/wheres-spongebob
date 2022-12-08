const loading = document.createElement('div');
const h2 = document.createElement('h2');
h2.textContent = 'Loading...';
loading.append(h2);
loading.classList.add('loading');

export default loading;
