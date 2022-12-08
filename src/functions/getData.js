import loading from '../DOM-Elements/loading';

// let isLoaded = false;

// const getData = async () => {
//   const url =
//     'https://raw.githubusercontent.com/ginahend94/wheres-spongebob/main/src/test.json';
//   let json;
//   try {
//     const res = await fetch(url);
//     json = await res.json();
// //     isLoaded = !!json;
//   } catch (err) {
//     json = { characters: 'Error loading.', scores: 'Error loading' };
//   }
//   return json;
// };
async function getData() {
  // TEST
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(async () => {
    const url =
      'https://raw.githubusercontent.com/ginahend94/wheres-spongebob/main/src/test.json';
    const res = await fetch(url);
    const json = await res.json();
    // isLoaded = !!json;
    resolve(json);
  }, 3000));
}
document.body.append(loading);
const data = await getData();

// const loaded = () =>
//   new Promise((resolve) => {
//     const check = setInterval(() => {
//       console.log(isLoaded);
//       if (isLoaded) {
//         resolve();
//         clearInterval(check);
//       }
//     }, 10);
//   });

export default data;
// export { loaded };
