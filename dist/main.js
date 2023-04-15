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
          const attackResult = enemy.gameboard.receiveAttack(i);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndDOztBQUV4QywwREFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLWdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVBsYXllciwgY3JlYXRlQUkgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbi8vIFRFTVAgRlVOQyBGT1IgUExBQ0lORyBTSElQU1xuY29uc3QgcGxhY2VTaGlwcyA9IChnYW1lYm9hcmQpID0+IHtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImEzXCIsIFwiYTdcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJnMVwiLCBcImc0XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYzhcIiwgXCJlOFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImk2XCIsIFwiaThcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJiNFwiLCBcImM0XCIpO1xuICByZXR1cm4gZ2FtZWJvYXJkLmdhbWVib2FyZDtcbn07XG5cbmNvbnN0IGdhbWVTZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXN0YXJ0LWJ1dHRvblwiKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcblxuICBnYW1lU3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwYWdlQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbWlzc0xlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjb25zdCBoaXRMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbWlzc0xlZ2VuZC50ZXh0Q29udGVudCA9IFwiLzogTUlTU1wiO1xuICAgIGhpdExlZ2VuZC50ZXh0Q29udGVudCA9IFwiWDogSElUXCI7XG4gICAgbWlzc0xlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgaGl0TGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBsZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZFwiKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQobWlzc0xlZ2VuZCk7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKGhpdExlZ2VuZCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChsZWdlbmQpO1xuICAgIGNvbnN0IGdhbWVHcmlkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlbmVteSA9IGNyZWF0ZUFJKCk7XG4gICAgcGxhY2VTaGlwcyhlbmVteS5nYW1lYm9hcmQpO1xuICAgIGNvbnN0IHlvdXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB5b3UgPSBjcmVhdGVQbGF5ZXIoKTtcbiAgICBwbGFjZVNoaXBzKHlvdS5nYW1lYm9hcmQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSBlbmVteS5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhpKTtcbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0ID09PSBcIkhpdFwiKSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9IFwiZGFya2dyYXlcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkXCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlbmVteUdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkVORU1ZIEdSSURcIjtcbiAgICBlbmVteUdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtaGVhZGVyXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRIZWFkZXIpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IGZhbHNlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogZmFsc2UsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gZW5lbXkuYXR0YWNrKHlvdS5nYW1lYm9hcmQpO1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLWlkPScke2F0dGFja1Jlc3VsdFsxXX0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGF0dGFja1Jlc3VsdFswXSA9PT0gXCJIaXRcIikge1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJkYXJrZ3JheVwiO1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwMCk7XG4gICAgfTtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVuZW15R3JpZCwgY29uZmlnKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImdhbWUtZ3JpZHMtY29udGFpbmVyXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBpZiAoeW91LmdhbWVib2FyZC5nYW1lYm9hcmRbaV0pIHtcbiAgICAgICAgbGV0IHNoaXBTcXVhcmUgPSB5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXTtcbiAgICAgICAgc2hpcFNxdWFyZSA9IHNoaXBTcXVhcmUuc3BsaXQoXCIgXCIpO1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChzaGlwU3F1YXJlWzFdKTtcbiAgICAgIH0gZWxzZSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm5vcm1hbC1zcXVhcmVcIik7XG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBpKTtcbiAgICAgIHNxdWFyZS5zdHlsZS5mb250U2l6ZSA9IFwiNDBweFwiO1xuICAgICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgeW91ckdyaWQuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZFwiKTtcbiAgICBjb25zdCB5b3VyR3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB5b3VyR3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiWU9VUiBHUklEXCI7XG4gICAgeW91ckdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZC1oZWFkZXJcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRIZWFkZXIpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh5b3VyR3JpZCk7XG4gICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lR3JpZHNDb250YWluZXIpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVTZXR1cDtcbiIsImltcG9ydCBjcmVhdGVTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCB0ZW1wUG9zaXRpb25zID0gW107XG4gIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqICs9IDEpIHtcbiAgICAgIHRlbXBQb3NpdGlvbnMucHVzaChgJHtsZXR0ZXJzW2ldfSR7an1gKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgdGVtcEdhbWVib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgdGVtcEdhbWVib2FyZC5wdXNoKFwiXCIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcG9zaXRpb25zOiB0ZW1wUG9zaXRpb25zLFxuICAgIGdhbWVib2FyZDogdGVtcEdhbWVib2FyZCxcbiAgICBzaGlwczoge30sXG4gICAgc3ViRXhpc3RzOiBmYWxzZSxcbiAgICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2Yoc3RhcnQpO1xuICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKGVuZCk7XG4gICAgICBsZXQgc2hpcEluZm87XG4gICAgICBpZiAoKGVuZEluZGV4IC0gc3RhcnRJbmRleCkgJSAxMCA9PT0gMClcbiAgICAgICAgc2hpcEluZm8gPSBbKGVuZEluZGV4IC0gc3RhcnRJbmRleCkgLyAxMCArIDEsIFwidmVydFwiXTtcbiAgICAgIGVsc2Ugc2hpcEluZm8gPSBbZW5kSW5kZXggLSBzdGFydEluZGV4ICsgMSwgXCJob3JcIl07XG4gICAgICBsZXQgc2hpcE5hbWU7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDUpIHNoaXBOYW1lID0gXCJBaXJjcmFmdC1DYXJyaWVyXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDQpIHNoaXBOYW1lID0gXCJCYXR0bGVzaGlwXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViRXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuc3ViRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwTmFtZSA9IFwiU3VibWFyaW5lXCI7XG4gICAgICAgIH0gZWxzZSBzaGlwTmFtZSA9IFwiQ3J1aXNlclwiO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAyKSBzaGlwTmFtZSA9IFwiRGVzdHJveWVyXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMV0gPT09IFwiaG9yXCIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChpID09PSBzdGFydEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLWxlZnQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1yaWdodC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gbWlkLSR7c2hpcEluZm9bMV19LXNxdWFyZWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxMCkge1xuICAgICAgICAgIGlmIChpID09PSBzdGFydEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXRvcC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLWJvdHRvbS1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gbWlkLSR7c2hpcEluZm9bMV19LXNxdWFyZWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2hpcHNbc2hpcE5hbWVdID0gY3JlYXRlU2hpcChzaGlwSW5mb1swXSk7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwc1tzaGlwTmFtZV07XG4gICAgfSxcbiAgICByZWNlaXZlQXR0YWNrKGdhbWVib2FyZEluZGV4KSB7XG4gICAgICBpZiAodGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdKSB7XG4gICAgICAgIGNvbnN0IGF0dGFja2VkU2hpcCA9IHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XS5zcGxpdChcIiBcIik7XG4gICAgICAgIHRoaXMuc2hpcHNbYXR0YWNrZWRTaGlwWzBdXS5oaXQoKTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJIaXRcIjtcbiAgICAgICAgcmV0dXJuIFwiSGl0XCI7XG4gICAgICB9XG4gICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIk1pc3NcIjtcbiAgICAgIHJldHVybiBcIk1pc3NcIjtcbiAgICB9LFxuICAgIGFsbFN1bmsoKSB7XG4gICAgICBsZXQgYWxsU3VuayA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGlwc1tzaGlwXS5zdW5rKSBhbGxTdW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsU3VuaztcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZWJvYXJkO1xuIiwiaW1wb3J0IGNyZWF0ZUdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgY3JlYXRlUGxheWVyID0gKCkgPT4gKHtcbiAgZ2FtZWJvYXJkOiBjcmVhdGVHYW1lYm9hcmQoKSxcbiAgYXR0YWNrKGVuZW15R2FtZWJvYXJkLCBjb29yZHMpIHtcbiAgICByZXR1cm4gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICB9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZUFJID0gKCkgPT4gKHtcbiAgZ2FtZWJvYXJkOiBjcmVhdGVHYW1lYm9hcmQoKSxcbiAgYXR0YWNrKGVuZW15R2FtZWJvYXJkKSB7XG4gICAgY29uc3QgcG9zaXRpb25zID0gZW5lbXlHYW1lYm9hcmQuZ2FtZWJvYXJkO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOTkpO1xuICAgICAgY29uc3QgcG9zc2libGVBdHRhY2sgPSBwb3NpdGlvbnNbcmFuZG9tTnVtYmVyXTtcbiAgICAgIGlmIChwb3NzaWJsZUF0dGFjayAhPT0gXCJIaXRcIiAmJiBwb3NzaWJsZUF0dGFjayAhPT0gXCJNaXNzXCIpIHtcbiAgICAgICAgcmV0dXJuIFtlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbU51bWJlciksIHJhbmRvbU51bWJlcl07XG4gICAgICB9XG4gICAgfVxuICB9LFxufSk7XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllciwgY3JlYXRlQUkgfTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAoc2hpcExlbmd0aCkgPT4gKHtcbiAgbGVuZ3RoOiBzaGlwTGVuZ3RoLFxuICBoaXRzOiAwLFxuICBzdW5rOiBmYWxzZSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICBpZiAodGhpcy5pc1N1bmsoKSA9PT0gdHJ1ZSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZVNldHVwIGZyb20gXCIuL0RPTS1nYW1lYm9hcmRcIjtcblxuZ2FtZVNldHVwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=