import { onValue, ref, push } from 'firebase/database';
import { db } from '../firebase';

let highScoreList;
const scoreRef = ref(db, 'scores');
const getInitialScores = async () =>
  new Promise((resolve) => {
    onValue(scoreRef, (snap) => {
      const data = snap.val();
      highScoreList = data;
      resolve(data);
    });
  });
await getInitialScores();
const getHighScoreList = () => highScoreList;
const addScore = (name, score) => push(scoreRef, { name, score });
// addScore('Milo', 30000); // TEST
console.log(getHighScoreList());
const formatScore = (val) => {
  // TEST num: 68823456

  // milliseconds: mod value by 1000 (milliseconds in second)
  const milliseconds = val % 1000;
  // seconds: divide milliseconds by 60 (secs in min)
  // take whole number,
  // mod by 60 is secs
  const seconds = parseInt(val / 60, 10) % 60;
  // minutes: divide milliseconds by 3600 (mins in hour)
  // take whole num
  // mod by 60 is mins
  const minutes = parseInt(val / 3600, 10) % 60; // secs in hour
  // hours: divide milliseconds by 216000
  // take whole num
  // result is hours
  const hours = parseInt(val / 216000, 10);

  const msString = milliseconds.toString().padStart(2, '0');
  const ssString = seconds.toString().padStart(2, '0');
  const mmString = minutes.toString().padStart(2, '0');
  const hhString = hours.toString().padStart(2, '0');

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    msString,
    ssString,
    mmString,
    hhString,
  };
};

export { getHighScoreList, formatScore };
