const msgEl = document.getElementById('msg');
const guessForm = document.getElementById('guess-form');
const manualInput = document.getElementById('manual-input');
const startBtn = document.getElementById('start-recording');

//generate random number\\
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
const randomNum = getRandomNumber();
console.log('Number:', randomNum);

//speech recognition setup\\
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start listening when button is clicked\\
startBtn.addEventListener('click', () => {
  recognition.start();
});

//handle speech recognition result\\
function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

recognition.addEventListener('result', onSpeak);

//display user input\\
function writeMessage(msg) {
  msgEl.innerHTML = '';
  const div = document.createElement('div');
  div.textContent = 'You said: ';
  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.append(div, span);
}

//manual input form\\
guessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = manualInput.value.trim();
  if (!value) return;
  writeMessage(value);
  checkNumber(value);
  manualInput.value = '';
});

// check number logic (your original)\\
function checkNumber(msg) {
  let num = Number(msg);

  if (msg === 'one' || msg === 'won') num = 1;
  else if (msg === 'two') num = 2;
  else if (msg === 'three') num = 3;
  else if (msg === 'four') num = 4;
  else if (msg === 'five') num = 5;
  else if (msg === 'six') num = 6;
  else if (msg === 'seven') num = 7;
  else if (msg === 'eight') num = 8;
  else if (msg === 'nine') num = 9;

  if (Number.isNaN(num)) {
    msgEl.innerHTML = '<div>that is not a valid number</div>';
    return;
  }

  if (num < 1 || num > 100) {
    msgEl.innerHTML = '<div>number must be between 1 and 100</div>';
    return;
  }

  if (num === randomNum) {
    const h2 = document.createElement('h2');
    h2.textContent = `congrats! you guessed it! the number was ${num}`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.id = 'play-again';
    button.textContent = 'play again';
    button.addEventListener('click', () => window.location.reload());

    msgEl.append(h2, button);
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>ur getting cold</div>';
  } else {
    msgEl.innerHTML += '<div>ur getting warm</div>';
  }
}