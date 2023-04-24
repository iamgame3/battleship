/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ai-game.js":
/*!************************!*\
  !*** ./src/ai-game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _random_ship_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random-ship-gen */ "./src/random-ship-gen.js");
/* harmony import */ var _sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sfx/Explosion.webm */ "./src/sfx/Explosion.webm");
/* harmony import */ var _sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sfx/Water-Drop.webm */ "./src/sfx/Water-Drop.webm");
/* harmony import */ var _sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sfx/Victory.webm */ "./src/sfx/Victory.webm");






const aiGame = (yourName, you) => {
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
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
  const enemy = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createAI)();
  (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_1__["default"])(enemy.gameboard);
  const enemyGridSunk = document.createElement("div");
  enemyGridSunk.classList.add("enemy-grid-sunk");
  enemyGrid.appendChild(enemyGridSunk);
  const yourGrid = document.createElement("div");
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
            const explosionSfx = new Audio(_sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_2__);
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
              const victorySfx = new Audio(_sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_4__);
              victorySfx.play();
            }
          }
        } else {
          square.style.color = "gray";
          square.textContent = "/";
          const waterDropSfx = new Audio(_sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_3__);
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
          const explosionSfx = new Audio(_sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_2__);
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
            const victorySfx = new Audio(_sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_4__);
            victorySfx.play();
          }
        }
      } else {
        attackedSquare.style.color = "gray";
        attackedSquare.textContent = "/";
        const waterDropSfx = new Audio(_sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_3__);
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
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aiGame);


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


const createGameboard = () => {
  const tempPositions = [];
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 1; j < 11; j += 1) {
      tempPositions.push(`${letters[i]}${j}`);
    }
  }
  const tempGameboard = [];
  for (let i = 0; i < 100; i += 1) {
    tempGameboard.push("");
  }
  const tempGameboardTwo = [];
  for (let i = 0; i < 100; i += 1) {
    tempGameboardTwo.push("");
  }
  return {
    positions: tempPositions,
    gameboard: tempGameboard,
    shipPositions: tempGameboardTwo,
    ships: {},
    subExists: false,
    placeShip(start, end) {
      const startIndex = this.positions.indexOf(start);
      const endIndex = this.positions.indexOf(end);
      let shipInfo;
      if ((endIndex - startIndex) % 10 === 0)
        shipInfo = [(endIndex - startIndex) / 10 + 1, "vert"];
      else shipInfo = [endIndex - startIndex + 1, "hor"];
      let shipName;
      if (shipInfo[0] === 5) shipName = "Aircraft-Carrier";
      if (shipInfo[0] === 4) shipName = "Battleship";
      if (shipInfo[0] === 3) {
        if (this.subExists === false) {
          this.subExists = true;
          shipName = "Submarine";
        } else shipName = "Cruiser";
      }
      if (shipInfo[0] === 2) shipName = "Destroyer";
      if (shipInfo[1] === "hor") {
        for (let i = startIndex; i < endIndex + 1; i += 1) {
          this.shipPositions[i] = shipName;
          if (i === startIndex)
            this.gameboard[i] = `${shipName} end-left-square`;
          else if (i === endIndex)
            this.gameboard[i] = `${shipName} end-right-square`;
          else {
            this.gameboard[i] = `${shipName} mid-${shipInfo[1]}-square`;
          }
        }
      } else {
        for (let i = startIndex; i < endIndex + 1; i += 10) {
          this.shipPositions[i] = shipName;
          if (i === startIndex)
            this.gameboard[i] = `${shipName} end-top-square`;
          else if (i === endIndex)
            this.gameboard[i] = `${shipName} end-bottom-square`;
          else this.gameboard[i] = `${shipName} mid-${shipInfo[1]}-square`;
        }
      }
      this.ships[shipName] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(shipInfo[0]);
      return this.ships[shipName];
    },
    receiveAttack(gameboardIndex) {
      if (this.gameboard[gameboardIndex]) {
        const attackedShip = this.gameboard[gameboardIndex].split(" ");
        this.ships[attackedShip[0]].hit();
        this.gameboard[gameboardIndex] = "Hit";
        const isSunk = this.ships[attackedShip[0]].isSunk();
        return ["Hit", isSunk, attackedShip[0]];
      }
      this.gameboard[gameboardIndex] = "Miss";
      return ["Miss", false];
    },
    allSunk() {
      let allSunk = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const ship in this.ships) {
        if (!this.ships[ship].sunk) allSunk = false;
      }
      return allSunk;
    },
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGameboard);


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAI": () => (/* binding */ createAI),
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* eslint-disable no-constant-condition */


const createPlayer = () => ({
  gameboard: (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(),
  attack(enemyGameboard, coords) {
    return enemyGameboard.receiveAttack(coords);
  },
});

const createAI = () => ({
  gameboard: (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(),
  attack(enemyGameboard, lastAttackIndex) {
    const positions = enemyGameboard.gameboard;
    const randomAttack = () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const randomNumber = Math.round(Math.random() * 99);
        const possibleAttack = positions[randomNumber];
        if (possibleAttack !== "Hit" && possibleAttack !== "Miss") {
          return [enemyGameboard.receiveAttack(randomNumber), randomNumber];
        }
      }
    };
    if (lastAttackIndex === undefined) return randomAttack();
    const predictShipLocation = (lAttackIndex) => {
      const squareAbove = positions[lAttackIndex - 10];
      const squareBelow = positions[lAttackIndex + 10];
      let squareLeft;
      let squareRight;
      if (lAttackIndex % 10 !== 0) squareLeft = positions[lAttackIndex - 1];
      if (lAttackIndex.toString().substring[1] !== "9")
        squareRight = positions[lAttackIndex + 1];
      if (positions[lAttackIndex] === "Hit") {
        if (
          enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex]
          ].isSunk()
        )
          return randomAttack();
        if (
          (squareAbove === undefined || squareAbove === "Miss") &&
          squareBelow === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex + 10]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex + 10);
        if (
          (squareBelow === undefined || squareBelow === "Miss") &&
          squareAbove === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex - 10]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex - 10);
        if (
          (squareLeft === undefined || squareLeft === "Miss") &&
          squareRight === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex + 1]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex + 1);
        if (
          (squareRight === undefined || squareRight === "Miss") &&
          squareLeft === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex - 1]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex - 1);
        if (squareAbove && squareBelow) {
          if (
            squareAbove === "Hit" &&
            squareBelow !== "Miss" &&
            squareBelow !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex + 10),
              lAttackIndex + 10,
            ];
          if (
            squareBelow === "Hit" &&
            squareAbove !== "Miss" &&
            squareAbove !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex - 10),
              lAttackIndex - 10,
            ];
        }
        if (squareLeft && squareRight) {
          if (
            squareLeft === "Hit" &&
            squareRight !== "Miss" &&
            squareRight !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex + 1),
              lAttackIndex + 1,
            ];
          if (
            squareRight === "Hit" &&
            squareLeft !== "Miss" &&
            squareLeft !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex - 1),
              lAttackIndex - 1,
            ];
        }
        if (
          squareAbove !== undefined &&
          squareAbove !== "Miss" &&
          squareAbove !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex - 10),
            lAttackIndex - 10,
          ];
        if (
          squareLeft !== undefined &&
          squareLeft !== "Miss" &&
          squareLeft !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex - 1),
            lAttackIndex - 1,
          ];
        if (
          squareRight !== undefined &&
          squareRight !== "Miss" &&
          squareRight !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex + 1),
            lAttackIndex + 1,
          ];
        if (
          squareBelow !== undefined &&
          squareBelow !== "Miss" &&
          squareBelow !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex + 10),
            lAttackIndex + 10,
          ];
      }
      if (
        squareAbove === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 20] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 10]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy -= 10;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy + 10);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareLeft === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 2] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 1]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy -= 1;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy + 1);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareRight === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 2] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 1]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy += 1;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy - 1);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareBelow === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 20] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 10]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy += 10;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy - 10);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareAbove === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 20] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex - 20] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 10]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex - 10);
      if (
        squareLeft === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 2] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex - 2] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 1]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex - 1);
      if (
        squareRight === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 2] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex + 2] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 1]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex + 1);
      if (
        squareBelow === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 20] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex + 20] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 10]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex + 10);
      return randomAttack();
    };
    return predictShipLocation(lastAttackIndex);
  },
});




