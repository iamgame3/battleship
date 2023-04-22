import aiGame from "./ai-game";
import twoPlayerGame from "./two-player-game";

const aiSelectButton = document.querySelector(".player-two-select-ai-button");
let aiPlayer = false;

aiSelectButton.addEventListener("click", () => {
  if (!aiPlayer) {
    aiPlayer = true;
    aiSelectButton.classList.remove("player-two-select-ai-button-inactive");
    aiSelectButton.classList.add("player-two-select-ai-button-active");
  } else {
    aiPlayer = false;
    aiSelectButton.classList.remove("player-two-select-ai-button-active");
    aiSelectButton.classList.add("player-two-select-ai-button-inactive");
  }
});

const gameStartButton = document.querySelector(".game-start-button");

gameStartButton.addEventListener("click", () => {
  if (aiPlayer) aiGame();
  else twoPlayerGame();
});
