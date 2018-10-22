let word_array = ['BEIJING', 'TOKYO', 'SEOUL', 'BANGKOK', 'HANOI', 'VIENTIANE', 'MANILA', 'JAKARTA', 'COLOMBO',
                  'ANKARA', 'MOSCOW', 'LONDON', 'PARIS', 'BERLIN', 'ROME', 'MADRID']
let tr = document.getElementsByTagName('tr')[0];
let msg = document.getElementById('message');
let wordslots = document.getElementsByTagName('td');
let counter = document.getElementById('lives-counter');
let randomWord;
const buttons = document.getElementsByClassName('letter-button');
const reset = document.getElementById('reset');
const textInputButton = document.getElementById('answer-checker');
let count = parseInt(counter.textContent);
let remainingSlots;
let revealButton = document.getElementById('reveal');

//initialise game
function startGame() {
  let random_number = Math.floor((Math.random() * word_array.length));
  randomWord = word_array[random_number];
  counter.textContent = String(randomWord.length + Math.floor(0.75*randomWord.length));
  remainingSlots = randomWord.length;
  generateWord();
  setMessage();
}

// generate the empty slots
function generateWord() {
  for (let i = 0; i < randomWord.length; i++) {
    const letter_slot = document.createElement('td');
    tr.appendChild(letter_slot);
  }
}

// set message
function setMessage() {
  msg.textContent = "Good luck!"
}

//helper functions to check winning/losing condition
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

//check game state


startGame();


//game logic for guessing letters
//while (parseInt(counter.textContent) >= remainingSlots) {           //slots <= guesses
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    if (checkWin() || noMoreGuesses()) {          //check if game can continue
      buttons[i].style.visibility = 'visible';
      msg.textContent = "Game is over. Reset the game.";
      return;
    }
    let count = parseInt(counter.textContent);    //if game can continue, minus 1 try
    new_count = count - 1;
    counter.textContent = String(new_count);
    letter = buttons[i].textContent;
    let correctGuess = 0;
    for (let j = 0; j < randomWord.length; j++) {   //possible bug in this loop?

      if (letter == randomWord[j]) {
        wordslots[j].textContent = letter;
        remainingSlots -= 1;
        correctGuess += 1;
      }

      if (checkWin()) {
        msg.textContent = "You won!";
        return;
      }

    }
    if (parseInt(counter.textContent) == 0) {
      msg.textContent = "You have run out of guesses.";
    } else if (correctGuess > 0) {
      msg.textContent = "Correct!";
    } else if (correctGuess == 0 && parseInt(counter.textContent) > 0) {
      msg.textContent = "Wrong :( Try again!";
    }

  })
}
//}



//game logic for guessing the word directly
textInputButton.addEventListener('click', () => {
 if (checkWin() || noMoreGuesses()) {          //check if game can continue
   buttons[i].style.visibility = 'visible';
 }
 if (checkWin() || noMoreGuesses()) {
   for (let i = 0; i < buttons.length; i++) {
     buttons[i].style.visibility = 'visible';
   }          //check if game can continue
   msg.textContent = "Game is over. Reset the game.";
   return;
 }
  if (parseInt(counter.textContent) < 2) {
    msg.textContent = "You do not have enough lives to guess directly";
    return;
  }
  let guess = textInputButton.previousElementSibling.value;
  if (guess == "") {
    msg.textContent = "You did not key in anything!";
    return;
  }
  if (guess.toUpperCase() == randomWord) {
    msg.textContent = "You won!";
    for (let i = 0; i < randomWord.length; i++) {
      wordslots[i].textContent = randomWord[i];
    }
  } else {
    let count = parseInt(counter.textContent);    //if game can continue, minus 1 try
    new_count = count - 2;
   counter.textContent = String(new_count);
   msg.textContent = "Good try, but nope. Try again!";
 }
 textInputButton.previousElementSibling.value = "";
})
// reveal Answer

revealButton.addEventListener('click', () => {
  if (noMoreGuesses()) {
    for (let i = 0; i < randomWord.length; i++) {
      wordslots[i].textContent = randomWord[i];
    }
  }

})

// reset game

reset.addEventListener('click', () => {
  tr.innerHTML = "";
  wordPlayed = document.createElement('li');
  wordPlayed.textContent = randomWord;
  scoreValue = document.querySelector('.score p');
  if (msg.textContent == "You won!") {
    wordPlayed.style.color = '#E4E6C3';
    wordPlayed.style.fontSize = "1.25rem";
    newScore = parseInt(scoreValue.textContent);
    newScore += 1;
    scoreValue.textContent = newScore;
  } else {
    wordPlayed.style.color = '#F05D23';
    wordPlayed.style.fontSize = "1.25rem";
    wordPlayed.style.textDecoration = 'line-through';
  }
  wordsList = document.querySelector('.words-list ul');
  wordsList.appendChild(wordPlayed);
  word_array.splice(word_array.indexOf(randomWord), 1);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.visibility = "visible";
  }
  startGame();
}
)













// add points system
// list of words already guessed. Then remove the words from the word_array...
// or list of words already played. Green if guessed correctly. Red and strikethru if failed
// game over if empty slots more than guesses
// add timer
// "You are a Asian/European/South American master of capitals!"
// add a timeout feature for message (e.g 3s after "Correct", return to normal)
