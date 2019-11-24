const config = {
  initialFlipNumbers: 3,
  minimumFlipNumbers: 1,
  maximumFlipNumbers: 10,
};

let run = false;
const digitInput = document.querySelector('.digit-input');

function toggleRotation() {
  run = !run;
  const board = document.querySelectorAll('.board');
  board.forEach(flipNumber => {
    const rotateNumbers = setInterval(() => {
      if (!run) {
        clearInterval(rotateNumbers);
      }
      return (flipNumber.innerHTML = Math.floor(Math.random() * 10));
    }, 100);
  });
}

function addOrRemoveNumbers(difference) {
  const sign = Math.sign(difference);
  switch (sign) {
    case 1:
      addFlipNumbersToBoard(difference);
      break;

    case -1:
      removeFlipNumbersFromBoard(difference);
      break;

    default:
      return;
  }
}

function setBoardSize(inputNumber) {
  const isInputValid = validateInput(inputNumber);

  if (!isInputValid) {
    return alert(`Please enter a number between ${config.minimumFlipNumbers} and ${config.maximumFlipNumbers}!`);
  }
  checkWrapper();
  const wrapper = document.querySelector('.wrapper');
  const difference = inputNumber - wrapper.querySelectorAll('.board').length;
  addOrRemoveNumbers(difference)
}

function validateInput(input) {
  if (input < config.minimumFlipNumbers || input > config.maximumFlipNumbers || isNaN(input)) {
    return false;
  }
  return true;
}

function checkWrapper() {
  const wrapper = document.querySelector('.wrapper');

  if (!wrapper) {
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('wrapper');
    document.querySelector('.container').appendChild(newWrapper);
  }
}

function generateOneFlipNumber() {
  return `<div class="digit">0</div>`;
}

function addFlipNumbersToBoard(digits) {
  const wrapper = document.querySelector('.wrapper');
  [...Array(digits)].forEach(() => {
    const div = document.createElement('div');
    div.classList.add('board');
    div.innerHTML = generateOneFlipNumber();
    wrapper.appendChild(div);
  });
}

function removeFlipNumbersFromBoard(digits) {
  [...Array(-digits)].forEach(() => {
    const elementToRemove = document.querySelector('.board');
    elementToRemove.parentNode.removeChild(elementToRemove);
  });
}

function initalizeBoard() {
  digitInput.value = config.initialFlipNumbers;
  setBoardSize(config.initialFlipNumbers);
}

function copyNumber() {
  const textToCopy = [...document.querySelectorAll('.board')].map(digit => digit.innerText).join('');
  navigator.clipboard.writeText(textToCopy);
}

digitInput.addEventListener('input', () => setBoardSize(Number(event.target.value)));
document.addEventListener('DOMContentLoaded', initalizeBoard);
document.querySelector('.toggle').addEventListener('change', toggleRotation);
document.querySelector('.copy-button').addEventListener('click', copyNumber);
