let run = true;

document.querySelector('button').addEventListener('click', toggleRotation);

function toggleRotation() {
  run = !run;
  const animationState = run ? 'paused' : 'running'
  document.querySelectorAll('.board').forEach(item => {
    let duration = getRandom();
    console.log(duration)
    const style = item.style;
    style.animationPlayState = animationState;
    style.animationDuration = `${duration}s`;
  })
}

function getRandom() {
  return Math.random() + 1;
}
