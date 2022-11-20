const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['programmer', 'notification', 'workout', 'television', 'bodybuilder', 'coding', 'developer'];

let hiddenWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];

//display of hidden word

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
    finalMessage.innerText = 'Congratulations, you won! :)';
    popup.style.display = 'flex';
  }
}

//update Wrong letters 

function updateWrongLettersElement() {
  //Display wrong letters
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong:</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `
  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none'
    }
  })

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately, you lost! :(';
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

//Start new game on button click

function resetGame() {
  correctLetters = [];
  wrongLetters = [];


  hiddenWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersElement();
  popup.style.display = 'none'
}

//handling key pressing - display letters on screen

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

playAgainBtn.addEventListener('click', resetGame)
window.addEventListener('keydown', letterKeysHandle)

displayWord()