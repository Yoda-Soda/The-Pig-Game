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
var btnRoll1, btnRoll2, btnHold1, btnHold2, btnNewGame, btnOverlay;
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
//Start new game by reseting values and caling status check
btnNewGame = document.getElementById("new-game-button");
btnNewGame.addEventListener("click", newGame);
//Start new game by reseting values and caling status check
btnOverlay = document.getElementById("overlay");
btnOverlay.addEventListener("click", newGame);

//togles between players
function changeStatus() {
  if (status == 1) {
    status = 2;
  } else {
    status = 1;
  }
}

// //checks to see if player has rolled a 1
// function checkDice(diceCurrent) {
//   if (diceCurrent == 1) return false;
//   else {
//     return true;
//   }
// }

//adds the dice value to the current score of the player and resets it if 1 is thrown and change to other player
function addDice(diceCurrent) {
  if (diceCurrent != 1) {
    currentScoreCounter = currentScoreCounter + diceCurrent; //compounds current score with dice roll
    document.getElementById(
      "current-scoreboard-" + status
    ).innerHTML = currentScoreCounter; //sets current score in dom
  } else {
    //lose condition (if 1 was thrown)
    currentScoreCounter = 0; //reset current score
    document.getElementById(
      "current-scoreboard-" + status
    ).innerHTML = currentScoreCounter; //reset current score in dom
    changeStatus(); //change to other player
  }
}

//checks if a player has reached a score of
//100 and activates overlay else it's moves and adds the current score to the finalscore value
function hold() {
  //showVar(); //test
  if (status == 1) {
    //checks if it's player 1's turn
    if (finalScore1 + currentScoreCounter >= 100) {
      //checks if player 1 won
      displayWinner(); //calls overlay
    } else {
      //adds current score to finall score for player 1
      finalScore1 = currentScoreCounter + finalScore1;
      document.getElementById("scoreboard-player-1").innerHTML = finalScore1;
      currentScoreCounter = 0; //resets counter
      addDice(1); //switches player activaty to player 2
      checkStatus();
    }
  } else if (status == 2) {
    //checks if it's player 2's turn
    if (finalScore2 + currentScoreCounter >= 100) {
      //checks if player 2 won
      displayWinner();
    } else {
      //adds current score to finall score for player 2
      finalScore2 = currentScoreCounter + finalScore2;
      document.getElementById("scoreboard-player-2").innerHTML = finalScore2;
      currentScoreCounter = 0; //resets counter
      addDice(1); //switches player activaty to player 1
      checkStatus();
    }
  }
  //showVar();
}

//roll random dice roll between 1 and 6 and append it to it's image file name
function rollDice() {
  var rand = Math.random();
  diceCurrent = Math.round(rand * 5) + 1;
  diceImage.attributes.getNamedItem("src").nodeValue =
    "images/dice-" + diceCurrent + ".png";
  addDice(diceCurrent);
  checkStatus();
}

//checks which player is currently active and sets the dom to indicate that players activated.
function checkStatus() {
  if (status == 1) {
    //activates player one in dom
    active1.style.backgroundColor = "#fff";
    active2.style.backgroundColor = "#f5f4f4";
    btnHold1.style.visibility = "visible";
    btnHold2.style.visibility = "hidden";
    btnRoll1.style.visibility = "visible";
    btnRoll2.style.visibility = "hidden";
  } else {
    //activates player 2 in dom
    active2.style.backgroundColor = "#fff";
    active1.style.backgroundColor = "#f5f4f4";
    btnHold1.style.visibility = "hidden";
    btnHold2.style.visibility = "visible";
    btnRoll1.style.visibility = "hidden";
    btnRoll2.style.visibility = "visible";
  }
}

//brings overlay to show winner
function displayWinner() {
  document.getElementById("overlay").style.display = "grid";
  document.getElementById("winner").innerHTML =
    "The winner is player " + status;
}

//used as a debuging tool
// function showVar() {
//   console.log(
//     currentScoreCounter,
//     finalScore1,
//     finalScore2,
//     diceCurrent,
//     status
//   );
// }

//resets all variables, applies those variables to dom and resets player area to player 1
function newGame() {
  currentScoreCounter = 0;
  finalScore1 = 0;
  finalScore2 = 0;
  diceCurrent = 0;
  status = 1;
  currentScore1.innerHTML = currentScoreCounter = currentScoreCounter;
  currentScore2.innerHTML = currentScoreCounter = currentScoreCounter;
  document.getElementById("scoreboard-player-1").innerHTML = finalScore1;
  document.getElementById("scoreboard-player-2").innerHTML = finalScore2;
  diceImage.attributes.getNamedItem("src").nodeValue =
    "images/dice-" + diceCurrent + ".png";
  if (document.getElementById("overlay").style.display == "grid") {
    console.log("it is true");
    document.getElementById("overlay").style.display = "none";
  }
  checkStatus();
}
