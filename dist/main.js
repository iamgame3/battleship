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






const aiGame = () => {
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
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
  const enemy = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createAI)();
  (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_1__["default"])(enemy.gameboard);
  const enemyGridSunk = document.createElement("div");
  enemyGridSunk.classList.add("enemy-grid-sunk");
  enemyGrid.appendChild(enemyGridSunk);
  const yourGrid = document.createElement("div");
  const you = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
  (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_1__["default"])(you.gameboard);
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
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _random_ship_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random-ship-gen */ "./src/random-ship-gen.js");
/* harmony import */ var _sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sfx/Explosion.webm */ "./src/sfx/Explosion.webm");
/* harmony import */ var _sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sfx/Water-Drop.webm */ "./src/sfx/Water-Drop.webm");
/* harmony import */ var _sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sfx/Victory.webm */ "./src/sfx/Victory.webm");






const twoPlayerGame = () => {
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
  let playerOneName = document.getElementById("player-one").value;
  if (playerOneName === "") playerOneName = "PLAYER 1";
  let playerTwoName = document.getElementById("player-two").value;
  if (playerTwoName === "") playerTwoName = "PLAYER 2";
  const playerOne = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
  (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_1__["default"])(playerOne.gameboard);
  const playerOneOriginalGameboard = playerOne.gameboard.gameboard.slice(0);
  const playerTwo = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
  (0,_random_ship_gen__WEBPACK_IMPORTED_MODULE_1__["default"])(playerTwo.gameboard);
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
/* harmony import */ var _ai_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai-game */ "./src/ai-game.js");
/* harmony import */ var _two_player_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./two-player-game */ "./src/two-player-game.js");



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
  if (aiPlayer) (0,_ai_game__WEBPACK_IMPORTED_MODULE_0__["default"])();
  else (0,_two_player_game__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsZUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGL0I7QUFDMEM7O0FBRTFDO0FBQ0EsYUFBYSxzREFBZTtBQUM1QjtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQSxhQUFhLHNEQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQSxnQkFBZ0Isb0RBQU07QUFDdEIsT0FBTyw0REFBYTtBQUNwQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9haS1nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3JhbmRvbS1zaGlwLWdlbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy90d28tcGxheWVyLWdhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVBSSB9IGZyb20gXCIuL3BsYXllcnNcIjtcbmltcG9ydCByYW5kb21TaGlwcyBmcm9tIFwiLi9yYW5kb20tc2hpcC1nZW5cIjtcbmltcG9ydCBleHBsb3Npb25TZnhTcmMgZnJvbSBcIi4vc2Z4L0V4cGxvc2lvbi53ZWJtXCI7XG5pbXBvcnQgd2F0ZXJEcm9wU2Z4U3JjIGZyb20gXCIuL3NmeC9XYXRlci1Ecm9wLndlYm1cIjtcbmltcG9ydCB2aWN0b3J5U2Z4U3JjIGZyb20gXCIuL3NmeC9WaWN0b3J5LndlYm1cIjtcblxuY29uc3QgYWlHYW1lID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuICBsZXQgeW91ck5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmVcIikudmFsdWU7XG4gIGlmICh5b3VyTmFtZSA9PT0gXCJcIikgeW91ck5hbWUgPSBcIlBMQVlFUiAxXCI7XG4gIHBhZ2VDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1pc3NMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGNvbnN0IGhpdExlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgbWlzc0xlZ2VuZC50ZXh0Q29udGVudCA9IFwiLzogTUlTU1wiO1xuICBoaXRMZWdlbmQudGV4dENvbnRlbnQgPSBcIlg6IEhJVFwiO1xuICBtaXNzTGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgaGl0TGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgbGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmRcIik7XG4gIGxlZ2VuZC5hcHBlbmRDaGlsZChtaXNzTGVnZW5kKTtcbiAgbGVnZW5kLmFwcGVuZENoaWxkKGhpdExlZ2VuZCk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgY29uc3QgZ2FtZUdyaWRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZW5lbXkgPSBjcmVhdGVBSSgpO1xuICByYW5kb21TaGlwcyhlbmVteS5nYW1lYm9hcmQpO1xuICBjb25zdCBlbmVteUdyaWRTdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZW5lbXlHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkU3Vuayk7XG4gIGNvbnN0IHlvdXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgeW91ID0gY3JlYXRlUGxheWVyKCk7XG4gIHJhbmRvbVNoaXBzKHlvdS5nYW1lYm9hcmQpO1xuICBjb25zdCB5b3VyR3JpZFN1bmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB5b3VyR3JpZFN1bmsuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtc3Vua1wiKTtcbiAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRTdW5rKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgIHNxdWFyZS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgIHNxdWFyZS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgICgpID0+IHtcbiAgICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0geW91LmF0dGFjayhlbmVteS5nYW1lYm9hcmQsIGkpO1xuICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdID09PSBcIkhpdFwiKSB7XG4gICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvc2lvblNmeCA9IG5ldyBBdWRpbyhleHBsb3Npb25TZnhTcmMpO1xuICAgICAgICAgICAgZXhwbG9zaW9uU2Z4LnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3Vua2VuU2hpcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7YXR0YWNrUmVzdWx0WzJdfSBTVU5LIWA7XG4gICAgICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICAgICAgZW5lbXlHcmlkU3Vuay5hcHBlbmRDaGlsZChzdW5rZW5TaGlwRE9NKTtcbiAgICAgICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdpbm5lclBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgd2lubmVyUG9wdXAudGV4dENvbnRlbnQgPSBgJHt5b3VyTmFtZX0gV0lOUyFgO1xuICAgICAgICAgICAgICB3aW5uZXJQb3B1cC5jbGFzc0xpc3QuYWRkKFwid2lubmVyLXBvcHVwXCIpO1xuICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQkFUVExFIEFHQUlOP1wiO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICAgICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHdpbm5lclBvcHVwKTtcbiAgICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgICAgdmljdG9yeVNmeC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9IFwiZ3JheVwiO1xuICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgIGNvbnN0IHdhdGVyRHJvcFNmeCA9IG5ldyBBdWRpbyh3YXRlckRyb3BTZnhTcmMpO1xuICAgICAgICAgIHdhdGVyRHJvcFNmeC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7IG9uY2U6IHRydWUgfVxuICAgICk7XG4gICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cbiAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkXCIpO1xuICBjb25zdCBlbmVteUdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGVuZW15R3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiRU5FTVkgR1JJRFwiO1xuICBlbmVteUdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtaGVhZGVyXCIpO1xuICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkSGVhZGVyKTtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICB9O1xuICBsZXQgbGFzdEF0dGFja0luZGV4O1xuICBjb25zdCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSByZXR1cm47XG4gICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteS5hdHRhY2soeW91LmdhbWVib2FyZCwgbGFzdEF0dGFja0luZGV4KTtcbiAgICAgIGNvbnN0IGF0dGFja2VkU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLWlkPScke2F0dGFja1Jlc3VsdFsxXX0nXWBcbiAgICAgICk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIGxhc3RBdHRhY2tJbmRleCA9IGF0dGFja1Jlc3VsdFsxXTtcbiAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgYXR0YWNrZWRTcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICBhdHRhY2tlZFNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICBpZiAoeW91LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29uc3QgZXhwbG9zaW9uU2Z4ID0gbmV3IEF1ZGlvKGV4cGxvc2lvblNmeFNyYyk7XG4gICAgICAgICAgZXhwbG9zaW9uU2Z4LnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3Qgc3Vua2VuU2hpcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke2F0dGFja1Jlc3VsdFswXVsyXX0gU1VOSyFgO1xuICAgICAgICAgIHN1bmtlblNoaXBET00uY2xhc3NMaXN0LmFkZChcInN1bmtlbi1zaGlwLXRleHRcIik7XG4gICAgICAgICAgeW91ckdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qgd2lubmVyUG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgd2lubmVyUG9wdXAudGV4dENvbnRlbnQgPSBcIkFJIFdJTlMhXCI7XG4gICAgICAgICAgICB3aW5uZXJQb3B1cC5jbGFzc0xpc3QuYWRkKFwid2lubmVyLXBvcHVwXCIpO1xuICAgICAgICAgICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCQVRUTEUgQUdBSU4/XCI7XG4gICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2lubmVyUG9wdXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHdpbm5lclBvcHVwKTtcbiAgICAgICAgICAgIGNvbnN0IHZpY3RvcnlTZnggPSBuZXcgQXVkaW8odmljdG9yeVNmeFNyYyk7XG4gICAgICAgICAgICB2aWN0b3J5U2Z4LnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgIGF0dGFja2VkU3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICAgIGNvbnN0IHdhdGVyRHJvcFNmeCA9IG5ldyBBdWRpbyh3YXRlckRyb3BTZnhTcmMpO1xuICAgICAgICB3YXRlckRyb3BTZngucGxheSgpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9O1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbmVteUdyaWQsIGNvbmZpZyk7XG4gIGdhbWVHcmlkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1ncmlkcy1jb250YWluZXJcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSkge1xuICAgICAgbGV0IHNoaXBTcXVhcmUgPSB5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXTtcbiAgICAgIHNoaXBTcXVhcmUgPSBzaGlwU3F1YXJlLnNwbGl0KFwiIFwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHNoaXBTcXVhcmVbMV0pO1xuICAgIH0gZWxzZSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaSk7XG4gICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCI0MHB4XCI7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuICB5b3VyR3JpZC5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkXCIpO1xuICBjb25zdCB5b3VyR3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgeW91ckdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIllPVVIgR1JJRFwiO1xuICB5b3VyR3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkLWhlYWRlclwiKTtcbiAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRIZWFkZXIpO1xuICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHlvdXJHcmlkKTtcbiAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lR3JpZHNDb250YWluZXIpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYWlHYW1lO1xuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHRlbXBQb3NpdGlvbnMgPSBbXTtcbiAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGogKz0gMSkge1xuICAgICAgdGVtcFBvc2l0aW9ucy5wdXNoKGAke2xldHRlcnNbaV19JHtqfWApO1xuICAgIH1cbiAgfVxuICBjb25zdCB0ZW1wR2FtZWJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICB0ZW1wR2FtZWJvYXJkLnB1c2goXCJcIik7XG4gIH1cbiAgY29uc3QgdGVtcEdhbWVib2FyZFR3byA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgdGVtcEdhbWVib2FyZFR3by5wdXNoKFwiXCIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcG9zaXRpb25zOiB0ZW1wUG9zaXRpb25zLFxuICAgIGdhbWVib2FyZDogdGVtcEdhbWVib2FyZCxcbiAgICBzaGlwUG9zaXRpb25zOiB0ZW1wR2FtZWJvYXJkVHdvLFxuICAgIHNoaXBzOiB7fSxcbiAgICBzdWJFeGlzdHM6IGZhbHNlLFxuICAgIHBsYWNlU2hpcChzdGFydCwgZW5kKSB7XG4gICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihzdGFydCk7XG4gICAgICBjb25zdCBlbmRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2YoZW5kKTtcbiAgICAgIGxldCBzaGlwSW5mbztcbiAgICAgIGlmICgoZW5kSW5kZXggLSBzdGFydEluZGV4KSAlIDEwID09PSAwKVxuICAgICAgICBzaGlwSW5mbyA9IFsoZW5kSW5kZXggLSBzdGFydEluZGV4KSAvIDEwICsgMSwgXCJ2ZXJ0XCJdO1xuICAgICAgZWxzZSBzaGlwSW5mbyA9IFtlbmRJbmRleCAtIHN0YXJ0SW5kZXggKyAxLCBcImhvclwiXTtcbiAgICAgIGxldCBzaGlwTmFtZTtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNSkgc2hpcE5hbWUgPSBcIkFpcmNyYWZ0LUNhcnJpZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNCkgc2hpcE5hbWUgPSBcIkJhdHRsZXNoaXBcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMykge1xuICAgICAgICBpZiAodGhpcy5zdWJFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5zdWJFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgIHNoaXBOYW1lID0gXCJTdWJtYXJpbmVcIjtcbiAgICAgICAgfSBlbHNlIHNoaXBOYW1lID0gXCJDcnVpc2VyXCI7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDIpIHNoaXBOYW1lID0gXCJEZXN0cm95ZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1sxXSA9PT0gXCJob3JcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxKSB7XG4gICAgICAgICAgdGhpcy5zaGlwUG9zaXRpb25zW2ldID0gc2hpcE5hbWU7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtbGVmdC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXJpZ2h0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEwKSB7XG4gICAgICAgICAgdGhpcy5zaGlwUG9zaXRpb25zW2ldID0gc2hpcE5hbWU7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtdG9wLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtYm90dG9tLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zaGlwc1tzaGlwTmFtZV0gPSBjcmVhdGVTaGlwKHNoaXBJbmZvWzBdKTtcbiAgICAgIHJldHVybiB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZWJvYXJkSW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0pIHtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdGhpcy5zaGlwc1thdHRhY2tlZFNoaXBbMF1dLmhpdCgpO1xuICAgICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIkhpdFwiO1xuICAgICAgICBjb25zdCBpc1N1bmsgPSB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaXNTdW5rKCk7XG4gICAgICAgIHJldHVybiBbXCJIaXRcIiwgaXNTdW5rLCBhdHRhY2tlZFNoaXBbMF1dO1xuICAgICAgfVxuICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJNaXNzXCI7XG4gICAgICByZXR1cm4gW1wiTWlzc1wiLCBmYWxzZV07XG4gICAgfSxcbiAgICBhbGxTdW5rKCkge1xuICAgICAgbGV0IGFsbFN1bmsgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXRoaXMuc2hpcHNbc2hpcF0uc3VuaykgYWxsU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbFN1bms7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVib2FyZDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnN0YW50LWNvbmRpdGlvbiAqL1xuaW1wb3J0IGNyZWF0ZUdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgY3JlYXRlUGxheWVyID0gKCkgPT4gKHtcbiAgZ2FtZWJvYXJkOiBjcmVhdGVHYW1lYm9hcmQoKSxcbiAgYXR0YWNrKGVuZW15R2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgICByZXR1cm4gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZUFJID0gKCkgPT4gKHtcbiAgZ2FtZWJvYXJkOiBjcmVhdGVHYW1lYm9hcmQoKSxcbiAgYXR0YWNrKGVuZW15R2FtZWJvYXJkLCBsYXN0QXR0YWNrSW5kZXgpIHtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmQ7XG4gICAgY29uc3QgcmFuZG9tQXR0YWNrID0gKCkgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOTkpO1xuICAgICAgICBjb25zdCBwb3NzaWJsZUF0dGFjayA9IHBvc2l0aW9uc1tyYW5kb21OdW1iZXJdO1xuICAgICAgICBpZiAocG9zc2libGVBdHRhY2sgIT09IFwiSGl0XCIgJiYgcG9zc2libGVBdHRhY2sgIT09IFwiTWlzc1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbU51bWJlciksIHJhbmRvbU51bWJlcl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChsYXN0QXR0YWNrSW5kZXggPT09IHVuZGVmaW5lZCkgcmV0dXJuIHJhbmRvbUF0dGFjaygpO1xuICAgIGNvbnN0IHByZWRpY3RTaGlwTG9jYXRpb24gPSAobEF0dGFja0luZGV4KSA9PiB7XG4gICAgICBjb25zdCBzcXVhcmVBYm92ZSA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxMF07XG4gICAgICBjb25zdCBzcXVhcmVCZWxvdyA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF07XG4gICAgICBsZXQgc3F1YXJlTGVmdDtcbiAgICAgIGxldCBzcXVhcmVSaWdodDtcbiAgICAgIGlmIChsQXR0YWNrSW5kZXggJSAxMCAhPT0gMCkgc3F1YXJlTGVmdCA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxXTtcbiAgICAgIGlmIChsQXR0YWNrSW5kZXgudG9TdHJpbmcoKS5zdWJzdHJpbmdbMV0gIT09IFwiOVwiKVxuICAgICAgICBzcXVhcmVSaWdodCA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxXTtcbiAgICAgIGlmIChwb3NpdGlvbnNbbEF0dGFja0luZGV4XSA9PT0gXCJIaXRcIikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleF1cbiAgICAgICAgICBdLmlzU3VuaygpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcmFuZG9tQXR0YWNrKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlQWJvdmUgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVBYm92ZSA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDEwXVxuICAgICAgICAgIF0uaXNTdW5rKClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEwKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzcXVhcmVCZWxvdyA9PT0gdW5kZWZpbmVkIHx8IHNxdWFyZUJlbG93ID09PSBcIk1pc3NcIikgJiZcbiAgICAgICAgICBzcXVhcmVBYm92ZSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMTBdXG4gICAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMTApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZUxlZnQgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVMZWZ0ID09PSBcIk1pc3NcIikgJiZcbiAgICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV1cbiAgICAgICAgICBdLmlzU3VuaygpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzcXVhcmVSaWdodCA9PT0gdW5kZWZpbmVkIHx8IHNxdWFyZVJpZ2h0ID09PSBcIk1pc3NcIikgJiZcbiAgICAgICAgICBzcXVhcmVMZWZ0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxXVxuICAgICAgICAgIF0uaXNTdW5rKClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEpO1xuICAgICAgICBpZiAoc3F1YXJlQWJvdmUgJiYgc3F1YXJlQmVsb3cpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVBYm92ZSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQmVsb3cgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMTApLFxuICAgICAgICAgICAgICBsQXR0YWNrSW5kZXggKyAxMCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiSGl0XCJcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEwKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMTAsXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcXVhcmVMZWZ0ICYmIHNxdWFyZVJpZ2h0KSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMSksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZVJpZ2h0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgICAgc3F1YXJlTGVmdCAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMSksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCAtIDEsXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEwKSxcbiAgICAgICAgICAgIGxBdHRhY2tJbmRleCAtIDEwLFxuICAgICAgICAgIF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEpLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMSxcbiAgICAgICAgICBdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3F1YXJlUmlnaHQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxKSxcbiAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEsXG4gICAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMTApLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMTAsXG4gICAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQWJvdmUgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCAtIDIwXSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBsQXR0YWNrSW5kZXhDb3B5ID0gbEF0dGFja0luZGV4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGxBdHRhY2tJbmRleENvcHkgLT0gMTA7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkgKyAxMCk7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJNaXNzXCIpXG4gICAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXhDb3B5KTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSB1bmRlZmluZWQpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUxlZnQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCAtIDJdID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDFdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgICkge1xuICAgICAgICBsZXQgbEF0dGFja0luZGV4Q29weSA9IGxBdHRhY2tJbmRleDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBsQXR0YWNrSW5kZXhDb3B5IC09IDE7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkgKyAxKTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIk1pc3NcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IHVuZGVmaW5lZCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlUmlnaHQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCArIDJdID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDFdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgICkge1xuICAgICAgICBsZXQgbEF0dGFja0luZGV4Q29weSA9IGxBdHRhY2tJbmRleDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBsQXR0YWNrSW5kZXhDb3B5ICs9IDE7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkgLSAxKTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIk1pc3NcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IHVuZGVmaW5lZCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCArIDIwXSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBsQXR0YWNrSW5kZXhDb3B5ID0gbEF0dGFja0luZGV4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGxBdHRhY2tJbmRleENvcHkgKz0gMTA7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkgLSAxMCk7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJNaXNzXCIpXG4gICAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXhDb3B5KTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSB1bmRlZmluZWQpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUFib3ZlID09PSBcIkhpdFwiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggLSAyMF0gIT09IFwiTWlzc1wiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggLSAyMF0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggLSAxMCk7XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUxlZnQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCAtIDJdICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4IC0gMl0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEpO1xuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4ICsgMl0gIT09IFwiTWlzc1wiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggKyAyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDFdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4ICsgMSk7XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUJlbG93ID09PSBcIkhpdFwiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggKyAyMF0gIT09IFwiTWlzc1wiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggKyAyMF0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxMCk7XG4gICAgICByZXR1cm4gcmFuZG9tQXR0YWNrKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsYXN0QXR0YWNrSW5kZXgpO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllciwgY3JlYXRlQUkgfTtcbiIsImNvbnN0IHJhbmRvbVNoaXBzID0gKHBsYXllckdhbWVib2FyZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkgKz0gMSkge1xuICAgIGxldCBzaGlwTGVuZ3RoO1xuICAgIGlmIChpID09PSAwKSBzaGlwTGVuZ3RoID0gMTtcbiAgICBlbHNlIGlmIChpID09PSAxIHx8IGkgPT09IDIpIHNoaXBMZW5ndGggPSAyO1xuICAgIGVsc2UgaWYgKGkgPT09IDMpIHNoaXBMZW5ndGggPSAzO1xuICAgIGVsc2Ugc2hpcExlbmd0aCA9IDQ7XG4gICAgY29uc3QgcmFuZG9tU21hbGxOdW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xuICAgIGlmIChyYW5kb21TbWFsbE51bWJlciA8IDAuNSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tQmlnTnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOTkpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgTWF0aC5mbG9vcihyYW5kb21CaWdOdW1iZXIgLyAxMCkgPT09XG4gICAgICAgICAgICBNYXRoLmZsb29yKChyYW5kb21CaWdOdW1iZXIgKyBzaGlwTGVuZ3RoKSAvIDEwKSAmJlxuICAgICAgICAgIHJhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGggPCAxMDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgbGV0IHNwYWNlQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBMZW5ndGggKyAxOyBqICs9IDEpXG4gICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmdhbWVib2FyZFtyYW5kb21CaWdOdW1iZXIgKyBqXSAhPT0gXCJcIilcbiAgICAgICAgICAgICAgc3BhY2VBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoc3BhY2VBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wb3NpdGlvbnNbcmFuZG9tQmlnTnVtYmVyXSxcbiAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBvc2l0aW9uc1tyYW5kb21CaWdOdW1iZXIgKyBzaGlwTGVuZ3RoXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCByYW5kb21CaWdOdW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5OSk7XG4gICAgICAgIGlmIChyYW5kb21CaWdOdW1iZXIgKyBzaGlwTGVuZ3RoICogMTAgPCAxMDApIHtcbiAgICAgICAgICBsZXQgc3BhY2VBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgKHNoaXBMZW5ndGggKyAxKSAqIDEwOyBqICs9IDEwKVxuICAgICAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5nYW1lYm9hcmRbcmFuZG9tQmlnTnVtYmVyICsgal0gIT09IFwiXCIpXG4gICAgICAgICAgICAgIHNwYWNlQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHNwYWNlQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucG9zaXRpb25zW3JhbmRvbUJpZ051bWJlcl0sXG4gICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wb3NpdGlvbnNbcmFuZG9tQmlnTnVtYmVyICsgc2hpcExlbmd0aCAqIDEwXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcGxheWVyR2FtZWJvYXJkLmdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJhbmRvbVNoaXBzO1xuIiwiY29uc3QgY3JlYXRlU2hpcCA9IChzaGlwTGVuZ3RoKSA9PiAoe1xuICBsZW5ndGg6IHNoaXBMZW5ndGgsXG4gIGhpdHM6IDAsXG4gIHN1bms6IGZhbHNlLFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIGlmICh0aGlzLmlzU3VuaygpID09PSB0cnVlKSB0aGlzLnN1bmsgPSB0cnVlO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXA7XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5pbXBvcnQgcmFuZG9tU2hpcHMgZnJvbSBcIi4vcmFuZG9tLXNoaXAtZ2VuXCI7XG5pbXBvcnQgZXhwbG9zaW9uU2Z4U3JjIGZyb20gXCIuL3NmeC9FeHBsb3Npb24ud2VibVwiO1xuaW1wb3J0IHdhdGVyRHJvcFNmeFNyYyBmcm9tIFwiLi9zZngvV2F0ZXItRHJvcC53ZWJtXCI7XG5pbXBvcnQgdmljdG9yeVNmeFNyYyBmcm9tIFwiLi9zZngvVmljdG9yeS53ZWJtXCI7XG5cbmNvbnN0IHR3b1BsYXllckdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1jb250YWluZXJcIik7XG4gIGxldCBwbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lXCIpLnZhbHVlO1xuICBpZiAocGxheWVyT25lTmFtZSA9PT0gXCJcIikgcGxheWVyT25lTmFtZSA9IFwiUExBWUVSIDFcIjtcbiAgbGV0IHBsYXllclR3b05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d29cIikudmFsdWU7XG4gIGlmIChwbGF5ZXJUd29OYW1lID09PSBcIlwiKSBwbGF5ZXJUd29OYW1lID0gXCJQTEFZRVIgMlwiO1xuICBjb25zdCBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIoKTtcbiAgcmFuZG9tU2hpcHMocGxheWVyT25lLmdhbWVib2FyZCk7XG4gIGNvbnN0IHBsYXllck9uZU9yaWdpbmFsR2FtZWJvYXJkID0gcGxheWVyT25lLmdhbWVib2FyZC5nYW1lYm9hcmQuc2xpY2UoMCk7XG4gIGNvbnN0IHBsYXllclR3byA9IGNyZWF0ZVBsYXllcigpO1xuICByYW5kb21TaGlwcyhwbGF5ZXJUd28uZ2FtZWJvYXJkKTtcbiAgY29uc3QgcGxheWVyVHdvT3JpZ2luYWxHYW1lYm9hcmQgPSBwbGF5ZXJUd28uZ2FtZWJvYXJkLmdhbWVib2FyZC5zbGljZSgwKTtcblxuICBjb25zdCBnYW1lTG9vcCA9IChwbGF5ZXJPbmVUdXJuKSA9PiB7XG4gICAgbGV0IHlvdTtcbiAgICBsZXQgeW91ck5hbWU7XG4gICAgbGV0IHlvdXJPcmlnaW5hbEdhbWVib2FyZDtcbiAgICBsZXQgZW5lbXk7XG4gICAgaWYgKHBsYXllck9uZVR1cm4pIHtcbiAgICAgIHlvdSA9IHBsYXllck9uZTtcbiAgICAgIHlvdXJOYW1lID0gcGxheWVyT25lTmFtZTtcbiAgICAgIHlvdXJPcmlnaW5hbEdhbWVib2FyZCA9IHBsYXllck9uZU9yaWdpbmFsR2FtZWJvYXJkO1xuICAgICAgZW5lbXkgPSBwbGF5ZXJUd287XG4gICAgfSBlbHNlIHtcbiAgICAgIHlvdSA9IHBsYXllclR3bztcbiAgICAgIHlvdXJOYW1lID0gcGxheWVyVHdvTmFtZTtcbiAgICAgIHlvdXJPcmlnaW5hbEdhbWVib2FyZCA9IHBsYXllclR3b09yaWdpbmFsR2FtZWJvYXJkO1xuICAgICAgZW5lbXkgPSBwbGF5ZXJPbmU7XG4gICAgfVxuXG4gICAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1pc3NMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29uc3QgaGl0TGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG1pc3NMZWdlbmQudGV4dENvbnRlbnQgPSBcIi86IE1JU1NcIjtcbiAgICBoaXRMZWdlbmQudGV4dENvbnRlbnQgPSBcIlg6IEhJVFwiO1xuICAgIG1pc3NMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGhpdExlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgbGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmRcIik7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKG1pc3NMZWdlbmQpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChoaXRMZWdlbmQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgICBjb25zdCBnYW1lR3JpZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW5lbXlHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRTdW5rKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKGNvbnN0IHNoaXAgaW4gZW5lbXkuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLnNoaXBzW3NoaXBdLmlzU3VuaygpKSB7XG4gICAgICAgIGNvbnN0IHN1bmtlblNoaXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7c2hpcH0gU1VOSyFgO1xuICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICBlbmVteUdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgeW91ckdyaWRTdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB5b3VyR3JpZFN1bmsuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtc3Vua1wiKTtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZFN1bmspO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3Qgc2hpcCBpbiB5b3UuZ2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICBpZiAoeW91LmdhbWVib2FyZC5zaGlwc1tzaGlwXS5pc1N1bmsoKSkge1xuICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke3NoaXB9IFNVTkshYDtcbiAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgeW91ckdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgICBzcXVhcmUuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSA9PT0gXCJIaXRcIikge1xuICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgIH1cbiAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldID09PSBcIk1pc3NcIikge1xuICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICB9XG4gICAgICBpZiAoc3F1YXJlLnRleHRDb250ZW50ID09PSBcIlwiKSB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJsb2NrQ2xpY2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBibG9ja0NsaWNrc0Rpdi5jbGFzc0xpc3QuYWRkKFwiYmxvY2stY2xpY2tzLWRpdlwiKTtcbiAgICAgICAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrQ2xpY2tzRGl2KTtcbiAgICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSB5b3UuYXR0YWNrKGVuZW15LmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXSA9PT0gXCJIaXRcIikge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGV4cGxvc2lvblNmeCA9IG5ldyBBdWRpbyhleHBsb3Npb25TZnhTcmMpO1xuICAgICAgICAgICAgICBleHBsb3Npb25TZngucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke2F0dGFja1Jlc3VsdFsyXX0gU1VOSyFgO1xuICAgICAgICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICAgICAgICBlbmVteUdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5lclBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3B1cC50ZXh0Q29udGVudCA9IGAke3lvdXJOYW1lfSBXSU5TIWA7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAuY2xhc3NMaXN0LmFkZChcIndpbm5lci1wb3B1cFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCQVRUTEUgQUdBSU4/XCI7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzdGFydC1idXR0b25cIik7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh3aW5uZXJQb3B1cCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgICAgICB2aWN0b3J5U2Z4LnBsYXkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgICAgY29uc3Qgd2F0ZXJEcm9wU2Z4ID0gbmV3IEF1ZGlvKHdhdGVyRHJvcFNmeFNyYyk7XG4gICAgICAgICAgICB3YXRlckRyb3BTZngucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkXCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlbmVteUdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkVORU1ZIEdSSURcIjtcbiAgICBlbmVteUdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtaGVhZGVyXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRIZWFkZXIpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHJldHVybjtcbiAgICAgICAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChsZWdlbmQpO1xuICAgICAgICBjb25zdCBwYXNzRGV2aWNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGFzc0RldmljZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicGFzcy1kZXZpY2UtY29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCBwYXNzRGV2aWNlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBwYXNzRGV2aWNlSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYXNzLWRldmljZS1oZWFkZXJcIik7XG4gICAgICAgIHBhc3NEZXZpY2VIZWFkZXIudGV4dENvbnRlbnQgPSBcIlBBU1MgREVWSUNFXCI7XG4gICAgICAgIGNvbnN0IHBhc3NEZXZpY2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBwYXNzRGV2aWNlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwYXNzLWRldmljZS1idXR0b25cIik7XG4gICAgICAgIHBhc3NEZXZpY2VCdXR0b24udGV4dENvbnRlbnQgPSBcIkRPTkVcIjtcbiAgICAgICAgcGFzc0RldmljZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzRGV2aWNlSGVhZGVyKTtcbiAgICAgICAgcGFzc0RldmljZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzRGV2aWNlQnV0dG9uKTtcbiAgICAgICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXNzRGV2aWNlQ29udGFpbmVyKTtcblxuICAgICAgICBwYXNzRGV2aWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgaWYgKHBsYXllck9uZVR1cm4pIHBsYXllck9uZVR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICBlbHNlIHBsYXllck9uZVR1cm4gPSB0cnVlO1xuICAgICAgICAgIGdhbWVMb29wKHBsYXllck9uZVR1cm4pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIDE1MDApO1xuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbmVteUdyaWQsIGNvbmZpZyk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lLWdyaWRzLWNvbnRhaW5lclwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKHlvdXJPcmlnaW5hbEdhbWVib2FyZFtpXSAhPT0gXCJcIikge1xuICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdXJPcmlnaW5hbEdhbWVib2FyZFtpXTtcbiAgICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChzaGlwU3F1YXJlWzFdKTtcbiAgICAgIH0gZWxzZSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSA9PT0gXCJIaXRcIikge1xuICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgIH1cbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSA9PT0gXCJNaXNzXCIpIHtcbiAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgfVxuICAgICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgeW91ckdyaWQuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZFwiKTtcbiAgICBjb25zdCB5b3VyR3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB5b3VyR3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiWU9VUiBHUklEXCI7XG4gICAgeW91ckdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZC1oZWFkZXJcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRIZWFkZXIpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh5b3VyR3JpZCk7XG4gICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lR3JpZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllck9uZVR1cm4gPSB0cnVlO1xuICBnYW1lTG9vcChwbGF5ZXJPbmVUdXJuKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHR3b1BsYXllckdhbWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IGFpR2FtZSBmcm9tIFwiLi9haS1nYW1lXCI7XG5pbXBvcnQgdHdvUGxheWVyR2FtZSBmcm9tIFwiLi90d28tcGxheWVyLWdhbWVcIjtcblxuY29uc3QgYWlTZWxlY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci10d28tc2VsZWN0LWFpLWJ1dHRvblwiKTtcbmxldCBhaVBsYXllciA9IGZhbHNlO1xuXG5haVNlbGVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAoIWFpUGxheWVyKSB7XG4gICAgYWlQbGF5ZXIgPSB0cnVlO1xuICAgIGFpU2VsZWN0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGF5ZXItdHdvLXNlbGVjdC1haS1idXR0b24taW5hY3RpdmVcIik7XG4gICAgYWlTZWxlY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInBsYXllci10d28tc2VsZWN0LWFpLWJ1dHRvbi1hY3RpdmVcIik7XG4gIH0gZWxzZSB7XG4gICAgYWlQbGF5ZXIgPSBmYWxzZTtcbiAgICBhaVNlbGVjdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwicGxheWVyLXR3by1zZWxlY3QtYWktYnV0dG9uLWFjdGl2ZVwiKTtcbiAgICBhaVNlbGVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicGxheWVyLXR3by1zZWxlY3QtYWktYnV0dG9uLWluYWN0aXZlXCIpO1xuICB9XG59KTtcblxuY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXN0YXJ0LWJ1dHRvblwiKTtcblxuZ2FtZVN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGlmIChhaVBsYXllcikgYWlHYW1lKCk7XG4gIGVsc2UgdHdvUGxheWVyR2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=