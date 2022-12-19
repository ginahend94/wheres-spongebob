import { onValue, ref, push } from 'firebase/database';
import { db } from '../firebase';

let highScoreList;
const scoreRef = ref(db, 'scores');
const getInitialScores = async () => new Promise((resolve) => {
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
console.log(getHighScoreList()); // TEST

const formatScore = (milliseconds) => {
  const decimalPlaces = (num, places) => {
    const wholeNum = parseInt(num, 10);
    const decimal = num - wholeNum;
    const newDecimal = parseInt(decimal * (10 ** places), 10);
    return parseFloat(`${wholeNum}.${newDecimal}`);
  };

  const MS_IN_CS = 10;
  const CS_IN_SEC = 100;
  const SECS_IN_MIN = 60;
  const MINS_IN_HOUR = 60;

  // CONVERT MS TO CS
  // divide ms by 10 to convert ms to cs
  const floatCS = milliseconds / MS_IN_CS;
  // take whole number
  const wholeCS = parseInt(floatCS, 10);
  // FIND CS
  // divide whole number by 100 to convert cs to s
  const floatSecs = wholeCS / CS_IN_SEC;
  // subtract whole number
  const wholeSecs = parseInt(floatSecs, 10);
  // convert decimal back to cs
  const cs = Math.round((floatSecs - wholeSecs) * CS_IN_SEC);
  // FIND SECS
  // divide whole number by 60 to convert s to m
  const floatMins = wholeSecs / SECS_IN_MIN;
  // subtract whole number
  const wholeMins = parseInt(floatMins, 10);
  // multiply decimal by 60 to convert back to s
  const ss = Math.round((floatMins - wholeMins) * SECS_IN_MIN);
  // FIND MINS
  // divide whole number by 60 to convert s to m
  const floatHrs = wholeMins / MINS_IN_HOUR;
  // subtract whole number
  const wholeHrs = parseInt(floatHrs, 10);
  // multiply decimal by 60 to convert back to m
  const mm = Math.round((floatHrs - wholeHrs) * MINS_IN_HOUR);
  // FIND HRS
  // whole number is hours
  const hrs = wholeHrs;

  return {
    milliseconds,
    cs,
    ss,
    mm,
    hrs,
    csString: cs.toString().padStart(2, '0'),
    ssString: ss.toString().padStart(2, '0'),
    mmString: mm.toString().padStart(2, '0'),
    hrsString: hrs.toString().padStart(2, '0'),
    formattedSecs: decimalPlaces(floatSecs, 2),
  };
};

export { getHighScoreList, formatScore };
