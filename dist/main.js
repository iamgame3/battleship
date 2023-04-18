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
                winnerPopup.textContent = "PLAYER 1 WINS!";
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
    const callback = () => {
      setTimeout(() => {
        if (enemy.gameboard.allSunk() === true) return;
        const attackResult = enemy.attack(you.gameboard);
        const attackedSquare = document.querySelector(
          `[data-id='${attackResult[1]}']`
        );
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
              winnerPopup.textContent = "PLAYER 2 WINS!";
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
  return {
    positions: tempPositions,
    gameboard: tempGameboard,
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
  attack(enemyGameboard) {
    const positions = enemyGameboard.gameboard;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const randomNumber = Math.round(Math.random() * 99);
      const possibleAttack = positions[randomNumber];
      if (possibleAttack !== "Hit" && possibleAttack !== "Miss") {
        return [enemyGameboard.receiveAttack(randomNumber), randomNumber];
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsZUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGVzs7QUFFMUM7QUFDQSxhQUFhLHNEQUFlO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBLGFBQWEsc0RBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFaUM7Ozs7Ozs7Ozs7Ozs7OztBQ3hCbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZDFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7QUNmd0M7O0FBRXhDLDBEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00tZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVBSSB9IGZyb20gXCIuL3BsYXllcnNcIjtcbmltcG9ydCBleHBsb3Npb25TZnhTcmMgZnJvbSBcIi4vc2Z4L0V4cGxvc2lvbi53ZWJtXCI7XG5pbXBvcnQgd2F0ZXJEcm9wU2Z4U3JjIGZyb20gXCIuL3NmeC9XYXRlci1Ecm9wLndlYm1cIjtcbmltcG9ydCB2aWN0b3J5U2Z4U3JjIGZyb20gXCIuL3NmeC9WaWN0b3J5LndlYm1cIjtcblxuLy8gVEVNUCBGVU5DIEZPUiBQTEFDSU5HIFNISVBTXG5jb25zdCBwbGFjZVNoaXBzID0gKGdhbWVib2FyZCkgPT4ge1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYTNcIiwgXCJhN1wiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImcxXCIsIFwiZzRcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJjOFwiLCBcImU4XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiaTZcIiwgXCJpOFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImI0XCIsIFwiYzRcIik7XG4gIHJldHVybiBnYW1lYm9hcmQuZ2FtZWJvYXJkO1xufTtcblxuY29uc3QgZ2FtZVNldHVwID0gKCkgPT4ge1xuICBjb25zdCBnYW1lU3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc3RhcnQtYnV0dG9uXCIpO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtY29udGFpbmVyXCIpO1xuXG4gIGdhbWVTdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHBhZ2VDb250YWluZXIucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtaXNzTGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGNvbnN0IGhpdExlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBtaXNzTGVnZW5kLnRleHRDb250ZW50ID0gXCIvOiBNSVNTXCI7XG4gICAgaGl0TGVnZW5kLnRleHRDb250ZW50ID0gXCJYOiBISVRcIjtcbiAgICBtaXNzTGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBoaXRMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGxlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kXCIpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChtaXNzTGVnZW5kKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQoaGl0TGVnZW5kKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGxlZ2VuZCk7XG4gICAgY29uc3QgZ2FtZUdyaWRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlbmVteUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15ID0gY3JlYXRlQUkoKTtcbiAgICBwbGFjZVNoaXBzKGVuZW15LmdhbWVib2FyZCk7XG4gICAgY29uc3QgZW5lbXlHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW5lbXlHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRTdW5rKTtcbiAgICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgeW91ID0gY3JlYXRlUGxheWVyKCk7XG4gICAgcGxhY2VTaGlwcyh5b3UuZ2FtZWJvYXJkKTtcbiAgICBjb25zdCB5b3VyR3JpZFN1bmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHlvdXJHcmlkU3Vuay5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1zdW5rXCIpO1xuICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHlvdXJHcmlkU3Vuayk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgc3F1YXJlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IHlvdS5hdHRhY2soZW5lbXkuZ2FtZWJvYXJkLCBpKTtcbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdID09PSBcIkhpdFwiKSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgICBpZiAoZW5lbXkuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXhwbG9zaW9uU2Z4ID0gbmV3IEF1ZGlvKGV4cGxvc2lvblNmeFNyYyk7XG4gICAgICAgICAgICAgIGV4cGxvc2lvblNmeC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1bmtlblNoaXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICBzdW5rZW5TaGlwRE9NLnRleHRDb250ZW50ID0gYCR7YXR0YWNrUmVzdWx0WzJdfSBTVU5LIWA7XG4gICAgICAgICAgICAgIHN1bmtlblNoaXBET00uY2xhc3NMaXN0LmFkZChcInN1bmtlbi1zaGlwLXRleHRcIik7XG4gICAgICAgICAgICAgIGVuZW15R3JpZFN1bmsuYXBwZW5kQ2hpbGQoc3Vua2VuU2hpcERPTSk7XG4gICAgICAgICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmVyUG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHdpbm5lclBvcHVwLnRleHRDb250ZW50ID0gXCJQTEFZRVIgMSBXSU5TIVwiO1xuICAgICAgICAgICAgICAgIHdpbm5lclBvcHVwLmNsYXNzTGlzdC5hZGQoXCJ3aW5uZXItcG9wdXBcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQkFUVExFIEFHQUlOP1wiO1xuICAgICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcInJlc3RhcnQtYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgIHJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbiAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHdpbm5lclBvcHVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQod2lubmVyUG9wdXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpY3RvcnlTZnggPSBuZXcgQXVkaW8odmljdG9yeVNmeFNyYyk7XG4gICAgICAgICAgICAgICAgdmljdG9yeVNmeC5wbGF5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgICAgIGNvbnN0IHdhdGVyRHJvcFNmeCA9IG5ldyBBdWRpbyh3YXRlckRyb3BTZnhTcmMpO1xuICAgICAgICAgICAgd2F0ZXJEcm9wU2Z4LnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZFwiKTtcbiAgICBjb25zdCBlbmVteUdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZW5lbXlHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJFTkVNWSBHUklEXCI7XG4gICAgZW5lbXlHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLWhlYWRlclwiKTtcbiAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkSGVhZGVyKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChlbmVteS5nYW1lYm9hcmQuYWxsU3VuaygpID09PSB0cnVlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15LmF0dGFjayh5b3UuZ2FtZWJvYXJkKTtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1pZD0nJHthdHRhY2tSZXN1bHRbMV19J11gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICBpZiAoeW91LmdhbWVib2FyZC5hbGxTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBleHBsb3Npb25TZnggPSBuZXcgQXVkaW8oZXhwbG9zaW9uU2Z4U3JjKTtcbiAgICAgICAgICAgIGV4cGxvc2lvblNmeC5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1bmtlblNoaXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc3Vua2VuU2hpcERPTS50ZXh0Q29udGVudCA9IGAke2F0dGFja1Jlc3VsdFswXVsyXX0gU1VOSyFgO1xuICAgICAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgICAgIHlvdXJHcmlkU3Vuay5hcHBlbmRDaGlsZChzdW5rZW5TaGlwRE9NKTtcbiAgICAgICAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjb25zdCB3aW5uZXJQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLnRleHRDb250ZW50ID0gXCJQTEFZRVIgMiBXSU5TIVwiO1xuICAgICAgICAgICAgICB3aW5uZXJQb3B1cC5jbGFzc0xpc3QuYWRkKFwid2lubmVyLXBvcHVwXCIpO1xuICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQkFUVExFIEFHQUlOP1wiO1xuICAgICAgICAgICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZXN0YXJ0LWJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgcmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHNcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdpbm5lclBvcHVwLmFwcGVuZENoaWxkKHJlc3RhcnRCdXR0b24pO1xuICAgICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHdpbm5lclBvcHVwKTtcbiAgICAgICAgICAgICAgY29uc3QgdmljdG9yeVNmeCA9IG5ldyBBdWRpbyh2aWN0b3J5U2Z4U3JjKTtcbiAgICAgICAgICAgICAgdmljdG9yeVNmeC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgICBjb25zdCB3YXRlckRyb3BTZnggPSBuZXcgQXVkaW8od2F0ZXJEcm9wU2Z4U3JjKTtcbiAgICAgICAgICB3YXRlckRyb3BTZngucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIG9ic2VydmVyLm9ic2VydmUoZW5lbXlHcmlkLCBjb25maWcpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1ncmlkcy1jb250YWluZXJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSkge1xuICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgICBzaGlwU3F1YXJlID0gc2hpcFNxdWFyZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHNoaXBTcXVhcmVbMV0pO1xuICAgICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGkpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCI0MHB4XCI7XG4gICAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICB5b3VyR3JpZC5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkXCIpO1xuICAgIGNvbnN0IHlvdXJHcmlkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHlvdXJHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJZT1VSIEdSSURcIjtcbiAgICB5b3VyR3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkLWhlYWRlclwiKTtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZEhlYWRlcik7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZCk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHlvdXJHcmlkKTtcbiAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVHcmlkc0NvbnRhaW5lcik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVNldHVwO1xuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHRlbXBQb3NpdGlvbnMgPSBbXTtcbiAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGogKz0gMSkge1xuICAgICAgdGVtcFBvc2l0aW9ucy5wdXNoKGAke2xldHRlcnNbaV19JHtqfWApO1xuICAgIH1cbiAgfVxuICBjb25zdCB0ZW1wR2FtZWJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICB0ZW1wR2FtZWJvYXJkLnB1c2goXCJcIik7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbnM6IHRlbXBQb3NpdGlvbnMsXG4gICAgZ2FtZWJvYXJkOiB0ZW1wR2FtZWJvYXJkLFxuICAgIHNoaXBzOiB7fSxcbiAgICBzdWJFeGlzdHM6IGZhbHNlLFxuICAgIHBsYWNlU2hpcChzdGFydCwgZW5kKSB7XG4gICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihzdGFydCk7XG4gICAgICBjb25zdCBlbmRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2YoZW5kKTtcbiAgICAgIGxldCBzaGlwSW5mbztcbiAgICAgIGlmICgoZW5kSW5kZXggLSBzdGFydEluZGV4KSAlIDEwID09PSAwKVxuICAgICAgICBzaGlwSW5mbyA9IFsoZW5kSW5kZXggLSBzdGFydEluZGV4KSAvIDEwICsgMSwgXCJ2ZXJ0XCJdO1xuICAgICAgZWxzZSBzaGlwSW5mbyA9IFtlbmRJbmRleCAtIHN0YXJ0SW5kZXggKyAxLCBcImhvclwiXTtcbiAgICAgIGxldCBzaGlwTmFtZTtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNSkgc2hpcE5hbWUgPSBcIkFpcmNyYWZ0LUNhcnJpZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNCkgc2hpcE5hbWUgPSBcIkJhdHRsZXNoaXBcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMykge1xuICAgICAgICBpZiAodGhpcy5zdWJFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5zdWJFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgIHNoaXBOYW1lID0gXCJTdWJtYXJpbmVcIjtcbiAgICAgICAgfSBlbHNlIHNoaXBOYW1lID0gXCJDcnVpc2VyXCI7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDIpIHNoaXBOYW1lID0gXCJEZXN0cm95ZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1sxXSA9PT0gXCJob3JcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtbGVmdC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXJpZ2h0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEwKSB7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtdG9wLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtYm90dG9tLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zaGlwc1tzaGlwTmFtZV0gPSBjcmVhdGVTaGlwKHNoaXBJbmZvWzBdKTtcbiAgICAgIHJldHVybiB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZWJvYXJkSW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0pIHtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdGhpcy5zaGlwc1thdHRhY2tlZFNoaXBbMF1dLmhpdCgpO1xuICAgICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIkhpdFwiO1xuICAgICAgICBjb25zdCBpc1N1bmsgPSB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaXNTdW5rKCk7XG4gICAgICAgIHJldHVybiBbXCJIaXRcIiwgaXNTdW5rLCBhdHRhY2tlZFNoaXBbMF1dO1xuICAgICAgfVxuICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJNaXNzXCI7XG4gICAgICByZXR1cm4gW1wiTWlzc1wiLCBmYWxzZV07XG4gICAgfSxcbiAgICBhbGxTdW5rKCkge1xuICAgICAgbGV0IGFsbFN1bmsgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXRoaXMuc2hpcHNbc2hpcF0uc3VuaykgYWxsU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbFN1bms7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVib2FyZDtcbiIsImltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IGNyZWF0ZVBsYXllciA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgY29vcmRzKSB7XG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjcmVhdGVBSSA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCkge1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgIGNvbnN0IHBvc3NpYmxlQXR0YWNrID0gcG9zaXRpb25zW3JhbmRvbU51bWJlcl07XG4gICAgICBpZiAocG9zc2libGVBdHRhY2sgIT09IFwiSGl0XCIgJiYgcG9zc2libGVBdHRhY2sgIT09IFwiTWlzc1wiKSB7XG4gICAgICAgIHJldHVybiBbZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21OdW1iZXIpLCByYW5kb21OdW1iZXJdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZUFJIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKHNoaXBMZW5ndGgpID0+ICh7XG4gIGxlbmd0aDogc2hpcExlbmd0aCxcbiAgaGl0czogMCxcbiAgc3VuazogZmFsc2UsXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgaWYgKHRoaXMuaXNTdW5rKCkgPT09IHRydWUpIHRoaXMuc3VuayA9IHRydWU7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgZ2FtZVNldHVwIGZyb20gXCIuL0RPTS1nYW1lYm9hcmRcIjtcblxuZ2FtZVNldHVwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=