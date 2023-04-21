import { createPlayer, createAI } from "./players";
import explosionSfxSrc from "./sfx/Explosion.webm";
import waterDropSfxSrc from "./sfx/Water-Drop.webm";
import victorySfxSrc from "./sfx/Victory.webm";

const randomShips = (playerGameboard) => {
  for (let i = 0; i < 5; i += 1) {
    let shipLength;
    if (i === 0) shipLength = 1;
    else if (i === 1 || i === 2) shipLength = 2;
    else if (i === 3) shipLength = 3;
    else shipLength = 4;
    const randomSmallNumber = Math.random();
    if (randomSmallNumber < 0.5) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const randomBigNumber = Math.round(Math.random() * 99);
        if (
          Math.floor(randomBigNumber / 10) ===
            Math.floor((randomBigNumber + shipLength) / 10) &&
          randomBigNumber + shipLength < 100
        ) {
          let spaceAvailable = true;
          for (let j = 0; j < shipLength + 1; j += 1)
            if (playerGameboard.gameboard[randomBigNumber + j] !== "")
              spaceAvailable = false;
          if (spaceAvailable) {
            playerGameboard.placeShip(
              playerGameboard.positions[randomBigNumber],
              playerGameboard.positions[randomBigNumber + shipLength]
            );
            break;
          }
        }
      }
    } else {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const randomBigNumber = Math.round(Math.random() * 99);
        if (randomBigNumber + shipLength * 10 < 100) {
          let spaceAvailable = true;
          for (let j = 0; j < (shipLength + 1) * 10; j += 10)
            if (playerGameboard.gameboard[randomBigNumber + j] !== "")
              spaceAvailable = false;
          if (spaceAvailable) {
            playerGameboard.placeShip(
              playerGameboard.positions[randomBigNumber],
              playerGameboard.positions[randomBigNumber + shipLength * 10]
            );
            break;
          }
        }
      }
    }
  }
  return playerGameboard.gameboard;
};

const gameSetup = () => {
  const gameStartButton = document.querySelector(".game-start-button");
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");

  gameStartButton.addEventListener("click", () => {
    let yourName = document.getElementById("player-one").value;
    if (yourName === "") yourName = "PLAYER 1";
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
    const enemy = createAI();
    randomShips(enemy.gameboard);
    const enemyGridSunk = document.createElement("div");
    enemyGridSunk.classList.add("enemy-grid-sunk");
    enemyGrid.appendChild(enemyGridSunk);
    const yourGrid = document.createElement("div");
    const you = createPlayer();
    randomShips(you.gameboard);
    const yourGridSunk = document.createElement("div");
    yourGridSunk.classList.add("enemy-grid-sunk");
    yourGrid.appendChild(yourGridSunk);
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      square.classList.add("normal-square");
      square.style.fontSize = "20px";
      square.style.cursor = "pointer";
      square.addEventListener(
        "click",
        () => {
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
        },
        { once: true }
      );
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
    let lastAttackIndex;
    const callback = () => {
      setTimeout(() => {
        if (enemy.gameboard.allSunk() === true) return;
        const attackResult = enemy.attack(you.gameboard, lastAttackIndex);
        const attackedSquare = document.querySelector(
          `[data-id='${attackResult[1]}']`
        );
        // eslint-disable-next-line prefer-destructuring
        lastAttackIndex = attackResult[1];
        if (attackResult[0][0] === "Hit") {
          attackedSquare.style.color = "red";
          attackedSquare.textContent = "X";
          if (you.gameboard.allSunk() === false) {
            const explosionSfx = new Audio(explosionSfxSrc);
            explosionSfx.play();
          }
          if (attackResult[0][1] === true) {
            const sunkenShipDOM = document.createElement("div");
            sunkenShipDOM.textContent = `${attackResult[0][2]} SUNK!`;
            sunkenShipDOM.classList.add("sunken-ship-text");
            yourGridSunk.appendChild(sunkenShipDOM);
            if (you.gameboard.allSunk() === true) {
              const winnerPopup = document.createElement("div");
              winnerPopup.textContent = "AI WINS!";
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
          attackedSquare.style.color = "gray";
          attackedSquare.textContent = "/";
          const waterDropSfx = new Audio(waterDropSfxSrc);
          waterDropSfx.play();
        }
      }, 1000);
    };
    const observer = new MutationObserver(callback);
    observer.observe(enemyGrid, config);
    gameGridsContainer.classList.add("game-grids-container");
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      if (you.gameboard.gameboard[i]) {
        let shipSquare = you.gameboard.gameboard[i];
        shipSquare = shipSquare.split(" ");
        square.classList.add(shipSquare[1]);
      } else square.classList.add("normal-square");
      square.setAttribute("data-id", i);
      square.style.fontSize = "40px";
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
  });
};

export default gameSetup;