/***/ }),

/***/ "./src/random-ship-gen.js":
/*!********************************!*\
  !*** ./src/random-ship-gen.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (randomShips);


/***/ }),

/***/ "./src/ship-placement.js":
/*!*******************************!*\
  !*** ./src/ship-placement.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ai_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai-game */ "./src/ai-game.js");
/* harmony import */ var _two_player_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./two-player-game */ "./src/two-player-game.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _random_ship_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./random-ship-gen */ "./src/random-ship-gen.js");





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
  let player = (0,_players__WEBPACK_IMPORTED_MODULE_2__.createPlayer)();
  (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_3__["default"])(player.gameboard);
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
    player = (0,_players__WEBPACK_IMPORTED_MODULE_2__.createPlayer)();
    (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_3__["default"])(player.gameboard);
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
    if (ai) (0,_ai_game__WEBPACK_IMPORTED_MODULE_0__["default"])(playerOneName, player);
    else {
      const shipPlacementHeaderReplacement = document.createElement("h1");
      shipPlacementHeaderReplacement.classList.add("ship-placement-header");
      shipPlacementHeaderReplacement.textContent = `${playerOneName}, PLACE YOUR SHIPS`;
      shipPlacementContainer.replaceChild(
        shipPlacementHeaderReplacement,
        shipPlacementHeader
      );
      let playerOne = (0,_players__WEBPACK_IMPORTED_MODULE_2__.createPlayer)();
      (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_3__["default"])(playerOne.gameboard);
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
        playerOne = (0,_players__WEBPACK_IMPORTED_MODULE_2__.createPlayer)();
        (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_3__["default"])(playerOne.gameboard);
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
        (0,_two_player_game__WEBPACK_IMPORTED_MODULE_1__["default"])(playerOneName, playerOne, playerTwoName, player);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipPlacement);


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createShip = (shipLength) => ({
  length: shipLength,
  hits: 0,
  sunk: false,
  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  },
  hit() {
    this.hits += 1;
    if (this.isSunk() === true) this.sunk = true;
  },
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createShip);


/***/ }),

/***/ "./src/two-player-game.js":
/*!********************************!*\
  !*** ./src/two-player-game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sfx/Explosion.webm */ "./src/sfx/Explosion.webm");
/* harmony import */ var _sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sfx/Water-Drop.webm */ "./src/sfx/Water-Drop.webm");
/* harmony import */ var _sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sfx/Victory.webm */ "./src/sfx/Victory.webm");




const twoPlayerGame = (playerOneName, playerOne, playerTwoName, playerTwo) => {
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
  const playerOneOriginalGameboard = playerOne.gameboard.gameboard.slice(0);
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
              const explosionSfx = new Audio(_sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_0__);
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
                const victorySfx = new Audio(_sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_2__);
                victorySfx.play();
              }
            }
          } else {
            square.style.color = "gray";
            square.textContent = "/";
            const waterDropSfx = new Audio(_sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_1__);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (twoPlayerGame);


/***/ }),

/***/ "./src/sfx/Explosion.webm":
/*!********************************!*\
  !*** ./src/sfx/Explosion.webm ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cee3247d48e431601d9e.webm";

/***/ }),

/***/ "./src/sfx/Victory.webm":
/*!******************************!*\
  !*** ./src/sfx/Victory.webm ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9c1dc73f0e4cca6f4190.webm";

/***/ }),

