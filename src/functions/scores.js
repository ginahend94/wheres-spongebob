import { onValue, ref, set } from 'firebase/database';
import { db } from '../firebase';

let highScoreList;
const scoreRef = ref(db, 'scores');
const newScore = (endpoint) => ref(db, `scores/${endpoint}`);
const getInitialScores = async () => new Promise((resolve) => {
  onValue(scoreRef, (snap) => {
    const data = snap.val();
    highScoreList = data;
    resolve(data);
  });
});
await getInitialScores();
const getHighScoreList = () => highScoreList;
// create array from list
const highScoreArray = [];
const updateHighScoreArray = () => {
  highScoreArray.length = 0;
  Object.keys(highScoreList).forEach((key) => {
    highScoreArray.push({
      name: highScoreList[key].name,
      score: highScoreList[key].score,
    });
  });
  return highScoreArray;
};
updateHighScoreArray();
const isHigh = (score) => {
  if (highScoreArray.length < 10) return true;
  return highScoreArray.some((current) => score < current.score);
};

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

  const formattedTime = `${hrs.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;

  return {
    milliseconds,
    cs,
    ss,
    mm,
    hrs,
    formattedTime,
    csString: cs.toString().padStart(2, '0'),
    ssString: ss.toString().padStart(2, '0'),
    mmString: mm.toString().padStart(2, '0'),
    hrsString: hrs.toString().padStart(2, '0'),
    formattedSecs: decimalPlaces(floatSecs, 2),
  };
};

const getHighScoreTable = (() => {
  const table = document.createElement('table');
  table.classList.add('high-score-table');
  const header = document.createElement('thead');
  const body = document.createElement('tbody');
  header.innerHTML = `
    <td></td>
    <td>Name</td>
    <td>Score</td>
  `;
  table.append(header, body);

  const fillTable = () => {
    updateHighScoreArray();
    body.innerHTML = '';
    // sort players in ascending order of score
    highScoreArray.sort((a, b) => a.score - b.score);
    // only show top ten
    for (let i = 0; i < 10; i++) {
      if (i >= highScoreArray.length) return;
      // create rows for each entry
      body.innerHTML += `
        <tr>
          <td>${i + 1}.</td>
          <td>${highScoreArray[i].name}</td>
          <td>${formatScore(highScoreArray[i].score).formattedTime}</td>
        </tr>
      `;
    }
  };

  const getTable = () => {
    fillTable();
    return table;
  };

  return getTable;
})();
const addScore = (name, score) => set(newScore(highScoreArray.length), { name, score });

export {
  getHighScoreList,
  formatScore,
  addScore,
  getHighScoreTable,
  isHigh,
};
