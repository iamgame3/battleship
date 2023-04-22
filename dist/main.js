/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM-gameboard.js":
/*!******************************!*\
  !*** ./src/DOM-gameboard.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sfx/Explosion.webm */ "./src/sfx/Explosion.webm");
/* harmony import */ var _sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sfx/Water-Drop.webm */ "./src/sfx/Water-Drop.webm");
/* harmony import */ var _sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sfx/Victory.webm */ "./src/sfx/Victory.webm");





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
    const enemy = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createAI)();
    randomShips(enemy.gameboard);
    const enemyGridSunk = document.createElement("div");
    enemyGridSunk.classList.add("enemy-grid-sunk");
    enemyGrid.appendChild(enemyGridSunk);
    const yourGrid = document.createElement("div");
    const you = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
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
              const explosionSfx = new Audio(_sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_1__);
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
                const victorySfx = new Audio(_sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_3__);
                victorySfx.play();
              }
            }
          } else {
            square.style.color = "gray";
            square.textContent = "/";
            const waterDropSfx = new Audio(_sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_2__);
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
            const explosionSfx = new Audio(_sfx_Explosion_webm__WEBPACK_IMPORTED_MODULE_1__);
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
              const victorySfx = new Audio(_sfx_Victory_webm__WEBPACK_IMPORTED_MODULE_3__);
              victorySfx.play();
            }
          }
        } else {
          attackedSquare.style.color = "gray";
          attackedSquare.textContent = "/";
          const waterDropSfx = new Audio(_sfx_Water_Drop_webm__WEBPACK_IMPORTED_MODULE_2__);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameSetup);


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
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareAbove === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 10]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex - 10);
      if (
        squareLeft === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 1]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex - 1);
      if (
        squareRight === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 1]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex + 1);
      if (
        squareBelow === "Hit" &&
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
/* harmony import */ var _DOM_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM-gameboard */ "./src/DOM-gameboard.js");