/***/ "./src/sfx/Water-Drop.webm":
/*!*********************************!*\
  !*** ./src/sfx/Water-Drop.webm ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d2ef55f8b0d7b3db36a2.webm";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship_placement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship-placement */ "./src/ship-placement.js");


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
  (0,_ship_placement__WEBPACK_IMPORTED_MODULE_0__["default"])(aiPlayer);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxlQUFlLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkYvQjtBQUMwQzs7QUFFMUM7QUFDQSxhQUFhLHNEQUFlO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBLGFBQWEsc0RBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0EsRUFBRSwyREFBYTtBQUNmLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FpLWdhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcmFuZG9tLXNoaXAtZ2VuLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC1wbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdHdvLXBsYXllci1nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUFJIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuaW1wb3J0IHJhbmRvbVNoaXBzIGZyb20gXCIuL3JhbmRvbS1zaGlwLWdlblwiO1xuaW1wb3J0IGV4cGxvc2lvblNmeFNyYyBmcm9tIFwiLi9zZngvRXhwbG9zaW9uLndlYm1cIjtcbmltcG9ydCB3YXRlckRyb3BTZnhTcmMgZnJvbSBcIi4vc2Z4L1dhdGVyLURyb3Aud2VibVwiO1xuaW1wb3J0IHZpY3RvcnlTZnhTcmMgZnJvbSBcIi4vc2Z4L1ZpY3Rvcnkud2VibVwiO1xuXG5jb25zdCBhaUdhbWUgPSAoeW91ck5hbWUsIHlvdSkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICBwYWdlQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtaXNzTGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBoaXRMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIG1pc3NMZWdlbmQudGV4dENvbnRlbnQgPSBcIi86IE1JU1NcIjtcbiAgaGl0TGVnZW5kLnRleHRDb250ZW50ID0gXCJYOiBISVRcIjtcbiAgbWlzc0xlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gIGhpdExlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gIGxlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kXCIpO1xuICBsZWdlbmQuYXBwZW5kQ2hpbGQobWlzc0xlZ2VuZCk7XG4gIGxlZ2VuZC5hcHBlbmRDaGlsZChoaXRMZWdlbmQpO1xuICBib2R5LmFwcGVuZENoaWxkKGxlZ2VuZCk7XG4gIGNvbnN0IGdhbWVHcmlkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGVuZW15ID0gY3JlYXRlQUkoKTtcbiAgcmFuZG9tU2hpcHMoZW5lbXkuZ2FtZWJvYXJkKTtcbiAgY29uc3QgZW5lbXlHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVuZW15R3JpZFN1bmsuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtc3Vua1wiKTtcbiAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKGVuZW15R3JpZFN1bmspO1xuICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHlvdXJHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHlvdXJHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZFN1bmspO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgc3F1YXJlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSB5b3UuYXR0YWNrKGVuZW15LmdhbWVib2FyZCwgaSk7XG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9zaW9uU2Z4ID0gbmV3IEF1ZGlvKGV4cGxvc2lvblNmeFNyYyk7XG4gICAgICAgICAgICBleHBsb3Npb25TZngucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHN1bmtlblNoaXBET00udGV4dENvbnRlbnQgPSBgJHthdHRhY2tSZXN1bHRbMl19IFNVTkshYDtcbiAgICAgICAgICAgIHN1bmtlblNoaXBET00uY2xhc3NMaXN0LmFkZChcInN1bmtlbi1zaGlwLXRleHRcIik7XG4gICAgICAgICAgICBlbmVteUdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2lubmVyUG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICB3aW5uZXJQb3B1cC50ZXh0Q29udGVudCA9IGAke3lvdXJOYW1lfSBXSU5TIWA7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItcG9wdXBcIik7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCQVRUTEUgQUdBSU4/XCI7XG4gICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd2lubmVyUG9wdXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQod2lubmVyUG9wdXApO1xuICAgICAgICAgICAgICBjb25zdCB2aWN0b3J5U2Z4ID0gbmV3IEF1ZGlvKHZpY3RvcnlTZnhTcmMpO1xuICAgICAgICAgICAgICB2aWN0b3J5U2Z4LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICAgICAgY29uc3Qgd2F0ZXJEcm9wU2Z4ID0gbmV3IEF1ZGlvKHdhdGVyRHJvcFNmeFNyYyk7XG4gICAgICAgICAgd2F0ZXJEcm9wU2Z4LnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgKTtcbiAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuICBlbmVteUdyaWQuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWRcIik7XG4gIGNvbnN0IGVuZW15R3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgZW5lbXlHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJFTkVNWSBHUklEXCI7XG4gIGVuZW15R3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1oZWFkZXJcIik7XG4gIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRIZWFkZXIpO1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gIH07XG4gIGxldCBsYXN0QXR0YWNrSW5kZXg7XG4gIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHJldHVybjtcbiAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15LmF0dGFjayh5b3UuZ2FtZWJvYXJkLCBsYXN0QXR0YWNrSW5kZXgpO1xuICAgICAgY29uc3QgYXR0YWNrZWRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtaWQ9JyR7YXR0YWNrUmVzdWx0WzFdfSddYFxuICAgICAgKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgbGFzdEF0dGFja0luZGV4ID0gYXR0YWNrUmVzdWx0WzFdO1xuICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXVswXSA9PT0gXCJIaXRcIikge1xuICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgIGF0dGFja2VkU3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zdCBleHBsb3Npb25TZnggPSBuZXcgQXVkaW8oZXhwbG9zaW9uU2Z4U3JjKTtcbiAgICAgICAgICBleHBsb3Npb25TZngucGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMV0gPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7YXR0YWNrUmVzdWx0WzBdWzJdfSBTVU5LIWA7XG4gICAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgICB5b3VyR3JpZFN1bmsuYXBwZW5kQ2hpbGQoc3Vua2VuU2hpcERPTSk7XG4gICAgICAgICAgaWYgKHlvdS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB3aW5uZXJQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB3aW5uZXJQb3B1cC50ZXh0Q29udGVudCA9IFwiQUkgV0lOUyFcIjtcbiAgICAgICAgICAgIHdpbm5lclBvcHVwLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItcG9wdXBcIik7XG4gICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIHJlc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSBcIkJBVFRMRSBBR0FJTj9cIjtcbiAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXG4gICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5uZXJQb3B1cC5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQod2lubmVyUG9wdXApO1xuICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgIHZpY3RvcnlTZngucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0YWNrZWRTcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgY29uc3Qgd2F0ZXJEcm9wU2Z4ID0gbmV3IEF1ZGlvKHdhdGVyRHJvcFNmeFNyYyk7XG4gICAgICAgIHdhdGVyRHJvcFNmeC5wbGF5KCk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH07XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICBvYnNlcnZlci5vYnNlcnZlKGVuZW15R3JpZCwgY29uZmlnKTtcbiAgZ2FtZUdyaWRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lLWdyaWRzLWNvbnRhaW5lclwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBpKTtcbiAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG4gIHlvdXJHcmlkLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWRcIik7XG4gIGNvbnN0IHlvdXJHcmlkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICB5b3VyR3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiWU9VUiBHUklEXCI7XG4gIHlvdXJHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWQtaGVhZGVyXCIpO1xuICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZEhlYWRlcik7XG4gIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoeW91ckdyaWQpO1xuICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVHcmlkc0NvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhaUdhbWU7XG4iLCJpbXBvcnQgY3JlYXRlU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgdGVtcFBvc2l0aW9ucyA9IFtdO1xuICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaiArPSAxKSB7XG4gICAgICB0ZW1wUG9zaXRpb25zLnB1c2goYCR7bGV0dGVyc1tpXX0ke2p9YCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHRlbXBHYW1lYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIHRlbXBHYW1lYm9hcmQucHVzaChcIlwiKTtcbiAgfVxuICBjb25zdCB0ZW1wR2FtZWJvYXJkVHdvID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICB0ZW1wR2FtZWJvYXJkVHdvLnB1c2goXCJcIik7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbnM6IHRlbXBQb3NpdGlvbnMsXG4gICAgZ2FtZWJvYXJkOiB0ZW1wR2FtZWJvYXJkLFxuICAgIHNoaXBQb3NpdGlvbnM6IHRlbXBHYW1lYm9hcmRUd28sXG4gICAgc2hpcHM6IHt9LFxuICAgIHN1YkV4aXN0czogZmFsc2UsXG4gICAgcGxhY2VTaGlwKHN0YXJ0LCBlbmQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihlbmQpO1xuICAgICAgbGV0IHNoaXBJbmZvO1xuICAgICAgaWYgKChlbmRJbmRleCAtIHN0YXJ0SW5kZXgpICUgMTAgPT09IDApXG4gICAgICAgIHNoaXBJbmZvID0gWyhlbmRJbmRleCAtIHN0YXJ0SW5kZXgpIC8gMTAgKyAxLCBcInZlcnRcIl07XG4gICAgICBlbHNlIHNoaXBJbmZvID0gW2VuZEluZGV4IC0gc3RhcnRJbmRleCArIDEsIFwiaG9yXCJdO1xuICAgICAgbGV0IHNoaXBOYW1lO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA1KSBzaGlwTmFtZSA9IFwiQWlyY3JhZnQtQ2FycmllclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA0KSBzaGlwTmFtZSA9IFwiQmF0dGxlc2hpcFwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAzKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YkV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnN1YkV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgc2hpcE5hbWUgPSBcIlN1Ym1hcmluZVwiO1xuICAgICAgICB9IGVsc2Ugc2hpcE5hbWUgPSBcIkNydWlzZXJcIjtcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMikgc2hpcE5hbWUgPSBcIkRlc3Ryb3llclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzFdID09PSBcImhvclwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICB0aGlzLnNoaXBQb3NpdGlvbnNbaV0gPSBzaGlwTmFtZTtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1sZWZ0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtcmlnaHQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMTApIHtcbiAgICAgICAgICB0aGlzLnNoaXBQb3NpdGlvbnNbaV0gPSBzaGlwTmFtZTtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC10b3Atc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1ib3R0b20tc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBzW3NoaXBOYW1lXSA9IGNyZWF0ZVNoaXAoc2hpcEluZm9bMF0pO1xuICAgICAgcmV0dXJuIHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuICAgIH0sXG4gICAgcmVjZWl2ZUF0dGFjayhnYW1lYm9hcmRJbmRleCkge1xuICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSkge1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0uc3BsaXQoXCIgXCIpO1xuICAgICAgICB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaGl0KCk7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSA9IFwiSGl0XCI7XG4gICAgICAgIGNvbnN0IGlzU3VuayA9IHRoaXMuc2hpcHNbYXR0YWNrZWRTaGlwWzBdXS5pc1N1bmsoKTtcbiAgICAgICAgcmV0dXJuIFtcIkhpdFwiLCBpc1N1bmssIGF0dGFja2VkU2hpcFswXV07XG4gICAgICB9XG4gICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIk1pc3NcIjtcbiAgICAgIHJldHVybiBbXCJNaXNzXCIsIGZhbHNlXTtcbiAgICB9LFxuICAgIGFsbFN1bmsoKSB7XG4gICAgICBsZXQgYWxsU3VuayA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGlwc1tzaGlwXS5zdW5rKSBhbGxTdW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsU3VuaztcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZWJvYXJkO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc3RhbnQtY29uZGl0aW9uICovXG5pbXBvcnQgY3JlYXRlR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBjcmVhdGVQbGF5ZXIgPSAoKSA9PiAoe1xuICBnYW1lYm9hcmQ6IGNyZWF0ZUdhbWVib2FyZCgpLFxuICBhdHRhY2soZW5lbXlHYW1lYm9hcmQsIGNvb3Jkcykge1xuICAgIHJldHVybiBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gIH0sXG59KTtcblxuY29uc3QgY3JlYXRlQUkgPSAoKSA9PiAoe1xuICBnYW1lYm9hcmQ6IGNyZWF0ZUdhbWVib2FyZCgpLFxuICBhdHRhY2soZW5lbXlHYW1lYm9hcmQsIGxhc3RBdHRhY2tJbmRleCkge1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZDtcbiAgICBjb25zdCByYW5kb21BdHRhY2sgPSAoKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5OSk7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlQXR0YWNrID0gcG9zaXRpb25zW3JhbmRvbU51bWJlcl07XG4gICAgICAgIGlmIChwb3NzaWJsZUF0dGFjayAhPT0gXCJIaXRcIiAmJiBwb3NzaWJsZUF0dGFjayAhPT0gXCJNaXNzXCIpIHtcbiAgICAgICAgICByZXR1cm4gW2VuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tTnVtYmVyKSwgcmFuZG9tTnVtYmVyXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGxhc3RBdHRhY2tJbmRleCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gcmFuZG9tQXR0YWNrKCk7XG4gICAgY29uc3QgcHJlZGljdFNoaXBMb2NhdGlvbiA9IChsQXR0YWNrSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHNxdWFyZUFib3ZlID0gcG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDEwXTtcbiAgICAgIGNvbnN0IHNxdWFyZUJlbG93ID0gcG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDEwXTtcbiAgICAgIGxldCBzcXVhcmVMZWZ0O1xuICAgICAgbGV0IHNxdWFyZVJpZ2h0O1xuICAgICAgaWYgKGxBdHRhY2tJbmRleCAlIDEwICE9PSAwKSBzcXVhcmVMZWZ0ID0gcG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDFdO1xuICAgICAgaWYgKGxBdHRhY2tJbmRleC50b1N0cmluZygpLnN1YnN0cmluZ1sxXSAhPT0gXCI5XCIpXG4gICAgICAgIHNxdWFyZVJpZ2h0ID0gcG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDFdO1xuICAgICAgaWYgKHBvc2l0aW9uc1tsQXR0YWNrSW5kZXhdID09PSBcIkhpdFwiKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4XVxuICAgICAgICAgIF0uaXNTdW5rKClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiByYW5kb21BdHRhY2soKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzcXVhcmVBYm92ZSA9PT0gdW5kZWZpbmVkIHx8IHNxdWFyZUFib3ZlID09PSBcIk1pc3NcIikgJiZcbiAgICAgICAgICBzcXVhcmVCZWxvdyA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMTBdXG4gICAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4ICsgMTApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZUJlbG93ID09PSB1bmRlZmluZWQgfHwgc3F1YXJlQmVsb3cgPT09IFwiTWlzc1wiKSAmJlxuICAgICAgICAgIHNxdWFyZUFib3ZlID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxMF1cbiAgICAgICAgICBdLmlzU3VuaygpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggLSAxMCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlTGVmdCA9PT0gdW5kZWZpbmVkIHx8IHNxdWFyZUxlZnQgPT09IFwiTWlzc1wiKSAmJlxuICAgICAgICAgIHNxdWFyZVJpZ2h0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxXVxuICAgICAgICAgIF0uaXNTdW5rKClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZVJpZ2h0ID09PSB1bmRlZmluZWQgfHwgc3F1YXJlUmlnaHQgPT09IFwiTWlzc1wiKSAmJlxuICAgICAgICAgIHNxdWFyZUxlZnQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDFdXG4gICAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMSk7XG4gICAgICAgIGlmIChzcXVhcmVBYm92ZSAmJiBzcXVhcmVCZWxvdykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZUFib3ZlID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxMCksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEwLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVCZWxvdyA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMTApLFxuICAgICAgICAgICAgICBsQXR0YWNrSW5kZXggLSAxMCxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNxdWFyZUxlZnQgJiYgc3F1YXJlUmlnaHQpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVMZWZ0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlUmlnaHQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggLSAxKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMTApLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMTAsXG4gICAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZUxlZnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlTGVmdCAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMSksXG4gICAgICAgICAgICBsQXR0YWNrSW5kZXggLSAxLFxuICAgICAgICAgIF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCArIDEpLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMSxcbiAgICAgICAgICBdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3F1YXJlQmVsb3cgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxMCksXG4gICAgICAgICAgICBsQXR0YWNrSW5kZXggKyAxMCxcbiAgICAgICAgICBdO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVBYm92ZSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4IC0gMjBdID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDEwXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApIHtcbiAgICAgICAgbGV0IGxBdHRhY2tJbmRleENvcHkgPSBsQXR0YWNrSW5kZXg7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgbEF0dGFja0luZGV4Q29weSAtPSAxMDtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIlwiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSArIDEwKTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIk1pc3NcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IHVuZGVmaW5lZCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4IC0gMl0gPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMV1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBsQXR0YWNrSW5kZXhDb3B5ID0gbEF0dGFja0luZGV4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGxBdHRhY2tJbmRleENvcHkgLT0gMTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIlwiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSArIDEpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IFwiTWlzc1wiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSk7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gdW5kZWZpbmVkKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4ICsgMl0gPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBsQXR0YWNrSW5kZXhDb3B5ID0gbEF0dGFja0luZGV4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGxBdHRhY2tJbmRleENvcHkgKz0gMTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIlwiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSAtIDEpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IFwiTWlzc1wiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSk7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gdW5kZWZpbmVkKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVCZWxvdyA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4ICsgMjBdID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDEwXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApIHtcbiAgICAgICAgbGV0IGxBdHRhY2tJbmRleENvcHkgPSBsQXR0YWNrSW5kZXg7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgbEF0dGFja0luZGV4Q29weSArPSAxMDtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIlwiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSAtIDEwKTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIk1pc3NcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IHVuZGVmaW5lZCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQWJvdmUgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCAtIDIwXSAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCAtIDIwXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDEwXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEwKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4IC0gMl0gIT09IFwiTWlzc1wiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggLSAyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDFdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMSk7XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZVJpZ2h0ID09PSBcIkhpdFwiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggKyAyXSAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCArIDJdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCArIDIwXSAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCArIDIwXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDEwXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEwKTtcbiAgICAgIHJldHVybiByYW5kb21BdHRhY2soKTtcbiAgICB9O1xuICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxhc3RBdHRhY2tJbmRleCk7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVBSSB9O1xuIiwiY29uc3QgcmFuZG9tU2hpcHMgPSAocGxheWVyR2FtZWJvYXJkKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSArPSAxKSB7XG4gICAgbGV0IHNoaXBMZW5ndGg7XG4gICAgaWYgKGkgPT09IDApIHNoaXBMZW5ndGggPSAxO1xuICAgIGVsc2UgaWYgKGkgPT09IDEgfHwgaSA9PT0gMikgc2hpcExlbmd0aCA9IDI7XG4gICAgZWxzZSBpZiAoaSA9PT0gMykgc2hpcExlbmd0aCA9IDM7XG4gICAgZWxzZSBzaGlwTGVuZ3RoID0gNDtcbiAgICBjb25zdCByYW5kb21TbWFsbE51bWJlciA9IE1hdGgucmFuZG9tKCk7XG4gICAgaWYgKHJhbmRvbVNtYWxsTnVtYmVyIDwgMC41KSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCByYW5kb21CaWdOdW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5OSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBNYXRoLmZsb29yKHJhbmRvbUJpZ051bWJlciAvIDEwKSA9PT1cbiAgICAgICAgICAgIE1hdGguZmxvb3IoKHJhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGgpIC8gMTApICYmXG4gICAgICAgICAgcmFuZG9tQmlnTnVtYmVyICsgc2hpcExlbmd0aCA8IDEwMFxuICAgICAgICApIHtcbiAgICAgICAgICBsZXQgc3BhY2VBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcExlbmd0aCArIDE7IGogKz0gMSlcbiAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuZ2FtZWJvYXJkW3JhbmRvbUJpZ051bWJlciArIGpdICE9PSBcIlwiKVxuICAgICAgICAgICAgICBzcGFjZUF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzcGFjZUF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBvc2l0aW9uc1tyYW5kb21CaWdOdW1iZXJdLFxuICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucG9zaXRpb25zW3JhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGhdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUJpZ051bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgICAgaWYgKHJhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGggKiAxMCA8IDEwMCkge1xuICAgICAgICAgIGxldCBzcGFjZUF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAoc2hpcExlbmd0aCArIDEpICogMTA7IGogKz0gMTApXG4gICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmdhbWVib2FyZFtyYW5kb21CaWdOdW1iZXIgKyBqXSAhPT0gXCJcIilcbiAgICAgICAgICAgICAgc3BhY2VBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoc3BhY2VBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wb3NpdGlvbnNbcmFuZG9tQmlnTnVtYmVyXSxcbiAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBvc2l0aW9uc1tyYW5kb21CaWdOdW1iZXIgKyBzaGlwTGVuZ3RoICogMTBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBwbGF5ZXJHYW1lYm9hcmQuZ2FtZWJvYXJkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmFuZG9tU2hpcHM7XG4iLCJpbXBvcnQgYWlHYW1lIGZyb20gXCIuL2FpLWdhbWVcIjtcbmltcG9ydCB0d29QbGF5ZXJHYW1lIGZyb20gXCIuL3R3by1wbGF5ZXItZ2FtZVwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuaW1wb3J0IHJhbmRvbVNoaXBzIGZyb20gXCIuL3JhbmRvbS1zaGlwLWdlblwiO1xuXG5jb25zdCBzaGlwUGxhY2VtZW50ID0gKGFpKSA9PiB7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICBsZXQgcGxheWVyT25lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZVwiKS52YWx1ZTtcbiAgaWYgKHBsYXllck9uZU5hbWUgPT09IFwiXCIpIHBsYXllck9uZU5hbWUgPSBcIlBMQVlFUiAxXCI7XG4gIGxldCBwbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvXCIpLnZhbHVlO1xuICBpZiAocGxheWVyVHdvTmFtZSA9PT0gXCJcIikgcGxheWVyVHdvTmFtZSA9IFwiUExBWUVSIDJcIjtcbiAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgY29uc3Qgc2hpcFBsYWNlbWVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBQbGFjZW1lbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNoaXAtcGxhY2VtZW50LWNvbnRhaW5lclwiKTtcbiAgY29uc3Qgc2hpcFBsYWNlbWVudEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgc2hpcFBsYWNlbWVudEhlYWRlci5jbGFzc0xpc3QuYWRkKFwic2hpcC1wbGFjZW1lbnQtaGVhZGVyXCIpO1xuICBpZiAoYWkpXG4gICAgc2hpcFBsYWNlbWVudEhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllck9uZU5hbWV9LCBQTEFDRSBZT1VSIFNISVBTYDtcbiAgZWxzZSBzaGlwUGxhY2VtZW50SGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyVHdvTmFtZX0sIFBMQUNFIFlPVVIgU0hJUFNgO1xuICBzaGlwUGxhY2VtZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBQbGFjZW1lbnRIZWFkZXIpO1xuICBsZXQgcGxheWVyID0gY3JlYXRlUGxheWVyKCk7XG4gIHJhbmRvbVNoaXBzKHBsYXllci5nYW1lYm9hcmQpO1xuICBsZXQgc2hpcFBsYWNlbWVudEdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzaGlwUGxhY2VtZW50R3JpZC5jbGFzc0xpc3QuYWRkKFwic2hpcC1wbGFjZW1lbnQtZ3JpZFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKHBsYXllci5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICBsZXQgc2hpcFNxdWFyZSA9IHBsYXllci5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBpKTtcbiAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICBzaGlwUGxhY2VtZW50R3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICB9XG4gIHNoaXBQbGFjZW1lbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcFBsYWNlbWVudEdyaWQpO1xuICBjb25zdCBzaGlwUGxhY2VtZW50QnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNoaXBQbGFjZW1lbnRCdXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG4gICAgXCJzaGlwLXBsYWNlbWVudC1idXR0b25zLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHNoaXBQbGFjZW1lbnRSYW5kb21CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzaGlwUGxhY2VtZW50UmFuZG9tQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXBsYWNlbWVudC1idXR0b25cIik7XG4gIHNoaXBQbGFjZW1lbnRSYW5kb21CdXR0b24udGV4dENvbnRlbnQgPSBcIlJBTkRPTUlTRVwiO1xuICBzaGlwUGxhY2VtZW50UmFuZG9tQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcGxheWVyID0gY3JlYXRlUGxheWVyKCk7XG4gICAgcmFuZG9tU2hpcHMocGxheWVyLmdhbWVib2FyZCk7XG4gICAgY29uc3Qgc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcC1wbGFjZW1lbnQtZ3JpZFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICAgIGxldCBzaGlwU3F1YXJlID0gcGxheWVyLmdhbWVib2FyZC5nYW1lYm9hcmRbaV07XG4gICAgICAgIHNoaXBTcXVhcmUgPSBzaGlwU3F1YXJlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgICB9IGVsc2Ugc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaSk7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgIHNoaXBQbGFjZW1lbnRHcmlkUmVwbGFjZW1lbnQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5yZXBsYWNlQ2hpbGQoXG4gICAgICBzaGlwUGxhY2VtZW50R3JpZFJlcGxhY2VtZW50LFxuICAgICAgc2hpcFBsYWNlbWVudEdyaWRcbiAgICApO1xuICAgIHNoaXBQbGFjZW1lbnRHcmlkID0gc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudDtcbiAgfSk7XG4gIHNoaXBQbGFjZW1lbnRCdXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBQbGFjZW1lbnRSYW5kb21CdXR0b24pO1xuICBjb25zdCBzaGlwUGxhY2VtZW50RG9uZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNoaXBQbGFjZW1lbnREb25lQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJzaGlwLXBsYWNlbWVudC1idXR0b25cIik7XG4gIHNoaXBQbGFjZW1lbnREb25lQnV0dG9uLnRleHRDb250ZW50ID0gXCJET05FXCI7XG4gIHNoaXBQbGFjZW1lbnREb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGFpKSBhaUdhbWUocGxheWVyT25lTmFtZSwgcGxheWVyKTtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZW1lbnRIZWFkZXJSZXBsYWNlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgIHNoaXBQbGFjZW1lbnRIZWFkZXJSZXBsYWNlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcC1wbGFjZW1lbnQtaGVhZGVyXCIpO1xuICAgICAgc2hpcFBsYWNlbWVudEhlYWRlclJlcGxhY2VtZW50LnRleHRDb250ZW50ID0gYCR7cGxheWVyT25lTmFtZX0sIFBMQUNFIFlPVVIgU0hJUFNgO1xuICAgICAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5yZXBsYWNlQ2hpbGQoXG4gICAgICAgIHNoaXBQbGFjZW1lbnRIZWFkZXJSZXBsYWNlbWVudCxcbiAgICAgICAgc2hpcFBsYWNlbWVudEhlYWRlclxuICAgICAgKTtcbiAgICAgIGxldCBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIoKTtcbiAgICAgIHJhbmRvbVNoaXBzKHBsYXllck9uZS5nYW1lYm9hcmQpO1xuICAgICAgbGV0IHNoaXBQbGFjZW1lbnRHcmlkUmVwbGFjZW1lbnRPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudE9uZS5jbGFzc0xpc3QuYWRkKFwic2hpcC1wbGFjZW1lbnQtZ3JpZFwiKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaWYgKHBsYXllck9uZS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICAgICAgbGV0IHNoaXBTcXVhcmUgPSBwbGF5ZXJPbmUuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXTtcbiAgICAgICAgICBzaGlwU3F1YXJlID0gc2hpcFNxdWFyZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgICAgIH0gZWxzZSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGkpO1xuICAgICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgICAgc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudE9uZS5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5yZXBsYWNlQ2hpbGQoXG4gICAgICAgIHNoaXBQbGFjZW1lbnRHcmlkUmVwbGFjZW1lbnRPbmUsXG4gICAgICAgIHNoaXBQbGFjZW1lbnRHcmlkXG4gICAgICApO1xuICAgICAgY29uc3Qgc2hpcFBsYWNlbWVudFJhbmRvbUJ1dHRvbkNsb25lID1cbiAgICAgICAgc2hpcFBsYWNlbWVudFJhbmRvbUJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICBzaGlwUGxhY2VtZW50UmFuZG9tQnV0dG9uQ2xvbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgcGxheWVyT25lID0gY3JlYXRlUGxheWVyKCk7XG4gICAgICAgIHJhbmRvbVNoaXBzKHBsYXllck9uZS5nYW1lYm9hcmQpO1xuICAgICAgICBjb25zdCBzaGlwUGxhY2VtZW50R3JpZFJlcGxhY2VtZW50VHdvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudFR3by5jbGFzc0xpc3QuYWRkKFwic2hpcC1wbGFjZW1lbnQtZ3JpZFwiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgaWYgKHBsYXllck9uZS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHBsYXllck9uZS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgICAgICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBpKTtcbiAgICAgICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgICAgICBzaGlwUGxhY2VtZW50R3JpZFJlcGxhY2VtZW50VHdvLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5yZXBsYWNlQ2hpbGQoXG4gICAgICAgICAgc2hpcFBsYWNlbWVudEdyaWRSZXBsYWNlbWVudFR3byxcbiAgICAgICAgICBzaGlwUGxhY2VtZW50R3JpZFJlcGxhY2VtZW50T25lXG4gICAgICAgICk7XG4gICAgICAgIHNoaXBQbGFjZW1lbnRHcmlkUmVwbGFjZW1lbnRPbmUgPSBzaGlwUGxhY2VtZW50R3JpZFJlcGxhY2VtZW50VHdvO1xuICAgICAgfSk7XG4gICAgICBzaGlwUGxhY2VtZW50QnV0dG9uc0NvbnRhaW5lci5yZXBsYWNlQ2hpbGQoXG4gICAgICAgIHNoaXBQbGFjZW1lbnRSYW5kb21CdXR0b25DbG9uZSxcbiAgICAgICAgc2hpcFBsYWNlbWVudFJhbmRvbUJ1dHRvblxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZW1lbnREb25lQnV0dG9uQ2xvbmUgPVxuICAgICAgICBzaGlwUGxhY2VtZW50RG9uZUJ1dHRvbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICBzaGlwUGxhY2VtZW50RG9uZUJ1dHRvbkNsb25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHR3b1BsYXllckdhbWUocGxheWVyT25lTmFtZSwgcGxheWVyT25lLCBwbGF5ZXJUd29OYW1lLCBwbGF5ZXIpO1xuICAgICAgfSk7XG4gICAgICBzaGlwUGxhY2VtZW50QnV0dG9uc0NvbnRhaW5lci5yZXBsYWNlQ2hpbGQoXG4gICAgICAgIHNoaXBQbGFjZW1lbnREb25lQnV0dG9uQ2xvbmUsXG4gICAgICAgIHNoaXBQbGFjZW1lbnREb25lQnV0dG9uXG4gICAgICApO1xuICAgICAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwUGxhY2VtZW50QnV0dG9uc0NvbnRhaW5lcik7XG4gICAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBQbGFjZW1lbnRDb250YWluZXIpO1xuICAgIH1cbiAgfSk7XG4gIHNoaXBQbGFjZW1lbnRCdXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBQbGFjZW1lbnREb25lQnV0dG9uKTtcbiAgc2hpcFBsYWNlbWVudENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwUGxhY2VtZW50QnV0dG9uc0NvbnRhaW5lcik7XG4gIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcFBsYWNlbWVudENvbnRhaW5lcik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwUGxhY2VtZW50O1xuIiwiY29uc3QgY3JlYXRlU2hpcCA9IChzaGlwTGVuZ3RoKSA9PiAoe1xuICBsZW5ndGg6IHNoaXBMZW5ndGgsXG4gIGhpdHM6IDAsXG4gIHN1bms6IGZhbHNlLFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIGlmICh0aGlzLmlzU3VuaygpID09PSB0cnVlKSB0aGlzLnN1bmsgPSB0cnVlO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXA7XG4iLCJpbXBvcnQgZXhwbG9zaW9uU2Z4U3JjIGZyb20gXCIuL3NmeC9FeHBsb3Npb24ud2VibVwiO1xuaW1wb3J0IHdhdGVyRHJvcFNmeFNyYyBmcm9tIFwiLi9zZngvV2F0ZXItRHJvcC53ZWJtXCI7XG5pbXBvcnQgdmljdG9yeVNmeFNyYyBmcm9tIFwiLi9zZngvVmljdG9yeS53ZWJtXCI7XG5cbmNvbnN0IHR3b1BsYXllckdhbWUgPSAocGxheWVyT25lTmFtZSwgcGxheWVyT25lLCBwbGF5ZXJUd29OYW1lLCBwbGF5ZXJUd28pID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgcGxheWVyT25lT3JpZ2luYWxHYW1lYm9hcmQgPSBwbGF5ZXJPbmUuZ2FtZWJvYXJkLmdhbWVib2FyZC5zbGljZSgwKTtcbiAgY29uc3QgcGxheWVyVHdvT3JpZ2luYWxHYW1lYm9hcmQgPSBwbGF5ZXJUd28uZ2FtZWJvYXJkLmdhbWVib2FyZC5zbGljZSgwKTtcblxuICBjb25zdCBnYW1lTG9vcCA9IChwbGF5ZXJPbmVUdXJuKSA9PiB7XG4gICAgbGV0IHlvdTtcbiAgICBsZXQgeW91ck5hbWU7XG4gICAgbGV0IHlvdXJPcmlnaW5hbEdhbWVib2FyZDtcbiAgICBsZXQgZW5lbXk7XG4gICAgaWYgKHBsYXllck9uZVR1cm4pIHtcbiAgICAgIHlvdSA9IHBsYXllck9uZTtcbiAgICAgIHlvdXJOYW1lID0gcGxheWVyT25lTmFtZTtcbiAgICAgIHlvdXJPcmlnaW5hbEdhbWVib2FyZCA9IHBsYXllck9uZU9yaWdpbmFsR2FtZWJvYXJkO1xuICAgICAgZW5lbXkgPSBwbGF5ZXJUd287XG4gICAgfSBlbHNlIHtcbiAgICAgIHlvdSA9IHBsYXllclR3bztcbiAgICAgIHlvdXJOYW1lID0gcGxheWVyVHdvTmFtZTtcbiAgICAgIHlvdXJPcmlnaW5hbEdhbWVib2FyZCA9IHBsYXllclR3b09yaWdpbmFsR2FtZWJvYXJkO1xuICAgICAgZW5lbXkgPSBwbGF5ZXJPbmU7XG4gICAgfVxuXG4gICAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1pc3NMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29uc3QgaGl0TGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG1pc3NMZWdlbmQudGV4dENvbnRlbnQgPSBcIi86IE1JU1NcIjtcbiAgICBoaXRMZWdlbmQudGV4dENvbnRlbnQgPSBcIlg6IEhJVFwiO1xuICAgIG1pc3NMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGhpdExlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgbGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmRcIik7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKG1pc3NMZWdlbmQpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChoaXRMZWdlbmQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgICBjb25zdCBnYW1lR3JpZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW5lbXlHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRTdW5rKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKGNvbnN0IHNoaXAgaW4gZW5lbXkuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmlzU3VuaygpKSB7XG4gICAgICAgIGNvbnN0IHN1bmtlblNoaXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7c2hpcH0gU1VOSyFgO1xuICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICBlbmVteUdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgeW91ckdyaWRTdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB5b3VyR3JpZFN1bmsuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtc3Vua1wiKTtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZFN1bmspO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3Qgc2hpcCBpbiB5b3UuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICBpZiAoeW91LmdhbWVib2FyZC5zaGlwc1tzaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke3NoaXB9IFNVTkshYDtcbiAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgeW91ckdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgICBzcXVhcmUuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSA9PT0gXCJIaXRcIikge1xuICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgIH1cbiAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldID09PSBcIk1pc3NcIikge1xuICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICB9XG4gICAgICBpZiAoc3F1YXJlLnRleHRDb250ZW50ID09PSBcIlwiKSB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJsb2NrQ2xpY2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBibG9ja0NsaWNrc0Rpdi5jbGFzc0xpc3QuYWRkKFwiYmxvY2stY2xpY2tzLWRpdlwiKTtcbiAgICAgICAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrQ2xpY2tzRGl2KTtcbiAgICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSB5b3UuYXR0YWNrKGVuZW15LmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXSA9PT0gXCJIaXRcIikge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGV4cGxvc2lvblNmeCA9IG5ldyBBdWRpbyhleHBsb3Npb25TZnhTcmMpO1xuICAgICAgICAgICAgICBleHBsb3Npb25TZngucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke2F0dGFja1Jlc3VsdFsyXX0gU1VOSyFgO1xuICAgICAgICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICAgICAgICBlbmVteUdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5lclBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3B1cC50ZXh0Q29udGVudCA9IGAke3lvdXJOYW1lfSBXSU5TIWA7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAuY2xhc3NMaXN0LmFkZChcIndpbm5lci1wb3B1cFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCQVRUTEUgQUdBSU4/XCI7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzdGFydC1idXR0b25cIik7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh3aW5uZXJQb3B1cCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgICAgICB2aWN0b3J5U2Z4LnBsYXkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgICAgY29uc3Qgd2F0ZXJEcm9wU2Z4ID0gbmV3IEF1ZGlvKHdhdGVyRHJvcFNmeFNyYyk7XG4gICAgICAgICAgICB3YXRlckRyb3BTZngucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkXCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlbmVteUdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkVORU1ZIEdSSURcIjtcbiAgICBlbmVteUdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtaGVhZGVyXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRIZWFkZXIpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHJldHVybjtcbiAgICAgICAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChsZWdlbmQpO1xuICAgICAgICBjb25zdCBwYXNzRGV2aWNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGFzc0RldmljZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicGFzcy1kZXZpY2UtY29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCBwYXNzRGV2aWNlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBwYXNzRGV2aWNlSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYXNzLWRldmljZS1oZWFkZXJcIik7XG4gICAgICAgIHBhc3NEZXZpY2VIZWFkZXIudGV4dENvbnRlbnQgPSBcIlBBU1MgREVWSUNFXCI7XG4gICAgICAgIGNvbnN0IHBhc3NEZXZpY2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBwYXNzRGV2aWNlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwYXNzLWRldmljZS1idXR0b25cIik7XG4gICAgICAgIHBhc3NEZXZpY2VCdXR0b24udGV4dENvbnRlbnQgPSBcIkRPTkVcIjtcbiAgICAgICAgcGFzc0RldmljZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzRGV2aWNlSGVhZGVyKTtcbiAgICAgICAgcGFzc0RldmljZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzRGV2aWNlQnV0dG9uKTtcbiAgICAgICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzRGV2aWNlQ29udGFpbmVyKTtcblxuICAgICAgICBwYXNzRGV2aWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgaWYgKHBsYXllck9uZVR1cm4pIHBsYXllck9uZVR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICBlbHNlIHBsYXllck9uZVR1cm4gPSB0cnVlO1xuICAgICAgICAgIGdhbWVMb29wKHBsYXllck9uZVR1cm4pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIDE1MDApO1xuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbmVteUdyaWQsIGNvbmZpZyk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lLWdyaWRzLWNvbnRhaW5lclwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKHlvdXJPcmlnaW5hbEdhbWVib2FyZFtpXSAhPT0gXCJcIikge1xuICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdXJPcmlnaW5hbEdhbWVib2FyZFtpXTtcbiAgICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChzaGlwU3F1YXJlWzFdKTtcbiAgICAgIH0gZWxzZSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSA9PT0gXCJIaXRcIikge1xuICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgIH1cbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSA9PT0gXCJNaXNzXCIpIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgeW91ckdyaWQuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZFwiKTtcbiAgICBjb25zdCB5b3VyR3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB5b3VyR3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiWU9VUiBHUklEXCI7XG4gICAgeW91ckdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZC1oZWFkZXJcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRIZWFkZXIpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh5b3VyR3JpZCk7XG4gICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lR3JpZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllck9uZVR1cm4gPSB0cnVlO1xuICBnYW1lTG9vcChwbGF5ZXJPbmVUdXJuKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHR3b1BsYXllckdhbWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHNoaXBQbGFjZW1lbnQgZnJvbSBcIi4vc2hpcC1wbGFjZW1lbnRcIjtcblxuY29uc3QgYWlTZWxlY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci10d28tc2VsZWN0LWFpLWJ1dHRvblwiKTtcbmxldCBhaVBsYXllciA9IGZhbHNlO1xuXG5haVNlbGVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAoIWFpUGxheWVyKSB7XG4gICAgYWlQbGF5ZXIgPSB0cnVlO1xuICAgIGFpU2VsZWN0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGF5ZXItdHdvLXNlbGVjdC1haS1idXR0b24taW5hY3RpdmVcIik7XG4gICAgYWlTZWxlY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInBsYXllci10d28tc2VsZWN0LWFpLWJ1dHRvbi1hY3RpdmVcIik7XG4gIH0gZWxzZSB7XG4gICAgYWlQbGF5ZXIgPSBmYWxzZTtcbiAgICBhaVNlbGVjdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwicGxheWVyLXR3by1zZWxlY3QtYWktYnV0dG9uLWFjdGl2ZVwiKTtcbiAgICBhaVNlbGVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXR3by1zZWxlY3QtYWktYnV0dG9uLWluYWN0aXZlXCIpO1xuICB9XG59KTtcblxuY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXN0YXJ0LWJ1dHRvblwiKTtcblxuZ2FtZVN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHNoaXBQbGFjZW1lbnQoYWlQbGF5ZXIpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=