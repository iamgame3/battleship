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
    const yourGrid = document.createElement("div");
    const you = (0,_players__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
    placeShips(you.gameboard);
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      square.classList.add("normal-square");
      square.style.fontSize = "20px";
      square.addEventListener(
        "click",
        () => {
          const attackResult = you.attack(enemy.gameboard, i);
          if (attackResult === "Hit") {
            square.style.color = "red";
            square.textContent = "X";
          } else {
            square.style.color = "darkgray";
            square.textContent = "/";
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
        const attackResult = enemy.attack(you.gameboard);
        const attackedSquare = document.querySelector(
          `[data-id='${attackResult[1]}']`
        );
        if (attackResult[0] === "Hit") {
          attackedSquare.style.color = "red";
          attackedSquare.textContent = "X";
        } else {
          attackedSquare.style.color = "darkgray";
          attackedSquare.textContent = "/";
        }
      }, 500);
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
        return "Hit";
      }
      this.gameboard[gameboardIndex] = "Miss";
      return "Miss";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QywwREFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLWdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVBsYXllciwgY3JlYXRlQUkgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbi8vIFRFTVAgRlVOQyBGT1IgUExBQ0lORyBTSElQU1xuY29uc3QgcGxhY2VTaGlwcyA9IChnYW1lYm9hcmQpID0+IHtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImEzXCIsIFwiYTdcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJnMVwiLCBcImc0XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYzhcIiwgXCJlOFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImk2XCIsIFwiaThcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJiNFwiLCBcImM0XCIpO1xuICByZXR1cm4gZ2FtZWJvYXJkLmdhbWVib2FyZDtcbn07XG5cbmNvbnN0IGdhbWVTZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXN0YXJ0LWJ1dHRvblwiKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcblxuICBnYW1lU3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwYWdlQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbWlzc0xlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjb25zdCBoaXRMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbWlzc0xlZ2VuZC50ZXh0Q29udGVudCA9IFwiLzogTUlTU1wiO1xuICAgIGhpdExlZ2VuZC50ZXh0Q29udGVudCA9IFwiWDogSElUXCI7XG4gICAgbWlzc0xlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgaGl0TGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBsZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZFwiKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQobWlzc0xlZ2VuZCk7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKGhpdExlZ2VuZCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChsZWdlbmQpO1xuICAgIGNvbnN0IGdhbWVHcmlkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlbmVteSA9IGNyZWF0ZUFJKCk7XG4gICAgcGxhY2VTaGlwcyhlbmVteS5nYW1lYm9hcmQpO1xuICAgIGNvbnN0IHlvdXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB5b3UgPSBjcmVhdGVQbGF5ZXIoKTtcbiAgICBwbGFjZVNoaXBzKHlvdS5nYW1lYm9hcmQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSB5b3UuYXR0YWNrKGVuZW15LmdhbWVib2FyZCwgaSk7XG4gICAgICAgICAgaWYgKGF0dGFja1Jlc3VsdCA9PT0gXCJIaXRcIikge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcImRhcmtncmF5XCI7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZFwiKTtcbiAgICBjb25zdCBlbmVteUdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZW5lbXlHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJFTkVNWSBHUklEXCI7XG4gICAgZW5lbXlHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLWhlYWRlclwiKTtcbiAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkSGVhZGVyKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15LmF0dGFjayh5b3UuZ2FtZWJvYXJkKTtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1pZD0nJHthdHRhY2tSZXN1bHRbMV19J11gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwiZGFya2dyYXlcIjtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICB9LCA1MDApO1xuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbmVteUdyaWQsIGNvbmZpZyk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lLWdyaWRzLWNvbnRhaW5lclwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldKSB7XG4gICAgICAgIGxldCBzaGlwU3F1YXJlID0geW91LmdhbWVib2FyZC5nYW1lYm9hcmRbaV07XG4gICAgICAgIHNoaXBTcXVhcmUgPSBzaGlwU3F1YXJlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgICB9IGVsc2Ugc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaSk7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjQwcHhcIjtcbiAgICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIHlvdXJHcmlkLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWRcIik7XG4gICAgY29uc3QgeW91ckdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgeW91ckdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIllPVVIgR1JJRFwiO1xuICAgIHlvdXJHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWQtaGVhZGVyXCIpO1xuICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHlvdXJHcmlkSGVhZGVyKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoeW91ckdyaWQpO1xuICAgIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUdyaWRzQ29udGFpbmVyKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lU2V0dXA7XG4iLCJpbXBvcnQgY3JlYXRlU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgdGVtcFBvc2l0aW9ucyA9IFtdO1xuICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaiArPSAxKSB7XG4gICAgICB0ZW1wUG9zaXRpb25zLnB1c2goYCR7bGV0dGVyc1tpXX0ke2p9YCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHRlbXBHYW1lYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIHRlbXBHYW1lYm9hcmQucHVzaChcIlwiKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHBvc2l0aW9uczogdGVtcFBvc2l0aW9ucyxcbiAgICBnYW1lYm9hcmQ6IHRlbXBHYW1lYm9hcmQsXG4gICAgc2hpcHM6IHt9LFxuICAgIHN1YkV4aXN0czogZmFsc2UsXG4gICAgcGxhY2VTaGlwKHN0YXJ0LCBlbmQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihlbmQpO1xuICAgICAgbGV0IHNoaXBJbmZvO1xuICAgICAgaWYgKChlbmRJbmRleCAtIHN0YXJ0SW5kZXgpICUgMTAgPT09IDApXG4gICAgICAgIHNoaXBJbmZvID0gWyhlbmRJbmRleCAtIHN0YXJ0SW5kZXgpIC8gMTAgKyAxLCBcInZlcnRcIl07XG4gICAgICBlbHNlIHNoaXBJbmZvID0gW2VuZEluZGV4IC0gc3RhcnRJbmRleCArIDEsIFwiaG9yXCJdO1xuICAgICAgbGV0IHNoaXBOYW1lO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA1KSBzaGlwTmFtZSA9IFwiQWlyY3JhZnQtQ2FycmllclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA0KSBzaGlwTmFtZSA9IFwiQmF0dGxlc2hpcFwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAzKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YkV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnN1YkV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgc2hpcE5hbWUgPSBcIlN1Ym1hcmluZVwiO1xuICAgICAgICB9IGVsc2Ugc2hpcE5hbWUgPSBcIkNydWlzZXJcIjtcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMikgc2hpcE5hbWUgPSBcIkRlc3Ryb3llclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzFdID09PSBcImhvclwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1sZWZ0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtcmlnaHQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMTApIHtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC10b3Atc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1ib3R0b20tc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBzW3NoaXBOYW1lXSA9IGNyZWF0ZVNoaXAoc2hpcEluZm9bMF0pO1xuICAgICAgcmV0dXJuIHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuICAgIH0sXG4gICAgcmVjZWl2ZUF0dGFjayhnYW1lYm9hcmRJbmRleCkge1xuICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSkge1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0uc3BsaXQoXCIgXCIpO1xuICAgICAgICB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaGl0KCk7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSA9IFwiSGl0XCI7XG4gICAgICAgIHJldHVybiBcIkhpdFwiO1xuICAgICAgfVxuICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJNaXNzXCI7XG4gICAgICByZXR1cm4gXCJNaXNzXCI7XG4gICAgfSxcbiAgICBhbGxTdW5rKCkge1xuICAgICAgbGV0IGFsbFN1bmsgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXRoaXMuc2hpcHNbc2hpcF0uc3VuaykgYWxsU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbFN1bms7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVib2FyZDtcbiIsImltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IGNyZWF0ZVBsYXllciA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgY29vcmRzKSB7XG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjcmVhdGVBSSA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCkge1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgIGNvbnN0IHBvc3NpYmxlQXR0YWNrID0gcG9zaXRpb25zW3JhbmRvbU51bWJlcl07XG4gICAgICBpZiAocG9zc2libGVBdHRhY2sgIT09IFwiSGl0XCIgJiYgcG9zc2libGVBdHRhY2sgIT09IFwiTWlzc1wiKSB7XG4gICAgICAgIHJldHVybiBbZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21OdW1iZXIpLCByYW5kb21OdW1iZXJdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZUFJIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKHNoaXBMZW5ndGgpID0+ICh7XG4gIGxlbmd0aDogc2hpcExlbmd0aCxcbiAgaGl0czogMCxcbiAgc3VuazogZmFsc2UsXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgaWYgKHRoaXMuaXNTdW5rKCkgPT09IHRydWUpIHRoaXMuc3VuayA9IHRydWU7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVTZXR1cCBmcm9tIFwiLi9ET00tZ2FtZWJvYXJkXCI7XG5cbmdhbWVTZXR1cCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9