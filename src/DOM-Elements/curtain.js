import { getCharacters, getImages } from '../functions/characters';
import badWords from '../assets/badWords.json';
import { addScore, formatScore, getHighScoreTable } from '../functions/scores';

// TODO - finish styling
const curtain = (() => {
  // create curtain
  const cont = document.createElement('div');
  cont.classList.add('curtain');

  // fill with pregame
  const preGame = (() => {
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const characterContainer = document.createElement('div');
    const start = document.createElement('button');

    h2.textContent = 'Where\'s SpongeBob?';
    h3.textContent = 'FIND:';
    start.textContent = 'Start';
    characterContainer.classList.add('character-container');

    const characters = getCharacters();
    const images = getImages();
    characters.forEach((character) => characterContainer.append(
      images[
        images.findIndex(
          (img) => img.dataset.character.toLowerCase() === character.id
        )
      ]
    ));

    const init = () => {
      cont.innerHTML = '';
      cont.append(h2, h3, characterContainer, start);
    };

    return {
      start,
      init,
    };
  })();

  // fill with postgame
  const postGame = (() => {
    const gameResults = document.createElement('div');
    gameResults.classList.add('game-results');
    const congrats = document.createElement('h2');
    congrats.textContent = 'Congrats, you won!';
    const yourScore = document.createElement('h3');
    const setScore = (score) => (yourScore.textContent = `Your score: ${formatScore(score).formattedTime}`);

    const highFlag = document.createElement('span');
    highFlag.classList.add('high-score-flag');
    highFlag.textContent = 'High score!';
    const showFlag = () => yourScore.append(highFlag);

    const playAgain = document.createElement('button');
    playAgain.textContent = 'Play Again';

    const enterName = (() => {
      let score = 0;

      const form = document.createElement('form');
      form.classList.add('enter-name');

      const small = document.createElement('small');
      small.textContent = 'Invalid input';
      const showSmall = () => (small.style.display = 'block');
      const hideSmall = () => (small.style.display = 'none');

      const label = document.createElement('label');
      label.textContent = 'Enter your initials:';
      const field = document.createElement('input');
      field.maxLength = 3;
      field.minLength = 2;
      field.name = 'initials';
      label.append(field);

      const submit = document.createElement('button');
      submit.textContent = 'Submit';
      const cancel = document.createElement('button');
      cancel.textContent = 'Cancel';
      form.append(small, label, submit, cancel);

      const isValid = () => {
        // grab value from input
        const input = field.value;
        // return false if wrong length
        if (input.trim().length > 3 || input.trim().length < 2) return false;
        // check if input is a bad word
        return !badWords.includes(input);
      };

      const continuousCheck = () => {
        if (!isValid) {
          showSmall();
        } else {
          hideSmall();
        }
      };
      const validateInput = (e) => new Promise((resolve) => {
        // if invalid
        if (!isValid) {
          // show small
          showSmall();
          // add eventlistener to input
          field.addEventListener('input', continuousCheck);
        } else { // if valid
          // send name and score to high score list
          addScore(e.target.value, score);
          // hide small if showing
          hideSmall();
          // remove eventlistener
          field.removeEventListener('input', continuousCheck);
          resolve(e.target.value);
        }
      });

      const display = (playerScore) => {
        score = playerScore;
        // show form
        form.style.display = 'flex';
        // return new promise
        return new Promise((resolve) => {
          // submit button clicked, validate entry
          submit.addEventListener('click', async (e) => {
            // prevent page redirect
            e.preventDefault();
            // validate input
            const name = await validateInput(e);
            // if valid, create obj with name and score and resolve with entry
            if (name) {
              form.style.display = 'none';
              resolve({ name, score });
            }
          });
          // cancel button clicked, resolve empty
          cancel.addEventListener('click', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            resolve();
          });
        });
      };

      return {
        display,
        form,
      };
    })();

    gameResults.append(congrats, yourScore, enterName.form);

    const init = async (score, isHigh) => {
      cont.innerHTML = '';
      setScore(score);
      cont.append(gameResults);
      // if score is high:
      if (isHigh) {
        // show high score flag
        showFlag();
        // open enter name box
        await enterName.display(score);
      }
      // show top scores
      cont.append(getHighScoreTable());
      // show replay button
      cont.append(playAgain);
    };

    return {
      init,
      playAgain
    };
  })();

  const remove = () => {
    document.body.removeChild(cont);
  };

  const display = () => {
    document.body.append(cont);
  };

  return {
    preGame,
    startButton: preGame.start,
    postGame,
    replayButton: postGame.playAgain,
    remove,
    display,
    container: cont,
  };
})();

export default curtain;
