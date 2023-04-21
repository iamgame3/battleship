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
          squareBelow === "Hit"
        )
          return predictShipLocation(lAttackIndex + 10);
        if (
          (squareBelow === undefined || squareBelow === "Miss") &&
          squareAbove === "Hit"
        )
          return predictShipLocation(lAttackIndex - 10);
        if (
          (squareLeft === undefined || squareLeft === "Miss") &&
          squareRight === "Hit"
        )
          return predictShipLocation(lAttackIndex + 1);
        if (
          (squareRight === undefined || squareRight === "Miss") &&
          squareLeft === "Hit"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7OztBQ2Z3Qzs7QUFFeEMsMERBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS1nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZUFJIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuaW1wb3J0IGV4cGxvc2lvblNmeFNyYyBmcm9tIFwiLi9zZngvRXhwbG9zaW9uLndlYm1cIjtcbmltcG9ydCB3YXRlckRyb3BTZnhTcmMgZnJvbSBcIi4vc2Z4L1dhdGVyLURyb3Aud2VibVwiO1xuaW1wb3J0IHZpY3RvcnlTZnhTcmMgZnJvbSBcIi4vc2Z4L1ZpY3Rvcnkud2VibVwiO1xuXG5jb25zdCByYW5kb21TaGlwcyA9IChwbGF5ZXJHYW1lYm9hcmQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpICs9IDEpIHtcbiAgICBsZXQgc2hpcExlbmd0aDtcbiAgICBpZiAoaSA9PT0gMCkgc2hpcExlbmd0aCA9IDE7XG4gICAgZWxzZSBpZiAoaSA9PT0gMSB8fCBpID09PSAyKSBzaGlwTGVuZ3RoID0gMjtcbiAgICBlbHNlIGlmIChpID09PSAzKSBzaGlwTGVuZ3RoID0gMztcbiAgICBlbHNlIHNoaXBMZW5ndGggPSA0O1xuICAgIGNvbnN0IHJhbmRvbVNtYWxsTnVtYmVyID0gTWF0aC5yYW5kb20oKTtcbiAgICBpZiAocmFuZG9tU21hbGxOdW1iZXIgPCAwLjUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbUJpZ051bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIE1hdGguZmxvb3IocmFuZG9tQmlnTnVtYmVyIC8gMTApID09PVxuICAgICAgICAgICAgTWF0aC5mbG9vcigocmFuZG9tQmlnTnVtYmVyICsgc2hpcExlbmd0aCkgLyAxMCkgJiZcbiAgICAgICAgICByYW5kb21CaWdOdW1iZXIgKyBzaGlwTGVuZ3RoIDwgMTAwXG4gICAgICAgICkge1xuICAgICAgICAgIGxldCBzcGFjZUF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwTGVuZ3RoICsgMTsgaiArPSAxKVxuICAgICAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5nYW1lYm9hcmRbcmFuZG9tQmlnTnVtYmVyICsgal0gIT09IFwiXCIpXG4gICAgICAgICAgICAgIHNwYWNlQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHNwYWNlQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucG9zaXRpb25zW3JhbmRvbUJpZ051bWJlcl0sXG4gICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wb3NpdGlvbnNbcmFuZG9tQmlnTnVtYmVyICsgc2hpcExlbmd0aF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tQmlnTnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOTkpO1xuICAgICAgICBpZiAocmFuZG9tQmlnTnVtYmVyICsgc2hpcExlbmd0aCAqIDEwIDwgMTAwKSB7XG4gICAgICAgICAgbGV0IHNwYWNlQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IChzaGlwTGVuZ3RoICsgMSkgKiAxMDsgaiArPSAxMClcbiAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuZ2FtZWJvYXJkW3JhbmRvbUJpZ051bWJlciArIGpdICE9PSBcIlwiKVxuICAgICAgICAgICAgICBzcGFjZUF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzcGFjZUF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBvc2l0aW9uc1tyYW5kb21CaWdOdW1iZXJdLFxuICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucG9zaXRpb25zW3JhbmRvbUJpZ051bWJlciArIHNoaXBMZW5ndGggKiAxMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBsYXllckdhbWVib2FyZC5nYW1lYm9hcmQ7XG59O1xuXG5jb25zdCBnYW1lU2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVTdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1zdGFydC1idXR0b25cIik7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1jb250YWluZXJcIik7XG5cbiAgZ2FtZVN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbGV0IHlvdXJOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lXCIpLnZhbHVlO1xuICAgIGlmICh5b3VyTmFtZSA9PT0gXCJcIikgeW91ck5hbWUgPSBcIlBMQVlFUiAxXCI7XG4gICAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1pc3NMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29uc3QgaGl0TGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG1pc3NMZWdlbmQudGV4dENvbnRlbnQgPSBcIi86IE1JU1NcIjtcbiAgICBoaXRMZWdlbmQudGV4dENvbnRlbnQgPSBcIlg6IEhJVFwiO1xuICAgIG1pc3NMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGhpdExlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgbGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmRcIik7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKG1pc3NMZWdlbmQpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChoaXRMZWdlbmQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgICBjb25zdCBnYW1lR3JpZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXkgPSBjcmVhdGVBSSgpO1xuICAgIHJhbmRvbVNoaXBzKGVuZW15LmdhbWVib2FyZCk7XG4gICAgY29uc3QgZW5lbXlHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW5lbXlHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRTdW5rKTtcbiAgICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgeW91ID0gY3JlYXRlUGxheWVyKCk7XG4gICAgcmFuZG9tU2hpcHMoeW91LmdhbWVib2FyZCk7XG4gICAgY29uc3QgeW91ckdyaWRTdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB5b3VyR3JpZFN1bmsuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtc3Vua1wiKTtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZFN1bmspO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICAgIHNxdWFyZS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSB5b3UuYXR0YWNrKGVuZW15LmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXSA9PT0gXCJIaXRcIikge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgICAgaWYgKGVuZW15LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGV4cGxvc2lvblNmeCA9IG5ldyBBdWRpbyhleHBsb3Npb25TZnhTcmMpO1xuICAgICAgICAgICAgICBleHBsb3Npb25TZngucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke2F0dGFja1Jlc3VsdFsyXX0gU1VOSyFgO1xuICAgICAgICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICAgICAgICBlbmVteUdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5lclBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3B1cC50ZXh0Q29udGVudCA9IGAke3lvdXJOYW1lfSBXSU5TIWA7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAuY2xhc3NMaXN0LmFkZChcIndpbm5lci1wb3B1cFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCQVRUTEUgQUdBSU4/XCI7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVzdGFydC1idXR0b25cIik7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgd2lubmVyUG9wdXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh3aW5uZXJQb3B1cCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgICAgICB2aWN0b3J5U2Z4LnBsYXkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgICAgY29uc3Qgd2F0ZXJEcm9wU2Z4ID0gbmV3IEF1ZGlvKHdhdGVyRHJvcFNmeFNyYyk7XG4gICAgICAgICAgICB3YXRlckRyb3BTZngucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkXCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlbmVteUdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkVORU1ZIEdSSURcIjtcbiAgICBlbmVteUdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtaGVhZGVyXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRIZWFkZXIpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH07XG4gICAgbGV0IGxhc3RBdHRhY2tJbmRleDtcbiAgICBjb25zdCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteS5hdHRhY2soeW91LmdhbWVib2FyZCwgbGFzdEF0dGFja0luZGV4KTtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1pZD0nJHthdHRhY2tSZXN1bHRbMV19J11gXG4gICAgICAgICk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICBsYXN0QXR0YWNrSW5kZXggPSBhdHRhY2tSZXN1bHRbMV07XG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICBpZiAoeW91LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBleHBsb3Npb25TZnggPSBuZXcgQXVkaW8oZXhwbG9zaW9uU2Z4U3JjKTtcbiAgICAgICAgICAgIGV4cGxvc2lvblNmeC5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1bmtlblNoaXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke2F0dGFja1Jlc3VsdFswXVsyXX0gU1VOSyFgO1xuICAgICAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgICAgIHlvdXJHcmlkU3Vuay5hcHBlbmRDaGlsZChzdW5rZW5TaGlwRE9NKTtcbiAgICAgICAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjb25zdCB3aW5uZXJQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLnRleHRDb250ZW50ID0gXCJBSSBXSU5TIVwiO1xuICAgICAgICAgICAgICB3aW5uZXJQb3B1cC5jbGFzc0xpc3QuYWRkKFwid2lubmVyLXBvcHVwXCIpO1xuICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQkFUVExFIEFHQUlOP1wiO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICAgICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHdpbm5lclBvcHVwKTtcbiAgICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgICAgdmljdG9yeVNmeC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgICBjb25zdCB3YXRlckRyb3BTZnggPSBuZXcgQXVkaW8od2F0ZXJEcm9wU2Z4U3JjKTtcbiAgICAgICAgICB3YXRlckRyb3BTZngucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIG9ic2VydmVyLm9ic2VydmUoZW5lbXlHcmlkLCBjb25maWcpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1ncmlkcy1jb250YWluZXJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSkge1xuICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgICBzaGlwU3F1YXJlID0gc2hpcFNxdWFyZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHNoaXBTcXVhcmVbMV0pO1xuICAgICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGkpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCI0MHB4XCI7XG4gICAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICB5b3VyR3JpZC5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkXCIpO1xuICAgIGNvbnN0IHlvdXJHcmlkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHlvdXJHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJZT1VSIEdSSURcIjtcbiAgICB5b3VyR3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkLWhlYWRlclwiKTtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZEhlYWRlcik7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZCk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHlvdXJHcmlkKTtcbiAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVHcmlkc0NvbnRhaW5lcik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVNldHVwO1xuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHRlbXBQb3NpdGlvbnMgPSBbXTtcbiAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGogKz0gMSkge1xuICAgICAgdGVtcFBvc2l0aW9ucy5wdXNoKGAke2xldHRlcnNbaV19JHtqfWApO1xuICAgIH1cbiAgfVxuICBjb25zdCB0ZW1wR2FtZWJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICB0ZW1wR2FtZWJvYXJkLnB1c2goXCJcIik7XG4gIH1cbiAgY29uc3QgdGVtcEdhbWVib2FyZFR3byA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgdGVtcEdhbWVib2FyZFR3by5wdXNoKFwiXCIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcG9zaXRpb25zOiB0ZW1wUG9zaXRpb25zLFxuICAgIGdhbWVib2FyZDogdGVtcEdhbWVib2FyZCxcbiAgICBzaGlwUG9zaXRpb25zOiB0ZW1wR2FtZWJvYXJkVHdvLFxuICAgIHNoaXBzOiB7fSxcbiAgICBzdWJFeGlzdHM6IGZhbHNlLFxuICAgIHBsYWNlU2hpcChzdGFydCwgZW5kKSB7XG4gICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihzdGFydCk7XG4gICAgICBjb25zdCBlbmRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2YoZW5kKTtcbiAgICAgIGxldCBzaGlwSW5mbztcbiAgICAgIGlmICgoZW5kSW5kZXggLSBzdGFydEluZGV4KSAlIDEwID09PSAwKVxuICAgICAgICBzaGlwSW5mbyA9IFsoZW5kSW5kZXggLSBzdGFydEluZGV4KSAvIDEwICsgMSwgXCJ2ZXJ0XCJdO1xuICAgICAgZWxzZSBzaGlwSW5mbyA9IFtlbmRJbmRleCAtIHN0YXJ0SW5kZXggKyAxLCBcImhvclwiXTtcbiAgICAgIGxldCBzaGlwTmFtZTtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNSkgc2hpcE5hbWUgPSBcIkFpcmNyYWZ0LUNhcnJpZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNCkgc2hpcE5hbWUgPSBcIkJhdHRsZXNoaXBcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMykge1xuICAgICAgICBpZiAodGhpcy5zdWJFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5zdWJFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgIHNoaXBOYW1lID0gXCJTdWJtYXJpbmVcIjtcbiAgICAgICAgfSBlbHNlIHNoaXBOYW1lID0gXCJDcnVpc2VyXCI7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDIpIHNoaXBOYW1lID0gXCJEZXN0cm95ZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1sxXSA9PT0gXCJob3JcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxKSB7XG4gICAgICAgICAgdGhpcy5zaGlwUG9zaXRpb25zW2ldID0gc2hpcE5hbWU7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtbGVmdC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXJpZ2h0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEwKSB7XG4gICAgICAgICAgdGhpcy5zaGlwUG9zaXRpb25zW2ldID0gc2hpcE5hbWU7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtdG9wLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtYm90dG9tLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zaGlwc1tzaGlwTmFtZV0gPSBjcmVhdGVTaGlwKHNoaXBJbmZvWzBdKTtcbiAgICAgIHJldHVybiB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZWJvYXJkSW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0pIHtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdGhpcy5zaGlwc1thdHRhY2tlZFNoaXBbMF1dLmhpdCgpO1xuICAgICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIkhpdFwiO1xuICAgICAgICBjb25zdCBpc1N1bmsgPSB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaXNTdW5rKCk7XG4gICAgICAgIHJldHVybiBbXCJIaXRcIiwgaXNTdW5rLCBhdHRhY2tlZFNoaXBbMF1dO1xuICAgICAgfVxuICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJNaXNzXCI7XG4gICAgICByZXR1cm4gW1wiTWlzc1wiLCBmYWxzZV07XG4gICAgfSxcbiAgICBhbGxTdW5rKCkge1xuICAgICAgbGV0IGFsbFN1bmsgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXRoaXMuc2hpcHNbc2hpcF0uc3VuaykgYWxsU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbFN1bms7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVib2FyZDtcbiIsImltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IGNyZWF0ZVBsYXllciA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgY29vcmRzKSB7XG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjcmVhdGVBSSA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgbGFzdEF0dGFja0luZGV4KSB7XG4gICAgY29uc3QgcG9zaXRpb25zID0gZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkO1xuICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9ICgpID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgICAgY29uc3QgcG9zc2libGVBdHRhY2sgPSBwb3NpdGlvbnNbcmFuZG9tTnVtYmVyXTtcbiAgICAgICAgaWYgKHBvc3NpYmxlQXR0YWNrICE9PSBcIkhpdFwiICYmIHBvc3NpYmxlQXR0YWNrICE9PSBcIk1pc3NcIikge1xuICAgICAgICAgIHJldHVybiBbZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21OdW1iZXIpLCByYW5kb21OdW1iZXJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAobGFzdEF0dGFja0luZGV4ID09PSB1bmRlZmluZWQpIHJldHVybiByYW5kb21BdHRhY2soKTtcbiAgICBjb25zdCBwcmVkaWN0U2hpcExvY2F0aW9uID0gKGxBdHRhY2tJbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3F1YXJlQWJvdmUgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMTBdO1xuICAgICAgY29uc3Qgc3F1YXJlQmVsb3cgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMTBdO1xuICAgICAgbGV0IHNxdWFyZUxlZnQ7XG4gICAgICBsZXQgc3F1YXJlUmlnaHQ7XG4gICAgICBpZiAobEF0dGFja0luZGV4ICUgMTAgIT09IDApIHNxdWFyZUxlZnQgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMV07XG4gICAgICBpZiAobEF0dGFja0luZGV4LnRvU3RyaW5nKCkuc3Vic3RyaW5nWzFdICE9PSBcIjlcIilcbiAgICAgICAgc3F1YXJlUmlnaHQgPSBwb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV07XG4gICAgICBpZiAocG9zaXRpb25zW2xBdHRhY2tJbmRleF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXhdXG4gICAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHJhbmRvbUF0dGFjaygpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZUFib3ZlID09PSB1bmRlZmluZWQgfHwgc3F1YXJlQWJvdmUgPT09IFwiTWlzc1wiKSAmJlxuICAgICAgICAgIHNxdWFyZUJlbG93ID09PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxMCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlQmVsb3cgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVCZWxvdyA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlQWJvdmUgPT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEwKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzcXVhcmVMZWZ0ID09PSB1bmRlZmluZWQgfHwgc3F1YXJlTGVmdCA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlUmlnaHQgPT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZVJpZ2h0ID09PSB1bmRlZmluZWQgfHwgc3F1YXJlUmlnaHQgPT09IFwiTWlzc1wiKSAmJlxuICAgICAgICAgIHNxdWFyZUxlZnQgPT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCAtIDEpO1xuICAgICAgICBpZiAoc3F1YXJlQWJvdmUgJiYgc3F1YXJlQmVsb3cpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVBYm92ZSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQmVsb3cgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMTApLFxuICAgICAgICAgICAgICBsQXR0YWNrSW5kZXggKyAxMCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiSGl0XCJcbiAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEwKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMTAsXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcXVhcmVMZWZ0ICYmIHNxdWFyZVJpZ2h0KSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMSksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZVJpZ2h0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgICAgc3F1YXJlTGVmdCAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMSksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCAtIDEsXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEwKSxcbiAgICAgICAgICAgIGxBdHRhY2tJbmRleCAtIDEwLFxuICAgICAgICAgIF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCAtIDEpLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMSxcbiAgICAgICAgICBdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3F1YXJlUmlnaHQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxKSxcbiAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEsXG4gICAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4ICsgMTApLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMTAsXG4gICAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQWJvdmUgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMTBdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMTApO1xuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVMZWZ0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCAtIDFdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMSk7XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZVJpZ2h0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDFdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4ICsgMSk7XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUJlbG93ID09PSBcIkhpdFwiICYmXG4gICAgICAgICFlbmVteUdhbWVib2FyZC5zaGlwc1tcbiAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleCArIDEwXVxuICAgICAgICBdLmlzU3VuaygpXG4gICAgICApXG4gICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEwKTtcbiAgICAgIHJldHVybiByYW5kb21BdHRhY2soKTtcbiAgICB9O1xuICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxhc3RBdHRhY2tJbmRleCk7XG4gIH0sXG59KTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVBSSB9O1xuIiwiY29uc3QgY3JlYXRlU2hpcCA9IChzaGlwTGVuZ3RoKSA9PiAoe1xuICBsZW5ndGg6IHNoaXBMZW5ndGgsXG4gIGhpdHM6IDAsXG4gIHN1bms6IGZhbHNlLFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIGlmICh0aGlzLmlzU3VuaygpID09PSB0cnVlKSB0aGlzLnN1bmsgPSB0cnVlO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IGdhbWVTZXR1cCBmcm9tIFwiLi9ET00tZ2FtZWJvYXJkXCI7XG5cbmdhbWVTZXR1cCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9