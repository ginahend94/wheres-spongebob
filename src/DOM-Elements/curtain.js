import { getCharacters, getImages } from '../functions/characters';
import badWords from '../assets/badWords.json';

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

    start.textContent = 'Start';
    const init = () => {
      cont.innerHTML = '';
      cont.append(h2, h3, characterContainer, start);
    };
    return {
      cont,
      start,
      init,
    };
  })();
  // press start
  // game ends
  // fill with postgame
  const postGame = (() => {
    const gameResults = document.createElement('div');
    gameResults.classList.add('game-results');
    const congrats = document.createElement('h2');
    congrats.textContent = 'Congrats, you won!';
    const yourScore = document.createElement('h3');
    const setScore = (score) => (
      yourScore.textContent = `Your score: ${score}`
    );

    const highFlag = document.createElement('span');
    highFlag.classList.add('high-score-flag');
    highFlag.textContent = 'High score!';
    const showFlag = () => yourScore.append(highFlag);

    const enterName = (() => {
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
      form.append(small, label, submit);

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
      const validateInput = () => {
        // if invalid
        if (!isValid) {
          // show small
          showSmall();
          // add eventlistener to input
          field.addEventListener('input', continuousCheck);
        } else {
          // if valid
          // send name and score to high score list
          // hide small
          hideSmall();
          // remove eventlistener
          field.removeEventListener('input', continuousCheck);
        }
      };

      submit.addEventListener('click', (e) => {
        // prevent page redirect
        e.preventDefault();
        // validate input
      });

      // return new promise
      // submit button clicked, validate entry
      // if valid, resolve with entry
      // cancel button clicked, resolve empty
      // if there is a name, create obj with name and score
    })();

    gameResults.append(
      congrats,
      yourScore,
    );

    const init = (score, isHigh) => {
      cont.innerHTML = '';
      setScore(score);
      cont.append(gameResults);
      // if score is high:
      if (isHigh) {
        // show high score flag
        showFlag();
        // open enter name popup
      }
      // show top scores
    };
  })();

  const enterName = (() => {
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
    form.append(small, label, submit);

    const isValid = () => {
      const input = field.value;
      if (input.trim().length > 3 || input.trim().length < 2) return false;
      return !badWords.includes(input);
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isValid()) {
        showSmall();
      } else {
        hideSmall();
        // Save high score
      }
    });
    return form;
  })();
  const gameWin = async (score, isHigh) => {
    const gameResults = document.createElement('div');
    gameResults.classList.add('game-results');
    const congrats = document.createElement('h2');
    congrats.textContent = 'Congrats, you won!';
    const yourScore = document.createElement('h3');
    yourScore.textContent = `Your score: ${score}`;
    const highFlag = document.createElement('span');
    highFlag.classList.add('high-score-flag');
    highFlag.textContent = 'High score!';
    gameResults.append(
      congrats,
      yourScore,
      isHigh ? highFlag : '',
      isHigh ? enterName : ''
    );
    cont.append(gameResults);
  };
  gameWin(300, true);
  return {
    cont,
    // start,
  };
})();

export default curtain.cont;
