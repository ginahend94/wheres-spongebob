import data from './getData';

const highScoreList = data.scores;
const getHighScoreList = () => highScoreList;
const updateHighScoreList = (newList) => {

}
const formatScore = (milliseconds) => {
  console.log(milliseconds);
};

export { getHighScoreList, updateHighScoreList, formatScore };
