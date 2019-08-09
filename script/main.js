//initialising vairables and connect them to sections of the DOM
var currentScore1,
  currentScore2,
  active1,
  active2,
  dice,
  rollDice1,
  rollDice2,
  currentScoreCounter;
currentScore1 = document.getElementById("current-scoreboard-1");
currentScoreCounter = 0;
currentScore2 = document.getElementById("current-scoreboard-2");
finalScore1 = 0;
finalScore2 = 0;
active1 = document.getElementById("player-area-1");
active2 = document.getElementById("player-area-2");
diceImage = document.getElementById("dice");
btnPlayer1 = document.getElementsByClassName("btn-player-1");
diceCurrent = 6;
status = 1;

// add event handlers
var btnRoll1, btnRoll2, btnHold1, btnHold2;
//Player 1 dice roll button
btnRoll1 = document.getElementById("btn-roll-1");
btnRoll1.addEventListener("click", rollDice);
//Player 2 dice roll button
btnRoll2 = document.getElementById("btn-roll-2");
btnRoll2.addEventListener("click", rollDice);
//Player 1 hold current value and add it to the finalscore
btnHold1 = document.getElementById("btn-hold-1");
btnHold1.addEventListener("click", hold);
//Player 2 hold current value and add it to the finalscore
btnHold2 = document.getElementById("btn-hold-2");
btnHold2.addEventListener("click", hold);

//togles between players
function changeStatus() {
  if (status == 1) {
    status = 2;
  } else {
    status = 1;
  }
}

//checks to see if player has rolled a 1
function checkDice(diceCurrent) {
  if (diceCurrent == 1) return false;
  else {
    return true;
  }
}

//adds the dice value to the current score of the player and resets it if 1 is thrown
function addDice(diceCurrent) {
  if (diceCurrent != 1) {
    currentScoreCounter = currentScoreCounter + diceCurrent;
    document.getElementById(
      "current-scoreboard-" + status
    ).innerHTML = currentScoreCounter;
  } else {
    currentScoreCounter = 0;
    document.getElementById(
      "current-scoreboard-" + status
    ).innerHTML = currentScoreCounter;
    changeStatus();
  }
}

function hold() {
  if (finalScore1 >= 100) {
    alert("Player 1 Wins!!!");
  } else if (finalScore2 >= 100) {
    alert("Player 1 Wins!!!");
  } else {
    if (status == 1) {
      finalScore1 = currentScoreCounter + finalScore1;
      document.getElementById("scoreboard-player-1").innerHTML = finalScore1;
      console.log(finalScore1);
      currentScoreCounter = 0;
      addDice(1);
      checkStatus();
    } else {
      finalScore2 = currentScoreCounter + finalScore2;
      document.getElementById("scoreboard-player-2").innerHTML = finalScore2;
      console.log(finalScore2);
      currentScoreCounter = 0;
      addDice(1);
      checkStatus();
    }
  }
}

//roll random dice roll between 1 and 6 and append it to it's image file name
function rollDice() {
  var rand = Math.random();
  console.log(rand);
  diceCurrent = Math.round(rand * 5) + 1;
  diceImage.attributes.getNamedItem("src").nodeValue =
    "images/dice-" + diceCurrent + ".png";
  addDice(diceCurrent);
  checkStatus();
  console.log(diceCurrent); //test via console log
}

function checkStatus() {
  if (status == 1) {
    active1.style.backgroundColor = "#fff";
    active2.style.backgroundColor = "#f5f4f4";
    btnHold1.style.visibility = "visible";
    btnHold2.style.visibility = "hidden";
    btnRoll1.style.visibility = "visible";
    btnRoll2.style.visibility = "hidden";
  } else {
    active2.style.backgroundColor = "#fff";
    active1.style.backgroundColor = "#f5f4f4";
    btnHold1.style.visibility = "hidden";
    btnHold2.style.visibility = "visible";
    btnRoll1.style.visibility = "hidden";
    btnRoll2.style.visibility = "visible";
  }
}

// //testing values to console log
// console.log(
//   currentScore1,
//   currentScore2,
//   finalScore1,
//   finalScore2,
//   active1,
//   active2,
//   status,
//   diceCurrent
// );
