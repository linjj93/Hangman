let word_array = ['PYTHON', 'JAVASCRIPT', 'HTML', 'CASCADING', 'RUBY', 'TABLEAU']
let tr = document.getElementsByTagName('tr')[0];
let msg = document.getElementById('message');
let wordslots = document.getElementsByTagName('td');
let counter = document.getElementById('lives-counter');
let randomWord;
const buttons = document.getElementsByClassName('guesses')[0].getElementsByTagName('button');
const reset = document.getElementById('reset');


function startGame() {
  let random_number = Math.floor((Math.random() * 6));
  randomWord = word_array[random_number];
  generateWord();
  setMessage();
}

function setMessage() {
  msg.textContent = "Guess a letter."
}

function generateWord() {
  for (let i = 0; i < randomWord.length; i++) {
    const letter_slot = document.createElement('td');
    tr.appendChild(letter_slot);
  }
}

function checkWin() {
  for (let i = 0; i < wordslots.length; i++) {
    if (wordslots[i].textContent == "") {
      return false;
    }
  }
  return true;
}

function noMoreGuesses() {
  if (!checkWin() && counter.textContent == "0") {
    return true;
  } else {
    return false;
  }
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    if (checkWin() || noMoreGuesses()) {
      buttons[i].style.visibility = 'visible';
      msg.textContent = "Game is over. You may reset the game.";
      return;
    }
    let count = parseInt(counter.textContent);
    if (count < 1) {
      msg.textContent = "You have run out of guesses.";
      return;
    } else {
      new_count = count - 1;
      counter.textContent = String(new_count);
    };
    letter = buttons[i].textContent;
    for (let j = 0; j < randomWord.length; j++) {
      if (letter == randomWord[j]) {
        wordslots[j].textContent = letter;
        if (checkWin()) {
          msg.textContent = "You won!"
        }
      }
    }
  })
}


reset.addEventListener('click', () => {
  tr.innerHTML = ""
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.visibility = "visible";
  }
  counter.textContent = "10";
  startGame();
}
)
