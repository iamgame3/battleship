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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


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
    const enemyGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    placeShips(enemyGameboard);
    const yourGrid = document.createElement("div");
    const yourGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    placeShips(yourGameboard);
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      square.classList.add("normal-square");
      square.setAttribute("data-id", i);
      square.addEventListener(
        "click",
        () => {
          const attackResult = enemyGameboard.receiveAttack(i);
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
    gameGridsContainer.classList.add("game-grids-container");
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      if (yourGameboard.gameboard[i]) {
        let shipSquare = yourGameboard.gameboard[i];
        shipSquare = shipSquare.split(" ");
        square.classList.add(shipSquare[1]);
      } else square.classList.add("normal-square");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0RBQWU7QUFDMUM7QUFDQTtBQUNBLDBCQUEwQixzREFBZTtBQUN6QztBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRk87O0FBRWhDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCLDRCQUE0QixXQUFXLEVBQUUsRUFBRTtBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0M7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBLG1DQUFtQyxVQUFVLE1BQU0sWUFBWTtBQUMvRDtBQUNBO0FBQ0EsUUFBUTtBQUNSLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBLG1DQUFtQyxVQUFVO0FBQzdDLHNDQUFzQyxVQUFVLE1BQU0sWUFBWTtBQUNsRTtBQUNBO0FBQ0EsNkJBQTZCLGlEQUFVO0FBQ3ZDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlFQUFlLGVBQWUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0UvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7VUNkMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053Qzs7QUFFeEMsMERBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS1nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbi8vIFRFTVAgRlVOQyBGT1IgUExBQ0lORyBTSElQU1xuY29uc3QgcGxhY2VTaGlwcyA9IChnYW1lYm9hcmQpID0+IHtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImEzXCIsIFwiYTdcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJnMVwiLCBcImc0XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYzhcIiwgXCJlOFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImk2XCIsIFwiaThcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJiNFwiLCBcImM0XCIpO1xuICByZXR1cm4gZ2FtZWJvYXJkLmdhbWVib2FyZDtcbn07XG5cbmNvbnN0IGdhbWVTZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXN0YXJ0LWJ1dHRvblwiKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcblxuICBnYW1lU3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwYWdlQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbWlzc0xlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjb25zdCBoaXRMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbWlzc0xlZ2VuZC50ZXh0Q29udGVudCA9IFwiLzogTUlTU1wiO1xuICAgIGhpdExlZ2VuZC50ZXh0Q29udGVudCA9IFwiWDogSElUXCI7XG4gICAgbWlzc0xlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgaGl0TGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBsZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZFwiKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQobWlzc0xlZ2VuZCk7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKGhpdExlZ2VuZCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChsZWdlbmQpO1xuICAgIGNvbnN0IGdhbWVHcmlkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBlbmVteUdhbWVib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICAgIHBsYWNlU2hpcHMoZW5lbXlHYW1lYm9hcmQpO1xuICAgIGNvbnN0IHlvdXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB5b3VyR2FtZWJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG4gICAgcGxhY2VTaGlwcyh5b3VyR2FtZWJvYXJkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaSk7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhpKTtcbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0ID09PSBcIkhpdFwiKSB7XG4gICAgICAgICAgICBzcXVhcmUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9IFwiZGFya2dyYXlcIjtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkXCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBlbmVteUdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIkVORU1ZIEdSSURcIjtcbiAgICBlbmVteUdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWQtaGVhZGVyXCIpO1xuICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChlbmVteUdyaWRIZWFkZXIpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1ncmlkcy1jb250YWluZXJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGlmICh5b3VyR2FtZWJvYXJkLmdhbWVib2FyZFtpXSkge1xuICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdXJHYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgICBzaGlwU3F1YXJlID0gc2hpcFNxdWFyZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHNoaXBTcXVhcmVbMV0pO1xuICAgICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIHlvdXJHcmlkLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWRcIik7XG4gICAgY29uc3QgeW91ckdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgeW91ckdyaWRIZWFkZXIudGV4dENvbnRlbnQgPSBcIllPVVIgR1JJRFwiO1xuICAgIHlvdXJHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJ5b3VyLWdyaWQtaGVhZGVyXCIpO1xuICAgIHlvdXJHcmlkLmFwcGVuZENoaWxkKHlvdXJHcmlkSGVhZGVyKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgICBnYW1lR3JpZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoeW91ckdyaWQpO1xuICAgIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUdyaWRzQ29udGFpbmVyKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lU2V0dXA7XG4iLCJpbXBvcnQgY3JlYXRlU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgdGVtcFBvc2l0aW9ucyA9IFtdO1xuICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaiArPSAxKSB7XG4gICAgICB0ZW1wUG9zaXRpb25zLnB1c2goYCR7bGV0dGVyc1tpXX0ke2p9YCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHRlbXBHYW1lYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgIHRlbXBHYW1lYm9hcmQucHVzaChcIlwiKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHBvc2l0aW9uczogdGVtcFBvc2l0aW9ucyxcbiAgICBnYW1lYm9hcmQ6IHRlbXBHYW1lYm9hcmQsXG4gICAgc2hpcHM6IHt9LFxuICAgIHN1YkV4aXN0czogZmFsc2UsXG4gICAgcGxhY2VTaGlwKHN0YXJ0LCBlbmQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihlbmQpO1xuICAgICAgbGV0IHNoaXBJbmZvO1xuICAgICAgaWYgKChlbmRJbmRleCAtIHN0YXJ0SW5kZXgpICUgMTAgPT09IDApXG4gICAgICAgIHNoaXBJbmZvID0gWyhlbmRJbmRleCAtIHN0YXJ0SW5kZXgpIC8gMTAgKyAxLCBcInZlcnRcIl07XG4gICAgICBlbHNlIHNoaXBJbmZvID0gW2VuZEluZGV4IC0gc3RhcnRJbmRleCArIDEsIFwiaG9yXCJdO1xuICAgICAgbGV0IHNoaXBOYW1lO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA1KSBzaGlwTmFtZSA9IFwiQWlyY3JhZnQtQ2FycmllclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSA0KSBzaGlwTmFtZSA9IFwiQmF0dGxlc2hpcFwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAzKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YkV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnN1YkV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgc2hpcE5hbWUgPSBcIlN1Ym1hcmluZVwiO1xuICAgICAgICB9IGVsc2Ugc2hpcE5hbWUgPSBcIkNydWlzZXJcIjtcbiAgICAgIH1cbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMikgc2hpcE5hbWUgPSBcIkRlc3Ryb3llclwiO1xuICAgICAgaWYgKHNoaXBJbmZvWzFdID09PSBcImhvclwiKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1sZWZ0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtcmlnaHQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMTApIHtcbiAgICAgICAgICBpZiAoaSA9PT0gc3RhcnRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC10b3Atc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1ib3R0b20tc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IG1pZC0ke3NoaXBJbmZvWzFdfS1zcXVhcmVgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBzW3NoaXBOYW1lXSA9IGNyZWF0ZVNoaXAoc2hpcEluZm9bMF0pO1xuICAgICAgcmV0dXJuIHRoaXMuc2hpcHNbc2hpcE5hbWVdO1xuICAgIH0sXG4gICAgcmVjZWl2ZUF0dGFjayhnYW1lYm9hcmRJbmRleCkge1xuICAgICAgaWYgKHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSkge1xuICAgICAgICBjb25zdCBhdHRhY2tlZFNoaXAgPSB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0uc3BsaXQoXCIgXCIpO1xuICAgICAgICB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaGl0KCk7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkW2dhbWVib2FyZEluZGV4XSA9IFwiSGl0XCI7XG4gICAgICAgIHJldHVybiBcIkhpdFwiO1xuICAgICAgfVxuICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJNaXNzXCI7XG4gICAgICByZXR1cm4gXCJNaXNzXCI7XG4gICAgfSxcbiAgICBhbGxTdW5rKCkge1xuICAgICAgbGV0IGFsbFN1bmsgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXRoaXMuc2hpcHNbc2hpcF0uc3VuaykgYWxsU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbFN1bms7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAoc2hpcExlbmd0aCkgPT4gKHtcbiAgbGVuZ3RoOiBzaGlwTGVuZ3RoLFxuICBoaXRzOiAwLFxuICBzdW5rOiBmYWxzZSxcbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgICBpZiAodGhpcy5pc1N1bmsoKSA9PT0gdHJ1ZSkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZVNldHVwIGZyb20gXCIuL0RPTS1nYW1lYm9hcmRcIjtcblxuZ2FtZVNldHVwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=