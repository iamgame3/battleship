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





// TEMP FUNC FOR PLACING SHIPS
const placeShips = (gameboard) => {
  gameboard.placeShip("a3", "a7");
  gameboard.placeShip("g1", "g4");
  gameboard.placeShip("c8", "e8");
  gameboard.placeShip("i6", "i8");
  gameboard.placeShip("b4", "c4");
  return gameboard.gameboard;
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
    placeShips(enemy.gameboard);
    const enemyGridSunk = document.createElement("div");
    enemyGridSunk.classList.add("enemy-grid-sunk");
    enemyGrid.appendChild(enemyGridSunk);
    const yourGrid = document.createElement("div");
    const you = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
    placeShips(you.gameboard);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxlQUFlLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkZXOztBQUUxQztBQUNBLGFBQWEsc0RBQWU7QUFDNUI7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0EsYUFBYSxzREFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFaUM7Ozs7Ozs7Ozs7Ozs7OztBQzFLbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZDFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNmd0M7O0FBRXhDLDBEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00tZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVBSSB9IGZyb20gXCIuL3BsYXllcnNcIjtcbmltcG9ydCBleHBsb3Npb25TZnhTcmMgZnJvbSBcIi4vc2Z4L0V4cGxvc2lvbi53ZWJtXCI7XG5pbXBvcnQgd2F0ZXJEcm9wU2Z4U3JjIGZyb20gXCIuL3NmeC9XYXRlci1Ecm9wLndlYm1cIjtcbmltcG9ydCB2aWN0b3J5U2Z4U3JjIGZyb20gXCIuL3NmeC9WaWN0b3J5LndlYm1cIjtcblxuLy8gVEVNUCBGVU5DIEZPUiBQTEFDSU5HIFNISVBTXG5jb25zdCBwbGFjZVNoaXBzID0gKGdhbWVib2FyZCkgPT4ge1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYTNcIiwgXCJhN1wiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImcxXCIsIFwiZzRcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJjOFwiLCBcImU4XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiaTZcIiwgXCJpOFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImI0XCIsIFwiYzRcIik7XG4gIHJldHVybiBnYW1lYm9hcmQuZ2FtZWJvYXJkO1xufTtcblxuY29uc3QgZ2FtZVNldHVwID0gKCkgPT4ge1xuICBjb25zdCBnYW1lU3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc3RhcnQtYnV0dG9uXCIpO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuXG4gIGdhbWVTdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGxldCB5b3VyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZVwiKS52YWx1ZTtcbiAgICBpZiAoeW91ck5hbWUgPT09IFwiXCIpIHlvdXJOYW1lID0gXCJQTEFZRVIgMVwiO1xuICAgIHBhZ2VDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtaXNzTGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGNvbnN0IGhpdExlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBtaXNzTGVnZW5kLnRleHRDb250ZW50ID0gXCIvOiBNSVNTXCI7XG4gICAgaGl0TGVnZW5kLnRleHRDb250ZW50ID0gXCJYOiBISVRcIjtcbiAgICBtaXNzTGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBoaXRMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGxlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kXCIpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChtaXNzTGVnZW5kKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQoaGl0TGVnZW5kKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGxlZ2VuZCk7XG4gICAgY29uc3QgZ2FtZUdyaWRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlbmVteUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15ID0gY3JlYXRlQUkoKTtcbiAgICBwbGFjZVNoaXBzKGVuZW15LmdhbWVib2FyZCk7XG4gICAgY29uc3QgZW5lbXlHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW5lbXlHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRTdW5rKTtcbiAgICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgeW91ID0gY3JlYXRlUGxheWVyKCk7XG4gICAgcGxhY2VTaGlwcyh5b3UuZ2FtZWJvYXJkKTtcbiAgICBjb25zdCB5b3VyR3JpZFN1bmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHlvdXJHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHlvdXJHcmlkU3Vuayk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgc3F1YXJlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IHlvdS5hdHRhY2soZW5lbXkuZ2FtZWJvYXJkLCBpKTtcbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdID09PSBcIkhpdFwiKSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXhwbG9zaW9uU2Z4ID0gbmV3IEF1ZGlvKGV4cGxvc2lvblNmeFNyYyk7XG4gICAgICAgICAgICAgIGV4cGxvc2lvblNmeC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1bmtlblNoaXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7YXR0YWNrUmVzdWx0WzJdfSBTVU5LIWA7XG4gICAgICAgICAgICAgIHN1bmtlblNoaXBET00uY2xhc3NMaXN0LmFkZChcInN1bmtlbi1zaGlwLXRleHRcIik7XG4gICAgICAgICAgICAgIGVuZW15R3JpZFN1bmsuYXBwZW5kQ2hpbGQoc3Vua2VuU2hpcERPTSk7XG4gICAgICAgICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmVyUG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHdpbm5lclBvcHVwLnRleHRDb250ZW50ID0gYCR7eW91ck5hbWV9IFdJTlMhYDtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3B1cC5jbGFzc0xpc3QuYWRkKFwid2lubmVyLXBvcHVwXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSBcIkJBVFRMRSBBR0FJTj9cIjtcbiAgICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzXG4gICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB3aW5uZXJQb3B1cC5hcHBlbmRDaGlsZChyZXN0YXJ0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHdpbm5lclBvcHVwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWN0b3J5U2Z4ID0gbmV3IEF1ZGlvKHZpY3RvcnlTZnhTcmMpO1xuICAgICAgICAgICAgICAgIHZpY3RvcnlTZngucGxheSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9IFwiZ3JheVwiO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICAgICAgICBjb25zdCB3YXRlckRyb3BTZnggPSBuZXcgQXVkaW8od2F0ZXJEcm9wU2Z4U3JjKTtcbiAgICAgICAgICAgIHdhdGVyRHJvcFNmeC5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICBlbmVteUdyaWQuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWRcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGVuZW15R3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiRU5FTVkgR1JJRFwiO1xuICAgIGVuZW15R3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1oZWFkZXJcIik7XG4gICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKGVuZW15R3JpZEhlYWRlcik7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGNoaWxkTGlzdDogZmFsc2UsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfTtcbiAgICBsZXQgbGFzdEF0dGFja0luZGV4O1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15LmF0dGFjayh5b3UuZ2FtZWJvYXJkLCBsYXN0QXR0YWNrSW5kZXgpO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLWlkPScke2F0dGFja1Jlc3VsdFsxXX0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIGxhc3RBdHRhY2tJbmRleCA9IGF0dGFja1Jlc3VsdFsxXTtcbiAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXVswXSA9PT0gXCJIaXRcIikge1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGxvc2lvblNmeCA9IG5ldyBBdWRpbyhleHBsb3Npb25TZnhTcmMpO1xuICAgICAgICAgICAgZXhwbG9zaW9uU2Z4LnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXVsxXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3Vua2VuU2hpcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7YXR0YWNrUmVzdWx0WzBdWzJdfSBTVU5LIWA7XG4gICAgICAgICAgICBzdW5rZW5TaGlwRE9NLmNsYXNzTGlzdC5hZGQoXCJzdW5rZW4tc2hpcC10ZXh0XCIpO1xuICAgICAgICAgICAgeW91ckdyaWRTdW5rLmFwcGVuZENoaWxkKHN1bmtlblNoaXBET00pO1xuICAgICAgICAgICAgaWYgKHlvdS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdpbm5lclBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgd2lubmVyUG9wdXAudGV4dENvbnRlbnQgPSBcIkFJIFdJTlMhXCI7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItcG9wdXBcIik7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCQVRUTEUgQUdBSU4/XCI7XG4gICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd2lubmVyUG9wdXAuYXBwZW5kQ2hpbGQocmVzdGFydEJ1dHRvbik7XG4gICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQod2lubmVyUG9wdXApO1xuICAgICAgICAgICAgICBjb25zdCB2aWN0b3J5U2Z4ID0gbmV3IEF1ZGlvKHZpY3RvcnlTZnhTcmMpO1xuICAgICAgICAgICAgICB2aWN0b3J5U2Z4LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgIGNvbnN0IHdhdGVyRHJvcFNmeCA9IG5ldyBBdWRpbyh3YXRlckRyb3BTZnhTcmMpO1xuICAgICAgICAgIHdhdGVyRHJvcFNmeC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMDApO1xuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbmVteUdyaWQsIGNvbmZpZyk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lLWdyaWRzLWNvbnRhaW5lclwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICAgIGxldCBzaGlwU3F1YXJlID0geW91LmdhbWVib2FyZC5nYW1lYm9hcmRbaV07XG4gICAgICAgIHNoaXBTcXVhcmUgPSBzaGlwU3F1YXJlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgICB9IGVsc2Ugc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaSk7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIHlvdXJHcmlkLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWRcIik7XG4gICAgY29uc3QgeW91ckdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgeW91ckdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIllPVVIgR1JJRFwiO1xuICAgIHlvdXJHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWQtaGVhZGVyXCIpO1xuICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHlvdXJHcmlkSGVhZGVyKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoeW91ckdyaWQpO1xuICAgIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUdyaWRzQ29udGFpbmVyKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lU2V0dXA7XG4iLCJpbXBvcnQgY3JlYXRlU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgdGVtcFBvc2l0aW9ucyA9IFtdO1xuICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaiArPSAxKSB7XG4gICAgICB0ZW1wUG9zaXRpb25zLnB1c2goYCR7bGV0dGVyc1tpXX0ke2p9YCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHRlbXBHYW1lYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIHRlbXBHYW1lYm9hcmQucHVzaChcIlwiKTtcbiAgfVxuICBjb25zdCB0ZW1wR2FtZWJvYXJkVHdvID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICB0ZW1wR2FtZWJvYXJkVHdvLnB1c2goXCJcIik7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbnM6IHRlbXBQb3NpdGlvbnMsXG4gICAgZ2FtZWJvYXJkOiB0ZW1wR2FtZWJvYXJkLFxuICAgIHNoaXBQb3NpdGlvbnM6IHRlbXBHYW1lYm9hcmRUd28sXG4gICAgc2hpcHM6IHt9LFxuICAgIHN1YkV4aXN0czogZmFsc2UsXG4gICAgcGxhY2VTaGlwKHN0YXJ0LCBlbmQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihlbmQpO1xuICAgICAgbGV0IHNoaXBJbmZvO1xuICAgICAgaWYgKChlbmRJbmRleCAtIHN0YXJ0SW5kZXgpICUgMTAgPT09IDApXG4gICAgICAgIHNoaXBJbmZvID0gWyhlbmRJbmRleCAtIHN0YXJ0SW5kZXgpIC8gMTAgKyAxLCBcInZlcnRcIl07XG4gICAgICBlbHNlIHNoaXBJbmZvID0gW2VuZEluZGV4IC0gc3RhcnRJbmRleCArIDEsIFwiaG9yXCJdO1xuICAgICAgbGV0IHNoaXBOYW1lO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA1KSBzaGlwTmFtZSA9IFwiQWlyY3JhZnQtQ2FycmllclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA0KSBzaGlwTmFtZSA9IFwiQmF0dGxlc2hpcFwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAzKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YkV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnN1YkV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgc2hpcE5hbWUgPSBcIlN1Ym1hcmluZVwiO1xuICAgICAgICB9IGVsc2Ugc2hpcE5hbWUgPSBcIkNydWlzZXJcIjtcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMikgc2hpcE5hbWUgPSBcIkRlc3Ryb3llclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzFdID09PSBcImhvclwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICB0aGlzLnNoaXBQb3NpdGlvbnNbaV0gPSBzaGlwTmFtZTtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1sZWZ0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtcmlnaHQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMTApIHtcbiAgICAgICAgICB0aGlzLnNoaXBQb3NpdGlvbnNbaV0gPSBzaGlwTmFtZTtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC10b3Atc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1ib3R0b20tc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBzW3NoaXBOYW1lXSA9IGNyZWF0ZVNoaXAoc2hpcEluZm9bMF0pO1xuICAgICAgcmV0dXJuIHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuICAgIH0sXG4gICAgcmVjZWl2ZUF0dGFjayhnYW1lYm9hcmRJbmRleCkge1xuICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSkge1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0uc3BsaXQoXCIgXCIpO1xuICAgICAgICB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaGl0KCk7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSA9IFwiSGl0XCI7XG4gICAgICAgIGNvbnN0IGlzU3VuayA9IHRoaXMuc2hpcHNbYXR0YWNrZWRTaGlwWzBdXS5pc1N1bmsoKTtcbiAgICAgICAgcmV0dXJuIFtcIkhpdFwiLCBpc1N1bmssIGF0dGFja2VkU2hpcFswXV07XG4gICAgICB9XG4gICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIk1pc3NcIjtcbiAgICAgIHJldHVybiBbXCJNaXNzXCIsIGZhbHNlXTtcbiAgICB9LFxuICAgIGFsbFN1bmsoKSB7XG4gICAgICBsZXQgYWxsU3VuayA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGlwc1tzaGlwXS5zdW5rKSBhbGxTdW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsU3VuaztcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZWJvYXJkO1xuIiwiaW1wb3J0IGNyZWF0ZUdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgY3JlYXRlUGxheWVyID0gKCkgPT4gKHtcbiAgZ2FtZWJvYXJkOiBjcmVhdGVHYW1lYm9hcmQoKSxcbiAgYXR0YWNrKGVuZW15R2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgICByZXR1cm4gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZUFJID0gKCkgPT4gKHtcbiAgZ2FtZWJvYXJkOiBjcmVhdGVHYW1lYm9hcmQoKSxcbiAgYXR0YWNrKGVuZW15R2FtZWJvYXJkLCBsYXN0QXR0YWNrSW5kZXgpIHtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBlbmVteUdhbWVib2FyZC5nYW1lYm9hcmQ7XG4gICAgY29uc3QgcmFuZG9tQXR0YWNrID0gKCkgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOTkpO1xuICAgICAgICBjb25zdCBwb3NzaWJsZUF0dGFjayA9IHBvc2l0aW9uc1tyYW5kb21OdW1iZXJdO1xuICAgICAgICBpZiAocG9zc2libGVBdHRhY2sgIT09IFwiSGl0XCIgJiYgcG9zc2libGVBdHRhY2sgIT09IFwiTWlzc1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbU51bWJlciksIHJhbmRvbU51bWJlcl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChsYXN0QXR0YWNrSW5kZXggPT09IHVuZGVmaW5lZCkgcmV0dXJuIHJhbmRvbUF0dGFjaygpO1xuICAgIGNvbnN0IHByZWRpY3RTaGlwTG9jYXRpb24gPSAobEF0dGFja0luZGV4KSA9PiB7XG4gICAgICBjb25zdCBzcXVhcmVBYm92ZSA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxMF07XG4gICAgICBjb25zdCBzcXVhcmVCZWxvdyA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxMF07XG4gICAgICBsZXQgc3F1YXJlTGVmdDtcbiAgICAgIGxldCBzcXVhcmVSaWdodDtcbiAgICAgIGlmIChsQXR0YWNrSW5kZXggJSAxMCAhPT0gMCkgc3F1YXJlTGVmdCA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxXTtcbiAgICAgIGlmIChsQXR0YWNrSW5kZXgudG9TdHJpbmcoKS5zdWJzdHJpbmdbMV0gIT09IFwiOVwiKVxuICAgICAgICBzcXVhcmVSaWdodCA9IHBvc2l0aW9uc1tsQXR0YWNrSW5kZXggKyAxXTtcbiAgICAgIGlmIChwb3NpdGlvbnNbbEF0dGFja0luZGV4XSA9PT0gXCJIaXRcIikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5zaGlwUG9zaXRpb25zW2xBdHRhY2tJbmRleF1cbiAgICAgICAgICBdLmlzU3VuaygpXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gcmFuZG9tQXR0YWNrKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlQWJvdmUgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVBYm92ZSA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBwcmVkaWN0U2hpcExvY2F0aW9uKGxBdHRhY2tJbmRleCArIDEwKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzcXVhcmVCZWxvdyA9PT0gdW5kZWZpbmVkIHx8IHNxdWFyZUJlbG93ID09PSBcIk1pc3NcIikgJiZcbiAgICAgICAgICBzcXVhcmVBYm92ZSA9PT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMTApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNxdWFyZUxlZnQgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVMZWZ0ID09PSBcIk1pc3NcIikgJiZcbiAgICAgICAgICBzcXVhcmVSaWdodCA9PT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4ICsgMSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc3F1YXJlUmlnaHQgPT09IHVuZGVmaW5lZCB8fCBzcXVhcmVSaWdodCA9PT0gXCJNaXNzXCIpICYmXG4gICAgICAgICAgc3F1YXJlTGVmdCA9PT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4IC0gMSk7XG4gICAgICAgIGlmIChzcXVhcmVBYm92ZSAmJiBzcXVhcmVCZWxvdykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNxdWFyZUFib3ZlID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVCZWxvdyAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxMCksXG4gICAgICAgICAgICAgIGxBdHRhY2tJbmRleCArIDEwLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVCZWxvdyA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAgICAgc3F1YXJlQWJvdmUgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJIaXRcIlxuICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMTApLFxuICAgICAgICAgICAgICBsQXR0YWNrSW5kZXggLSAxMCxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNxdWFyZUxlZnQgJiYgc3F1YXJlUmlnaHQpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzcXVhcmVMZWZ0ID09PSBcIkhpdFwiICYmXG4gICAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICAgIHNxdWFyZVJpZ2h0ICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgc3F1YXJlUmlnaHQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgICBzcXVhcmVMZWZ0ICE9PSBcIkhpdFwiXG4gICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggLSAxKSxcbiAgICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZUFib3ZlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJNaXNzXCIgJiZcbiAgICAgICAgICBzcXVhcmVBYm92ZSAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMTApLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4IC0gMTAsXG4gICAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNxdWFyZUxlZnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZUxlZnQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlTGVmdCAhPT0gXCJIaXRcIlxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobEF0dGFja0luZGV4IC0gMSksXG4gICAgICAgICAgICBsQXR0YWNrSW5kZXggLSAxLFxuICAgICAgICAgIF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcXVhcmVSaWdodCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiTWlzc1wiICYmXG4gICAgICAgICAgc3F1YXJlUmlnaHQgIT09IFwiSGl0XCJcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGxBdHRhY2tJbmRleCArIDEpLFxuICAgICAgICAgICAgbEF0dGFja0luZGV4ICsgMSxcbiAgICAgICAgICBdO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3F1YXJlQmVsb3cgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIk1pc3NcIiAmJlxuICAgICAgICAgIHNxdWFyZUJlbG93ICE9PSBcIkhpdFwiXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhsQXR0YWNrSW5kZXggKyAxMCksXG4gICAgICAgICAgICBsQXR0YWNrSW5kZXggKyAxMCxcbiAgICAgICAgICBdO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzcXVhcmVBYm92ZSA9PT0gXCJIaXRcIiAmJlxuICAgICAgICAhZW5lbXlHYW1lYm9hcmQuc2hpcHNbXG4gICAgICAgICAgZW5lbXlHYW1lYm9hcmQuc2hpcFBvc2l0aW9uc1tsQXR0YWNrSW5kZXggLSAxMF1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggLSAxMCk7XG4gICAgICBpZiAoXG4gICAgICAgIHNxdWFyZUxlZnQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4IC0gMV1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggLSAxKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlUmlnaHQgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMV1cbiAgICAgICAgXS5pc1N1bmsoKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcHJlZGljdFNoaXBMb2NhdGlvbihsQXR0YWNrSW5kZXggKyAxKTtcbiAgICAgIGlmIChcbiAgICAgICAgc3F1YXJlQmVsb3cgPT09IFwiSGl0XCIgJiZcbiAgICAgICAgIWVuZW15R2FtZWJvYXJkLnNoaXBzW1xuICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnNoaXBQb3NpdGlvbnNbbEF0dGFja0luZGV4ICsgMTBdXG4gICAgICAgIF0uaXNTdW5rKClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obEF0dGFja0luZGV4ICsgMTApO1xuICAgICAgcmV0dXJuIHJhbmRvbUF0dGFjaygpO1xuICAgIH07XG4gICAgcmV0dXJuIHByZWRpY3RTaGlwTG9jYXRpb24obGFzdEF0dGFja0luZGV4KTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZUFJIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKHNoaXBMZW5ndGgpID0+ICh7XG4gIGxlbmd0aDogc2hpcExlbmd0aCxcbiAgaGl0czogMCxcbiAgc3VuazogZmFsc2UsXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgaWYgKHRoaXMuaXNTdW5rKCkgPT09IHRydWUpIHRoaXMuc3VuayA9IHRydWU7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgZ2FtZVNldHVwIGZyb20gXCIuL0RPTS1nYW1lYm9hcmRcIjtcblxuZ2FtZVNldHVwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=