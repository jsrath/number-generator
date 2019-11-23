let run = true;
const initalFlipNumberSize = 3;
const digitInput = document.querySelector('.digit-input');


function getRandom() {
  return Math.random() + 1;
}

function toggleRotation() {
  run = !run;
  const animationState = run ? 'paused' : 'running';
  document.querySelectorAll('.board').forEach(item => {
    const duration = getRandom();
    const style = item.style;
    style.animationPlayState = animationState;
    style.animationDuration = `${duration}s`;
  });
}


async function setBoardSize(digits) {
  if (digits < 1 || digits > 10) {
    return alert("Choose a number between 1 and 10");
  }
  await checkWrapper();
  const wrapper = document.querySelector('.wrapper');
  const numberOfFlipNumbers = wrapper.querySelectorAll('.board').length;
  const difference = digits - numberOfFlipNumbers;
  const value = Math.sign(difference);

  if (value === 1) {
    addFlipNumbersToBoard(difference);
  } else if (value === 0) {
    return;
  } else {
    removeFlipNumbersFromBoard(difference);
  }
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
  const digits = [...Array(10).keys()];
  let hello = '';

  digits.forEach(digit => {
    hello += `<div class="digit">${digit}</div>`;
  });

  return hello;
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
  digitInput.value = initalFlipNumberSize;
  setBoardSize(initalFlipNumberSize);
}

digitInput.addEventListener('input', () => setBoardSize(Number(event.target.value)));
document.addEventListener('DOMContentLoaded', initalizeBoard);
document.querySelector('.toggle').addEventListener('click', toggleRotation);
