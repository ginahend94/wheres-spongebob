import { onValue, ref, push } from 'firebase/database';
import { db } from '../firebase';

let highScoreList;
const scoreRef = ref(db, 'scores');
const getInitialScores = (async () => new Promise((resolve) => {
  onValue(scoreRef, (snap) => {
    const data = snap.val();
    highScoreList = data;
    resolve(data);
  });
}));
await getInitialScores();
const getHighScoreList = () => highScoreList;
const addScore = (name, score) => push(scoreRef, { name, score });
// addScore('Milo', 30000); // TEST
console.log(getHighScoreList());
const formatScore = (milliseconds) => {
  console.log(milliseconds);
};

export { getHighScoreList, formatScore };