(0,_DOM_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFaUM7Ozs7Ozs7Ozs7Ozs7OztBQ25QbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZDFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNmd0M7O0FBRXhDLDBEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00tZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVBSSB9IGZyb20gXCIuL3BsYXllcnNcIjtcbmltcG9ydCBleHBsb3Npb25TZnhTcmMgZnJvbSBcIi4vc2Z4L0V4cGxvc2lvbi53ZWJtXCI7XG5pbXBvcnQgd2F0ZXJEcm9wU2Z4U3JjIGZyb20gXCIuL3NmeC9XYXRlci1Ecm9wLndlYm1cIjtcbmltcG9ydCB2aWN0b3J5U2Z4U3JjIGZyb20gXCIuL3NmeC9WaWN0b3J5LndlYm1cIjtcblxuY29uc3QgcmFuZG9tU2hpcHMgPSAocGxheWVyR2FtZWJvYXJkKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSArPSAxKSB7XG4gICAgbGV0IHNoaXBMZW5ndGg7XG4gICAgaWYgKGkgPT09IDApIHNoaXBMZW5ndGggPSAxO1xuICAgIGVsc2UgaWYgKGkgPT09IDEgfHwgaSA9PT0gMikgc2hpcExlbmd0aCA9IDI7XG4gICAgZWxzZSBpZiAoaSA9PT0gMykgc2hpcExlbmd0aCA9IDM7XG4gICAgZWxzZSBzaGlwTGVuZ3RoID0gNDtcbiAgICBjb25zdCByYW5kb21TbWFsbE51bWJlciA9IE1hdGgucmFuZG9tKCk7XG4gICAgaWYgKHJhbmRvbVNtYWxsTnVtYmVyIDwgMC41KSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCByYW5kb21CaWdOdW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5OSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBNYXRoLmZsb29yKHJhbmRvbUJpZ051bWJlciAvIDEwKSA9PT1cbiAgICAgICAgICAgIE1hdGguZmxvb3IoKHJhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGgpIC8gMTApICYmXG4gICAgICAgICAgcmFuZG9tQmlnTnVtYmVyICsgc2hpcExlbmd0aCA8IDEwMFxuICAgICAgICApIHtcbiAgICAgICAgICBsZXQgc3BhY2VBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcExlbmd0aCArIDE7IGogKz0gMSlcbiAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuZ2FtZWJvYXJkW3JhbmRvbUJpZ051bWJlciArIGpdICE9PSBcIlwiKVxuICAgICAgICAgICAgICBzcGFjZUF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzcGFjZUF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBvc2l0aW9uc1tyYW5kb21CaWdOdW1iZXJdLFxuICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucG9zaXRpb25zW3JhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGhdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUJpZ051bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgICAgaWYgKHJhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGggKiAxMCA8IDEwMCkge1xuICAgICAgICAgIGxldCBzcGFjZUF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAoc2hpcExlbmd0aCArIDEpICogMTA7IGogKz0gMTApXG4gICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmdhbWVib2FyZFtyYW5kb21CaWdOdW1iZXIgKyBqXSAhPT0gXCJcIilcbiAgICAgICAgICAgICAgc3BhY2VBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoc3BhY2VBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wb3NpdGlvbnNbcmFuZG9tQmlnTnVtYmVyXSxcbiAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBvc2l0aW9uc1tyYW5kb21CaWdOdW1iZXIgKyBzaGlwTGVuZ3RoICogMTBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBwbGF5ZXJHYW1lYm9hcmQuZ2FtZWJvYXJkO1xufTtcblxuY29uc3QgZ2FtZVNldHVwID0gKCkgPT4ge1xuICBjb25zdCBnYW1lU3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc3RhcnQtYnV0dG9uXCIpO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuXG4gIGdhbWVTdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGxldCB5b3VyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZVwiKS52YWx1ZTtcbiAgICBpZiAoeW91ck5hbWUgPT09IFwiXCIpIHlvdXJOYW1lID0gXCJQTEFZRVIgMVwiO1xuICAgIHBhZ2VDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtaXNzTGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGNvbnN0IGhpdExlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBtaXNzTGVnZW5kLnRleHRDb250ZW50ID0gXCIvOiBNSVNTXCI7XG4gICAgaGl0TGVnZW5kLnRleHRDb250ZW50ID0gXCJYOiBISVRcIjtcbiAgICBtaXNzTGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBoaXRMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGxlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kXCIpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChtaXNzTGVnZW5kKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQoaGl0TGVnZW5kKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGxlZ2VuZCk7XG4gICAgY29uc3QgZ2FtZUdyaWRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlbmVteUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15ID0gY3JlYXRlQUkoKTtcbiAgICByYW5kb21TaGlwcyhlbmVteS5nYW1lYm9hcmQpO1xuICAgIGNvbnN0IGVuZW15R3JpZFN1bmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVuZW15R3JpZFN1bmsuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtc3Vua1wiKTtcbiAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkU3Vuayk7XG4gICAgY29uc3QgeW91ckdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHlvdSA9IGNyZWF0ZVBsYXllcigpO1xuICAgIHJhbmRvbVNoaXBzKHlvdS5nYW1lYm9hcmQpO1xuICAgIGNvbnN0IHlvdXJHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgeW91ckdyaWRTdW5rLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLXN1bmtcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRTdW5rKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgICBzcXVhcmUuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0geW91LmF0dGFjayhlbmVteS5nYW1lYm9hcmQsIGkpO1xuICAgICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb25zdCBleHBsb3Npb25TZnggPSBuZXcgQXVkaW8oZXhwbG9zaW9uU2Z4U3JjKTtcbiAgICAgICAgICAgICAgZXhwbG9zaW9uU2Z4LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc3Vua2VuU2hpcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgIHN1bmtlblNoaXBET00udGV4dENvbnRlbnQgPSBgJHthdHRhY2tSZXN1bHRbMl19IFNVTkshYDtcbiAgICAgICAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgICAgICAgZW5lbXlHcmlkU3Vuay5hcHBlbmRDaGlsZChzdW5rZW5TaGlwRE9NKTtcbiAgICAgICAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aW5uZXJQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAudGV4dENvbnRlbnQgPSBgJHt5b3VyTmFtZX0gV0lOUyFgO1xuICAgICAgICAgICAgICAgIHdpbm5lclBvcHVwLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItcG9wdXBcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQkFUVExFIEFHQUlOP1wiO1xuICAgICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbiAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHdpbm5lclBvcHVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQod2lubmVyUG9wdXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpY3RvcnlTZnggPSBuZXcgQXVkaW8odmljdG9yeVNmeFNyYyk7XG4gICAgICAgICAgICAgICAgdmljdG9yeVNmeC5wbGF5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgICAgIGNvbnN0IHdhdGVyRHJvcFNmeCA9IG5ldyBBdWRpbyh3YXRlckRyb3BTZnhTcmMpO1xuICAgICAgICAgICAgd2F0ZXJEcm9wU2Z4LnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZFwiKTtcbiAgICBjb25zdCBlbmVteUdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZW5lbXlHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJFTkVNWSBHUklEXCI7XG4gICAgZW5lbXlHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLWhlYWRlclwiKTtcbiAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkSGVhZGVyKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9O1xuICAgIGxldCBsYXN0QXR0YWNrSW5kZXg7XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHJldHVybjtcbiAgICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gZW5lbXkuYXR0YWNrKHlvdS5nYW1lYm9hcmQsIGxhc3RBdHRhY2tJbmRleCk7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtaWQ9JyR7YXR0YWNrUmVzdWx0WzFdfSddYFxuICAgICAgICApO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgbGFzdEF0dGFja0luZGV4ID0gYXR0YWNrUmVzdWx0WzFdO1xuICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdWzBdID09PSBcIkhpdFwiKSB7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgaWYgKHlvdS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9zaW9uU2Z4ID0gbmV3IEF1ZGlvKGV4cGxvc2lvblNmeFNyYyk7XG4gICAgICAgICAgICBleHBsb3Npb25TZngucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHN1bmtlblNoaXBET00udGV4dENvbnRlbnQgPSBgJHthdHRhY2tSZXN1bHRbMF1bMl19IFNVTkshYDtcbiAgICAgICAgICAgIHN1bmtlblNoaXBET00uY2xhc3NMaXN0LmFkZChcInN1bmtlbi1zaGlwLXRleHRcIik7XG4gICAgICAgICAgICB5b3VyR3JpZFN1bmsuYXBwZW5kQ2hpbGQoc3Vua2VuU2hpcERPTSk7XG4gICAgICAgICAgICBpZiAoeW91LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2lubmVyUG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICB3aW5uZXJQb3B1cC50ZXh0Q29udGVudCA9IFwiQUkgV0lOUyFcIjtcbiAgICAgICAgICAgICAgd2lubmVyUG9wdXAuY2xhc3NMaXN0LmFkZChcIndpbm5lci1wb3B1cFwiKTtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSBcIkJBVFRMRSBBR0FJTj9cIjtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzdGFydC1idXR0b25cIik7XG4gICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3aW5uZXJQb3B1cC5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbiAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh3aW5uZXJQb3B1cCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZpY3RvcnlTZnggPSBuZXcgQXVkaW8odmljdG9yeVNmeFNyYyk7XG4gICAgICAgICAgICAgIHZpY3RvcnlTZngucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwiZ3JheVwiO1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICAgICAgY29uc3Qgd2F0ZXJEcm9wU2Z4ID0gbmV3IEF1ZGlvKHdhdGVyRHJvcFNmeFNyYyk7XG4gICAgICAgICAgd2F0ZXJEcm9wU2Z4LnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfTtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVuZW15R3JpZCwgY29uZmlnKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImdhbWUtZ3JpZHMtY29udGFpbmVyXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBpZiAoeW91LmdhbWVib2FyZC5nYW1lYm9hcmRbaV0pIHtcbiAgICAgICAgbGV0IHNoaXBTcXVhcmUgPSB5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXTtcbiAgICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChzaGlwU3F1YXJlWzFdKTtcbiAgICAgIH0gZWxzZSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBpKTtcbiAgICAgIHNxdWFyZS5zdHlsZS5mb250U2l6ZSA9IFwiNDBweFwiO1xuICAgICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgeW91ckdyaWQuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZFwiKTtcbiAgICBjb25zdCB5b3VyR3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB5b3VyR3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiWU9VUiBHUklEXCI7XG4gICAgeW91ckdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZC1oZWFkZXJcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRIZWFkZXIpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh5b3VyR3JpZCk7XG4gICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lR3JpZHNDb250YWluZXIpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVTZXR1cDtcbiIsImltcG9ydCBjcmVhdGVTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCB0ZW1wUG9zaXRpb25zID0gW107XG4gIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqICs9IDEpIHtcbiAgICAgIHRlbXBQb3NpdGlvbnMucHVzaChgJHtsZXR0ZXJzW2ldfSR7an1gKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgdGVtcEdhbWVib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgdGVtcEdhbWVib2FyZC5wdXNoKFwiXCIpO1xuICB9XG4gIGNvbnN0IHRlbXBHYW1lYm9hcmRUd28gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIHRlbXBHYW1lYm9hcmRUd28ucHVzaChcIlwiKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHBvc2l0aW9uczogdGVtcFBvc2l0aW9ucyxcbiAgICBnYW1lYm9hcmQ6IHRlbXBHYW1lYm9hcmQsXG4gICAgc2hpcFBvc2l0aW9uczogdGVtcEdhbWVib2FyZFR3byxcbiAgICBzaGlwczoge30sXG4gICAgc3ViRXhpc3RzOiBmYWxzZSxcbiAgICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2Yoc3RhcnQpO1xuICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKGVuZCk7XG4gICAgICBsZXQgc2hpcEluZm87XG4gICAgICBpZiAoKGVuZEluZGV4IC0gc3RhcnRJbmRleCkgJSAxMCA9PT0gMClcbiAgICAgICAgc2hpcEluZm8gPSBbKGVuZEluZGV4IC0gc3RhcnRJbmRleCkgLyAxMCArIDEsIFwidmVydFwiXTtcbiAgICAgIGVsc2Ugc2hpcEluZm8gPSBbZW5kSW5kZXggLSBzdGFydEluZGV4ICsgMSwgXCJob3JcIl07XG4gICAgICBsZXQgc2hpcE5hbWU7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDUpIHNoaXBOYW1lID0gXCJBaXJjcmFmdC1DYXJyaWVyXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDQpIHNoaXBOYW1lID0gXCJCYXR0bGVzaGlwXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViRXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuc3ViRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwTmFtZSA9IFwiU3VibWFyaW5lXCI7XG4gICAgICAgIH0gZWxzZSBzaGlwTmFtZSA9IFwiQ3J1aXNlclwiO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAyKSBzaGlwTmFtZSA9IFwiRGVzdHJveWVyXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMV0gPT09IFwiaG9yXCIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgIHRoaXMuc2hpcFBvc2l0aW9uc1tpXSA9IHNoaXBOYW1lO1xuICAgICAgICAgIGlmIChpID09PSBzdGFydEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLWxlZnQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1yaWdodC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gbWlkLSR7c2hpcEluZm9bMV19LXNxdWFyZWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxMCkge1xuICAgICAgICAgIHRoaXMuc2hpcFBvc2l0aW9uc1tpXSA9IHNoaXBOYW1lO1xuICAgICAgICAgIGlmIChpID09PSBzdGFydEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXRvcC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLWJvdHRvbS1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gbWlkLSR7c2hpcEluZm9bMV19LXNxdWFyZWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2hpcHNbc2hpcE5hbWVdID0gY3JlYXRlU2hpcChzaGlwSW5mb1swXSk7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwc1tzaGlwTmFtZV07XG4gICAgfSxcbiAgICByZWNlaXZlQXR0YWNrKGdhbWVib2FyZEluZGV4KSB7XG4gICAgICBpZiAodGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdKSB7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XS5zcGxpdChcIiBcIik7XG4gICAgICAgIHRoaXMuc2hpcHNbYXR0YWNrZWRTaGlwWzBdXS5oaXQoKTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJIaXRcIjtcbiAgICAgICAgY29uc3QgaXNTdW5rID0gdGhpcy5zaGlwc1thdHRhY2tlZFNoaXBbMF1dLmlzU3VuaygpO1xuICAgICAgICByZXR1cm4gW1wiSGl0XCIsIGlzU3VuaywgYXR0YWNrZWRTaGlwWzBdXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSA9IFwiTWlzc1wiO1xuICAgICAgcmV0dXJuIFtcIk1pc3NcIiwgZmFsc2VdO1xuICAgIH0sXG4gICAgYWxsU3VuaygpIHtcbiAgICAgIGxldCBhbGxTdW5rID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgZm9yIChjb25zdCBzaGlwIGluIHRoaXMuc2hpcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNoaXBzW3NoaXBdLnN1bmspIGFsbFN1bmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxTdW5rO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lYm9hcmQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zdGFudC1jb25kaXRpb24gKi9cbmltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IGNyZWF0ZVBsYXllciA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgY29vcmRzKSB7XG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjcmVhdGVBSSA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgbGFzdEF0dGFja0luZGV4KSB7XG4gICAgY29uc3QgcG9zaXRpb25zID0gZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkO1xuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9ICgpID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgICAgY29uc3QgcG9zc2libGVBdHRhY2sgPSBwb3NpdGlvbnNbcmFuZG9tTnVtYmVyXTtcbiAgICAgICAgaWYgKHBvc3NpYmxlQXR0YWNrICE9PSBcIkhpdFwiICYmIHBvc3NpYmxlQXR0YWNrICE9PSBcIk1pc3NcIikge1xuICAgICAgICAgIHJldHVybiBbZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21OdW1iZXIpLCByYW5kb21OdW1iZXJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAobGFzdEF0dGFja0luZGV4ID09PSB1bmRlZmluZWQpIHJldHVybiByYW5kb21BdHRhY2soKTtcbiAgICBjb25zdCBwcmVkaWN0U2hpcExvY2F0aW9uID0gKGxBdHRhY2tJbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3F1YXJlQWJvdmUgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMTBdO1xuICAgICAgY29uc3Qgc3F1YXJlQmVsb3cgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMTBdO1xuICAgICAgbGV0IHNxdWFyZUxlZnQ7XG4gICAgICBsZXQgc3F1YXJlUmlnaHQ7XG4gICAgICBpZiAobEF0dGFja0luZGV4ICUgMTAgIT09IDApIHNxdWFyZUxlZnQgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMV07XG4gICAgICBpZiAobEF0dGFja0luZGV4LnRvU3RyaW5nKCkuc3Vic3RyaW5nWzFdICE9PSBcIjlcIilcbiAgICAgICAgc3F1YXJlUmlnaHQgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV07XG4gICAgICBpZiAocG9zaXRpb25zW2xBdHRhY2tJbmRleF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXhdXG4gICAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHJhbmRvbUF0dGFjaygpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZUFib3ZlID09PSB1bmRlZmluZWQgfHwgc3F1YXJlQWJvdmUgPT09IFwiTWlzc1wiKSAmJlxuICAgICAgICAgIHNxdWFyZUJlbG93ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF1cbiAgICAgICAgICBdLmlzU3VuaygpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxMCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlQmVsb3cgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVCZWxvdyA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlQWJvdmUgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDEwXVxuICAgICAgICAgIF0uaXNTdW5rKClcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEwKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzcXVhcmVMZWZ0ID09PSB1bmRlZmluZWQgfHwgc3F1YXJlTGVmdCA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlUmlnaHQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDFdXG4gICAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4ICsgMSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlUmlnaHQgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVSaWdodCA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMV1cbiAgICAgICAgICBdLmlzU3VuaygpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggLSAxKTtcbiAgICAgICAgaWYgKHNxdWFyZUFib3ZlICYmIHNxdWFyZUJlbG93KSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlQWJvdmUgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQmVsb3cgIT09IFwiSGl0XCJcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCArIDEwKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMTAsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZUJlbG93ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggLSAxMCksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCAtIDEwLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3F1YXJlTGVmdCAmJiBzcXVhcmVSaWdodCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZUxlZnQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiSGl0XCJcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCArIDEpLFxuICAgICAgICAgICAgICBsQXR0YWNrSW5kZXggKyAxLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlTGVmdCAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiSGl0XCJcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEpLFxuICAgICAgICAgICAgICBsQXR0YWNrSW5kZXggLSAxLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgc3F1YXJlQWJvdmUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggLSAxMCksXG4gICAgICAgICAgICBsQXR0YWNrSW5kZXggLSAxMCxcbiAgICAgICAgICBdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3F1YXJlTGVmdCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgc3F1YXJlTGVmdCAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggLSAxKSxcbiAgICAgICAgICAgIGxBdHRhY2tJbmRleCAtIDEsXG4gICAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMSksXG4gICAgICAgICAgICBsQXR0YWNrSW5kZXggKyAxLFxuICAgICAgICAgIF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgc3F1YXJlQmVsb3cgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlQmVsb3cgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCArIDEwKSxcbiAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEwLFxuICAgICAgICAgIF07XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUFib3ZlID09PSBcIkhpdFwiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggLSAyMF0gPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMTBdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgICkge1xuICAgICAgICBsZXQgbEF0dGFja0luZGV4Q29weSA9IGxBdHRhY2tJbmRleDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBsQXR0YWNrSW5kZXhDb3B5IC09IDEwO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IFwiTWlzc1wiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSk7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gdW5kZWZpbmVkKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVMZWZ0ID09PSBcIkhpdFwiICYmXG4gICAgICAgIGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXggLSAyXSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApIHtcbiAgICAgICAgbGV0IGxBdHRhY2tJbmRleENvcHkgPSBsQXR0YWNrSW5kZXg7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgbEF0dGFja0luZGV4Q29weSAtPSAxO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IFwiTWlzc1wiKVxuICAgICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4Q29weSk7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gdW5kZWZpbmVkKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4ICsgMl0gPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBsQXR0YWNrSW5kZXhDb3B5ID0gbEF0dGFja0luZGV4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGxBdHRhY2tJbmRleENvcHkgKz0gMTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSBcIk1pc3NcIilcbiAgICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleENvcHkpO1xuICAgICAgICAgIGlmIChlbmVteUdhbWVib2FyZC5nYW1lYm9hcmRbbEF0dGFja0luZGV4Q29weV0gPT09IHVuZGVmaW5lZCkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleCArIDIwXSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBsQXR0YWNrSW5kZXhDb3B5ID0gbEF0dGFja0luZGV4O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGxBdHRhY2tJbmRleENvcHkgKz0gMTA7XG4gICAgICAgICAgaWYgKGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZFtsQXR0YWNrSW5kZXhDb3B5XSA9PT0gXCJNaXNzXCIpXG4gICAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXhDb3B5KTtcbiAgICAgICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkW2xBdHRhY2tJbmRleENvcHldID09PSB1bmRlZmluZWQpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUFib3ZlID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDEwXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEwKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEpO1xuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEpO1xuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVCZWxvdyA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxMCk7XG4gICAgICByZXR1cm4gcmFuZG9tQXR0YWNrKCk7XG4gICAgfTtcbiAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsYXN0QXR0YWNrSW5kZXgpO1xuICB9LFxufSk7XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllciwgY3JlYXRlQUkgfTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAoc2hpcExlbmd0aCkgPT4gKHtcbiAgbGVuZ3RoOiBzaGlwTGVuZ3RoLFxuICBoaXRzOiAwLFxuICBzdW5rOiBmYWxzZSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICBpZiAodGhpcy5pc1N1bmsoKSA9PT0gdHJ1ZSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBnYW1lU2V0dXAgZnJvbSBcIi4vRE9NLWdhbWVib2FyZFwiO1xuXG5nYW1lU2V0dXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==