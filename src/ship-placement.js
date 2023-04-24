import aiGame from "./ai-game";
import twoPlayerGame from "./two-player-game";
import { createPlayer } from "./players";
import randomShips from "./random-ship-gen";

const shipPlacement = (ai) => {
  const pageContainer = document.querySelector(".page-container");
  let playerOneName = document.getElementById("player-one").value;
  if (playerOneName === "") playerOneName = "PLAYER 1";
  let playerTwoName = document.getElementById("player-two").value;
  if (playerTwoName === "") playerTwoName = "PLAYER 2";
  pageContainer.replaceChildren();
  const shipPlacementContainer = document.createElement("div");
  shipPlacementContainer.classList.add("ship-placement-container");
  const shipPlacementHeader = document.createElement("h1");
  shipPlacementHeader.classList.add("ship-placement-header");
  if (ai)
    shipPlacementHeader.textContent = `${playerOneName}, PLACE YOUR SHIPS`;
  else shipPlacementHeader.textContent = `${playerTwoName}, PLACE YOUR SHIPS`;
  shipPlacementContainer.appendChild(shipPlacementHeader);
  let player = createPlayer();
  randomShips(player.gameboard);
  let shipPlacementGrid = document.createElement("div");
  shipPlacementGrid.classList.add("ship-placement-grid");
  for (let i = 0; i < 100; i += 1) {
    const square = document.createElement("div");
    if (player.gameboard.gameboard[i]) {
      let shipSquare = player.gameboard.gameboard[i];
      shipSquare = shipSquare.split(" ");
      square.classList.add(shipSquare[1]);
    } else square.classList.add("normal-square");
    square.setAttribute("data-id", i);
    square.style.fontSize = "40px";
    shipPlacementGrid.appendChild(square);
  }
  shipPlacementContainer.appendChild(shipPlacementGrid);
  const shipPlacementButtonsContainer = document.createElement("div");
  shipPlacementButtonsContainer.classList.add(
    "ship-placement-buttons-container"
  );
  const shipPlacementRandomButton = document.createElement("button");
  shipPlacementRandomButton.classList.add("ship-placement-button");
  shipPlacementRandomButton.textContent = "RANDOMISE";
  shipPlacementRandomButton.addEventListener("click", () => {
    player = createPlayer();
    randomShips(player.gameboard);
    const shipPlacementGridReplacement = document.createElement("div");
    shipPlacementGridReplacement.classList.add("ship-placement-grid");
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      if (player.gameboard.gameboard[i]) {
        let shipSquare = player.gameboard.gameboard[i];
        shipSquare = shipSquare.split(" ");
        square.classList.add(shipSquare[1]);
      } else square.classList.add("normal-square");
      square.setAttribute("data-id", i);
      square.style.fontSize = "40px";
      shipPlacementGridReplacement.appendChild(square);
    }
    shipPlacementContainer.replaceChild(
      shipPlacementGridReplacement,
      shipPlacementGrid
    );
    shipPlacementGrid = shipPlacementGridReplacement;
  });
  shipPlacementButtonsContainer.appendChild(shipPlacementRandomButton);
  const shipPlacementDoneButton = document.createElement("button");
  shipPlacementDoneButton.classList.add("ship-placement-button");
  shipPlacementDoneButton.textContent = "DONE";
  shipPlacementDoneButton.addEventListener("click", () => {
    if (ai) aiGame(playerOneName, player);
    else {
      const shipPlacementHeaderReplacement = document.createElement("h1");
      shipPlacementHeaderReplacement.classList.add("ship-placement-header");
      shipPlacementHeaderReplacement.textContent = `${playerOneName}, PLACE YOUR SHIPS`;
      shipPlacementContainer.replaceChild(
        shipPlacementHeaderReplacement,
        shipPlacementHeader
      );
      let playerOne = createPlayer();
      randomShips(playerOne.gameboard);
      let shipPlacementGridReplacementOne = document.createElement("div");
      shipPlacementGridReplacementOne.classList.add("ship-placement-grid");
      for (let i = 0; i < 100; i += 1) {
        const square = document.createElement("div");
        if (playerOne.gameboard.gameboard[i]) {
          let shipSquare = playerOne.gameboard.gameboard[i];
          shipSquare = shipSquare.split(" ");
          square.classList.add(shipSquare[1]);
        } else square.classList.add("normal-square");
        square.setAttribute("data-id", i);
        square.style.fontSize = "40px";
        shipPlacementGridReplacementOne.appendChild(square);
      }
      shipPlacementContainer.replaceChild(
        shipPlacementGridReplacementOne,
        shipPlacementGrid
      );
      const shipPlacementRandomButtonClone =
        shipPlacementRandomButton.cloneNode(true);
      shipPlacementRandomButtonClone.addEventListener("click", () => {
        playerOne = createPlayer();
        randomShips(playerOne.gameboard);
        const shipPlacementGridReplacementTwo = document.createElement("div");
        shipPlacementGridReplacementTwo.classList.add("ship-placement-grid");
        for (let i = 0; i < 100; i += 1) {
          const square = document.createElement("div");
          if (playerOne.gameboard.gameboard[i]) {
            let shipSquare = playerOne.gameboard.gameboard[i];
            shipSquare = shipSquare.split(" ");
            square.classList.add(shipSquare[1]);
          } else square.classList.add("normal-square");
          square.setAttribute("data-id", i);
          square.style.fontSize = "40px";
          shipPlacementGridReplacementTwo.appendChild(square);
        }
        shipPlacementContainer.replaceChild(
          shipPlacementGridReplacementTwo,
          shipPlacementGridReplacementOne
        );
        shipPlacementGridReplacementOne = shipPlacementGridReplacementTwo;
      });
      shipPlacementButtonsContainer.replaceChild(
        shipPlacementRandomButtonClone,
        shipPlacementRandomButton
      );
      const shipPlacementDoneButtonClone =
        shipPlacementDoneButton.cloneNode(true);
      shipPlacementDoneButtonClone.addEventListener("click", () => {
        twoPlayerGame(playerOneName, playerOne, playerTwoName, player);
      });
      shipPlacementButtonsContainer.replaceChild(
        shipPlacementDoneButtonClone,
        shipPlacementDoneButton
      );
      shipPlacementContainer.appendChild(shipPlacementButtonsContainer);
      pageContainer.appendChild(shipPlacementContainer);
    }
  });
  shipPlacementButtonsContainer.appendChild(shipPlacementDoneButton);
  shipPlacementContainer.appendChild(shipPlacementButtonsContainer);
  pageContainer.appendChild(shipPlacementContainer);
};

export default shipPlacement;
