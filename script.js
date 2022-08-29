const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['programmer', 'notification', 'workout', 'television', 'bodybuilder'];

const hiddenWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const incorrectLetters = [];

function displayWord() {
  wordElement.innerHTML = `
    ${hiddenWord
      .split('')
      .map(letter => `
        <span class='letter'>
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `).join('')

    }
  `
}

displayWord()