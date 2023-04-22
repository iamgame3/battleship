import { createPlayer } from "./players";
import randomShips from "./random-ship-gen";
import explosionSfxSrc from "./sfx/Explosion.webm";
import waterDropSfxSrc from "./sfx/Water-Drop.webm";
import victorySfxSrc from "./sfx/Victory.webm";

const twoPlayerGame = () => {
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
  let playerOneName = document.getElementById("player-one").value;
  if (playerOneName === "") playerOneName = "PLAYER 1";
  let playerTwoName = document.getElementById("player-two").value;
  if (playerTwoName === "") playerTwoName = "PLAYER 2";
  const playerOne = createPlayer();
  randomShips(playerOne.gameboard);
  const playerOneOriginalGameboard = playerOne.gameboard.gameboard.slice(0);
  const playerTwo = createPlayer();
  randomShips(playerTwo.gameboard);
  const playerTwoOriginalGameboard = playerTwo.gameboard.gameboard.slice(0);

  const gameLoop = (playerOneTurn) => {
    let you;
    let yourName;
    let yourOriginalGameboard;
    let enemy;
    if (playerOneTurn) {
      you = playerOne;
      yourName = playerOneName;
      yourOriginalGameboard = playerOneOriginalGameboard;
      enemy = playerTwo;
    } else {
      you = playerTwo;
      yourName = playerTwoName;
      yourOriginalGameboard = playerTwoOriginalGameboard;
      enemy = playerOne;
    }

    pageContainer.replaceChildren();
    const legend = document.createElement("div");
    const missLegend = document.createElement("h2");
    const hitLegend = document.createElement("h2");
    missLegend.textContent = "/: MISS";
    hitLegend.textContent = "X: HIT";
    missLegend.classList.add("legend-item");
    hitLegend.classList.add("legend-item");
    legend.classList.add("legend");
    legend.appendChild(missLegend);
    legend.appendChild(hitLegend);
    body.appendChild(legend);
    const gameGridsContainer = document.createElement("div");
    const enemyGrid = document.createElement("div");
    const enemyGridSunk = document.createElement("div");
    enemyGridSunk.classList.add("enemy-grid-sunk");
    enemyGrid.appendChild(enemyGridSunk);
    // eslint-disable-next-line no-restricted-syntax
    for (const ship in enemy.gameboard.ships) {
      if (enemy.gameboard.ships[ship].isSunk()) {
        const sunkenShipDOM = document.createElement("div");
        sunkenShipDOM.textContent = `${ship} SUNK!`;
        sunkenShipDOM.classList.add("sunken-ship-text");
        enemyGridSunk.appendChild(sunkenShipDOM);
      }
    }
    const yourGrid = document.createElement("div");
    const yourGridSunk = document.createElement("div");
    yourGridSunk.classList.add("enemy-grid-sunk");
    yourGrid.appendChild(yourGridSunk);
    // eslint-disable-next-line no-restricted-syntax
    for (const ship in you.gameboard.ships) {
      if (you.gameboard.ships[ship].isSunk()) {
        const sunkenShipDOM = document.createElement("div");
        sunkenShipDOM.textContent = `${ship} SUNK!`;
        sunkenShipDOM.classList.add("sunken-ship-text");
        yourGridSunk.appendChild(sunkenShipDOM);
      }
    }
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      square.classList.add("normal-square");
      square.style.fontSize = "20px";
      square.style.cursor = "pointer";
      if (enemy.gameboard.gameboard[i] === "Hit") {
        square.style.color = "red";
        square.textContent = "X";
      }
      if (enemy.gameboard.gameboard[i] === "Miss") {
        square.style.color = "gray";
        square.textContent = "/";
      }
      if (square.textContent === "") {
        square.addEventListener("click", () => {
          const blockClicksDiv = document.createElement("div");
          blockClicksDiv.classList.add("block-clicks-div");
          pageContainer.appendChild(blockClicksDiv);
          const attackResult = you.attack(enemy.gameboard, i);
          if (attackResult[0] === "Hit") {
            square.style.color = "red";
            square.textContent = "X";
            if (enemy.gameboard.allSunk() === false) {
              const explosionSfx = new Audio(explosionSfxSrc);
              explosionSfx.play();
            }
            if (attackResult[1] === true) {
              const sunkenShipDOM = document.createElement("div");
              sunkenShipDOM.textContent = `${attackResult[2]} SUNK!`;
              sunkenShipDOM.classList.add("sunken-ship-text");
              enemyGridSunk.appendChild(sunkenShipDOM);
              if (enemy.gameboard.allSunk() === true) {
                const winnerPopup = document.createElement("div");
                winnerPopup.textContent = `${yourName} WINS!`;
                winnerPopup.classList.add("winner-popup");
                const restartButton = document.createElement("button");
                restartButton.textContent = "BATTLE AGAIN?";
                restartButton.classList.add("restart-button");
                restartButton.addEventListener("click", () => {
                  // eslint-disable-next-line no-restricted-globals
                  location.reload();
                });
                winnerPopup.appendChild(restartButton);
                body.appendChild(winnerPopup);
                const victorySfx = new Audio(victorySfxSrc);
                victorySfx.play();
              }
            }
          } else {
            square.style.color = "gray";
            square.textContent = "/";
            const waterDropSfx = new Audio(waterDropSfxSrc);
            waterDropSfx.play();
          }
        });
      }
      enemyGrid.appendChild(square);
    }
    enemyGrid.classList.add("enemy-grid");
    const enemyGridHeader = document.createElement("h2");
    enemyGridHeader.textContent = "ENEMY GRID";
    enemyGridHeader.classList.add("enemy-grid-header");
    enemyGrid.appendChild(enemyGridHeader);
    const config = {
      attributes: true,
      childList: false,
      characterData: false,
      subtree: true,
    };
    const callback = () => {
      setTimeout(() => {
        if (enemy.gameboard.allSunk() === true) return;
        pageContainer.replaceChildren();
        body.removeChild(legend);
        const passDeviceContainer = document.createElement("div");
        passDeviceContainer.classList.add("pass-device-container");
        const passDeviceHeader = document.createElement("h1");
        passDeviceHeader.classList.add("pass-device-header");
        passDeviceHeader.textContent = "PASS DEVICE";
        const passDeviceButton = document.createElement("button");
        passDeviceButton.classList.add("pass-device-button");
        passDeviceButton.textContent = "DONE";
        passDeviceContainer.appendChild(passDeviceHeader);
        passDeviceContainer.appendChild(passDeviceButton);
        pageContainer.appendChild(passDeviceContainer);

        passDeviceButton.addEventListener("click", () => {
          // eslint-disable-next-line no-param-reassign
          if (playerOneTurn) playerOneTurn = false;
          // eslint-disable-next-line no-param-reassign
          else playerOneTurn = true;
          gameLoop(playerOneTurn);
        });
      }, 1500);
    };
    const observer = new MutationObserver(callback);
    observer.observe(enemyGrid, config);
    gameGridsContainer.classList.add("game-grids-container");
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      if (yourOriginalGameboard[i] !== "") {
        let shipSquare = yourOriginalGameboard[i];
        shipSquare = shipSquare.split(" ");
        square.classList.add(shipSquare[1]);
      } else square.classList.add("normal-square");
      square.style.fontSize = "40px";
      if (you.gameboard.gameboard[i] === "Hit") {
        square.style.color = "red";
        square.textContent = "X";
      }
      if (you.gameboard.gameboard[i] === "Miss") {
        square.style.color = "gray";
        square.textContent = "/";
      }
      yourGrid.appendChild(square);
    }
    yourGrid.classList.add("your-grid");
    const yourGridHeader = document.createElement("h2");
    yourGridHeader.textContent = "YOUR GRID";
    yourGridHeader.classList.add("your-grid-header");
    yourGrid.appendChild(yourGridHeader);
    gameGridsContainer.appendChild(enemyGrid);
    gameGridsContainer.appendChild(yourGrid);
    pageContainer.appendChild(gameGridsContainer);
  };

  const playerOneTurn = true;
  gameLoop(playerOneTurn);
};

export default twoPlayerGame;
