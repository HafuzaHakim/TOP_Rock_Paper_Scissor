let playerScore = 0;
let computerScore = 0;
const playerChoices = document.querySelectorAll(".choice");
const playerRunningScore = document.querySelector(".player-score");
const computerRunningScore = document.querySelector(".computer-score");
const roundResult = document.querySelector(".main-text");
const gameOutcome = document.querySelector(".sub-text");
let playerIconParent = document.querySelector("#player-icon-container");
let computerIconParent = document.querySelector("#computer-icon-container");
let playerIcon = document.querySelector("#player-icon");
let computerIcon = document.querySelector("#computer-icon");
const modalBtn = document.querySelector(".modal");
const replayBtn = document.querySelector(".replay");

function getComputerChoice() {
  const choice = ["Fire", "Water", "Grass"];
  return choice[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === "Fire") {
    return computerSelection === "Water"
      ? lose(playerSelection, computerSelection)
      : computerSelection === "Grass"
      ? win(playerSelection, computerSelection)
      : draw(playerSelection, computerSelection);
  } else if (playerSelection === "Water") {
    return computerSelection === "Grass"
      ? lose(playerSelection, computerSelection)
      : computerSelection === "Fire"
      ? win(playerSelection, computerSelection)
      : draw(playerSelection, computerSelection);
  } else if (playerSelection === "Grass") {
    return computerSelection === "Fire"
      ? lose(playerSelection, computerSelection)
      : computerSelection === "Water"
      ? win(playerSelection, computerSelection)
      : draw(playerSelection, computerSelection);
  }
}

function win(playerSelection, computerSelection) {
  playerScore++;
  updateScores();
  roundResult.textContent = `You Win!`;
  gameOutcome.textContent = `${playerSelection} triumph against ${computerSelection}`;
}

function lose(playerSelection, computerSelection) {
  computerScore++;
  updateScores();
  roundResult.textContent = `You Lose!`;
  gameOutcome.textContent = `${computerSelection} triumph against ${playerSelection}`;
}

function draw(playerSelection, computerSelection) {
  roundResult.textContent = `It's A Draw!`;
  gameOutcome.textContent = `${playerSelection} is evenly matched against ${computerSelection}`;
}

function updateScores() {
  playerRunningScore.textContent = playerScore;
  computerRunningScore.textContent = computerScore;
}

function resetScore() {
  if (playerScore === 5 || computerScore === 5) {
    playerScore = 0;
    computerScore = 0;
    playerRunningScore.textContent = playerScore;
    computerRunningScore.textContent = computerScore;
  } else {
    return;
  }
}

function updateIcon(playerSelection, computerSelection) {
  const PLAYER_IMG = document.createElement("img");
  const COMPUTER_IMG = document.createElement("img");

  PLAYER_IMG.setAttribute("id", "player-icon");
  PLAYER_IMG.setAttribute("src", `img/${playerSelection}.png`);
  COMPUTER_IMG.setAttribute("id", "computer-icon");
  COMPUTER_IMG.setAttribute("src", `img/${computerSelection}.png`);

  playerIconParent.replaceChild(PLAYER_IMG, playerIcon);
  computerIconParent.replaceChild(COMPUTER_IMG, computerIcon);

  playerIcon = document.querySelector("#player-icon");
  computerIcon = document.querySelector("#computer-icon");
}

playerChoices.forEach((button) => {
  button.addEventListener("click", () => {
    playerSelection = button.id;
    computerSelection = getComputerChoice();
    updateIcon(playerSelection, computerSelection);
    playRound(playerSelection, computerSelection);

    if (playerScore === 5 || computerScore === 5) {
      modalBtn.classList.remove("hidden");
    }
  });
});

replayBtn.addEventListener("click", () => {
  modalBtn.classList.add("hidden");
  resetScore();

  const PLAYER_IMG = document.createElement("img");
  const COMPUTER_IMG = document.createElement("img");

  PLAYER_IMG.setAttribute("id", "player-icon");
  PLAYER_IMG.setAttribute("src", `img/initial-image.png`);
  COMPUTER_IMG.setAttribute("id", "computer-icon");
  COMPUTER_IMG.setAttribute("src", `img/initial-image.png`);

  playerIconParent.replaceChild(PLAYER_IMG, playerIcon);
  computerIconParent.replaceChild(COMPUTER_IMG, computerIcon);

  playerIcon = document.querySelector("#player-icon");
  computerIcon = document.querySelector("#computer-icon");
});
