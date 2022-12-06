const data = (async () => {
  const url = 'https://raw.githubusercontent.com/ginahend94/wheres-spongebob/main/src/test.json';
  const res = await fetch(url);
  const json = await res.json();
  return json;
})();

export {data};
