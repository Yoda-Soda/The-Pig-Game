//initialising vairables and connect them to sections of the DOM
var currentScoreCounter = 0;
var diceImage = document.getElementById("dice");
var diceCurrent = 6;

var player1 = getPlayer(1);
var player2 = getPlayer(2);
var currentPlayer = player1;
var otherPlayer = player2;

// Game
var btnNewGame = addClickListener("new-game-button", newGame);
var btnOverlay = addClickListener("overlay", newGame);
var btnInstOverlay = addClickListener("inst", removeInstruction);
var btnInstructions = addClickListener("btn-instruction", instructions);

var targetScore = 10;

function getPlayer(id)
{
  var player = 
  { 
    Id : id,
    RollButton : addClickListener("btn-roll-" + id, rollDice),
    HoldButton : addClickListener("btn-hold-" + id, hold),
    ActiveArea : document.getElementById("player-area-" + id),
    CurrentScoreBoard : document.getElementById("current-scoreboard-" + id),
    TotalScoreBoard : document.getElementById("scoreboard-player-" + id),
    Active : false,    
    CurrentScore : 0,
    TotalScore : 0,
    addCurrentScore: function(score) 
    { 
      this.CurrentScore += score;
      this.CurrentScoreBoard.innerHTML = this.CurrentScore;
    },
    resetCurrentScore: function() 
    { 
      this.CurrentScore = 0;
      this.CurrentScoreBoard.innerHTML = this.CurrentScore;
    },
    hold: function() 
    { 
      this.TotalScore += this.CurrentScore;
      this.TotalScoreBoard.innerHTML = this.TotalScore;
      this.ResetCurrentScore();
      SwitchPlayers();
    },
    isWinner: function() 
    { 
      if (this.TotalScore + this.CurrentScore >= targetScore)
      {
        displayWinner();
      }
    },
    fullReset: function()
    {
      this.TotalScore = 0;
      this.CurrentScore = 0;
      
      this.CurrentScoreBoard.innerHTML = this.CurrentScore;
      this.TotalScoreBoard.innerHTML = this.TotalScore;
      SwitchPlayers();
    },
    enable: function()
    {
      this.ActiveArea.style.backgroundColor = "#fff";
      this.HoldButton.style.visibility = "visible";
      this.RollButton.style.visibility = "visible";
    },
    disable: function()
    {
      this.ActiveArea.style.backgroundColor = "#f5f4f4";
      this.HoldButton.style.visibility = "hidden";
      this.RollButton.style.visibility = "hidden";
    }
  };
  return player;
}


// get an element by name and bind its on click event to the given event
function addClickListener(elementName, event)
{
  var button = document.getElementById(elementName);
  button.addEventListener("click", event);
  return button;
}

//togles between players
function switchPlayers() 
{
  var temp = currentPlayer;
  currentPlayer.Disable();
  otherPlayer.Enable();
  
  currentPlayer = otherPlayer;
  otherPlayer = temp;
}

//adds the dice value to the current score of the player and resets it if 1 is thrown and change to other player
function addDice(diceCurrent) 
{
  if (diceCurrent != 1) 
  {
    currentPlayer.addCurrentScore(diceCurrent);
  } 
  else 
  {
    currentPlayer.ResetCurrentScore();
    SwitchPlayers(); 
  }
}

//checks if a player has reached a score of
//100 and activates overlay else it's moves and adds the current score to the finalscore value
function hold() 
{
  if (!currentPlayer.isWinner())
  {
    currentPlayer.hold();
    
  }
}

//roll random dice roll between 1 and 6 and append it to it's image file name
function rollDice() {
  var rand = Math.random();
  diceCurrent = Math.round(rand * 5) + 1;
  diceImage.attributes.getNamedItem("src").nodeValue =
  "images/dice-" + diceCurrent + ".png";
  addDice(diceCurrent);
}


//brings overlay to show winner
function displayWinner() {
  document.getElementById("overlay").style.display = "grid";
  document.getElementById("winner").innerHTML =
  "The winner is player " + currentPlayer.Id;
}

//resets all variables, applies those variables to dom and resets player area to player 1
function newGame() {
  
  player1.fullReset();
  player2.fullReset();
  
  currentPlayer = player1;
  otherPlayer = player2;
  
  diceImage.attributes.getNamedItem("src").nodeValue =
  "images/dice-" + diceCurrent + ".png";
  
  // todo: is this useful?
  if (document.getElementById("overlay").style.display == "grid") {
    console.log("it is true");
    document.getElementById("overlay").style.display = "none";
  }
}

//brings overlay to show winner
function instructions() {
  btnInstOverlay.style.display = "block";
}

function removeInstruction() {
  btnInstOverlay.style.display = "none";
}
