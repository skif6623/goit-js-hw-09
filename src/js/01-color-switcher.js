let timerId = null;
const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.startButton.addEventListener('click', changeBgColor);
refs.stopButton.addEventListener('click', stopChangeColor);

function changeBgColor() {
  refs.startButton.setAttribute('disabled', true);
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  refs.startButton.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
