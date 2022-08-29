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
const wrongLetters = [];

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

  const innerWord = wordElement.innerText.replace(/\n/g, '')

  if (hiddenWord === innerWord) {
    finalMessage.innerText = 'Congratulations, you won!';
    popup.style.display = 'flex';
  }
}

function letterKeysHandle(e) {
  if (e.keyCode >= 65 && e.keyCode <= 95) {
    const letter = e.key;

    if (hiddenWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)

        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)

        updateWrongLettersElement()
      } else {
        showNotification()
      }
    }


  }
}


window.addEventListener('keydown', letterKeysHandle)

displayWord()