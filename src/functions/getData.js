import loading from '../DOM-Elements/loading';
import showToast from '../DOM-Elements/toast';

// const getData = async () => {
//   const url =
//     'https://raw.githubusercontent.com/ginahend94/wheres-spongebob/main/src/test.json';
//   let json;
//   try {
//     const res = await fetch(url);
//     json = await res.json();
//   } catch (err) {
//     json = { characters: 'Error loading.', scores: 'Error loading' };
//   }
//   return json;
// };

// TEST
async function getData() {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(async () => {
    try {
      const url =
      'https://raw.githubusercontent.com/ginahend94/wheres-spongebob/main/src/test.json';
      const res = await fetch(url);
      if (!res.ok) {
        showToast('red', `Server Error ${res.status}: ${res.statusText}. \n\rPlease refresh or try again later.`);
      } else {
        const json = await res.json();
        resolve(json);
      }
    } catch (e) {
      showToast('red', 'Error');
      resolve(e);
    }
  }, 3000));
}
document.body.append(loading);
const data = await getData();

export default data;
