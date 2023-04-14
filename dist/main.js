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
    const yourGrid = document.createElement("div");
    const yourGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
    placeShips(yourGameboard);
    for (let i = 0; i < 100; i += 1) {
      const square = document.createElement("div");
      square.classList.add("normal-square");
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
      if (yourGameboard.gameboard[i] !== "") {
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
    receiveAttack(coords) {
      const targetedSquare = this.positions.indexOf(coords);
      if (this.gameboard[targetedSquare]) {
        this.ships[this.gameboard[targetedSquare]].hit();
        this.gameboard[targetedSquare] = "Hit";
        return "Hit";
      }
      this.gameboard[targetedSquare] = "Miss";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzREFBZTtBQUN6QztBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRU87O0FBRWhDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCLDRCQUE0QixXQUFXLEVBQUUsRUFBRTtBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0M7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBLG1DQUFtQyxVQUFVLE1BQU0sWUFBWTtBQUMvRDtBQUNBO0FBQ0EsUUFBUTtBQUNSLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBLG1DQUFtQyxVQUFVO0FBQzdDLHNDQUFzQyxVQUFVLE1BQU0sWUFBWTtBQUNsRTtBQUNBO0FBQ0EsNkJBQTZCLGlEQUFVO0FBQ3ZDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlFQUFlLGVBQWUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0UvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7VUNkMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053Qzs7QUFFeEMsMERBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS1nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbi8vIFRFTVAgRlVOQyBGT1IgUExBQ0lORyBTSElQU1xuY29uc3QgcGxhY2VTaGlwcyA9IChnYW1lYm9hcmQpID0+IHtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImEzXCIsIFwiYTdcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJnMVwiLCBcImc0XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYzhcIiwgXCJlOFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImk2XCIsIFwiaThcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJiNFwiLCBcImM0XCIpO1xuICByZXR1cm4gZ2FtZWJvYXJkLmdhbWVib2FyZDtcbn07XG5cbmNvbnN0IGdhbWVTZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZVN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXN0YXJ0LWJ1dHRvblwiKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWNvbnRhaW5lclwiKTtcblxuICBnYW1lU3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBwYWdlQ29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbWlzc0xlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjb25zdCBoaXRMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbWlzc0xlZ2VuZC50ZXh0Q29udGVudCA9IFwiLzogTUlTU1wiO1xuICAgIGhpdExlZ2VuZC50ZXh0Q29udGVudCA9IFwiWDogSElUXCI7XG4gICAgbWlzc0xlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgaGl0TGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmQtaXRlbVwiKTtcbiAgICBsZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZFwiKTtcbiAgICBsZWdlbmQuYXBwZW5kQ2hpbGQobWlzc0xlZ2VuZCk7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKGhpdExlZ2VuZCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChsZWdlbmQpO1xuICAgIGNvbnN0IGdhbWVHcmlkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB5b3VyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgeW91ckdhbWVib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICAgIHBsYWNlU2hpcHMoeW91ckdhbWVib2FyZCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIGVuZW15R3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICBlbmVteUdyaWQuY2xhc3NMaXN0LmFkZChcImVuZW15LWdyaWRcIik7XG4gICAgY29uc3QgZW5lbXlHcmlkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGVuZW15R3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiRU5FTVkgR1JJRFwiO1xuICAgIGVuZW15R3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZC1oZWFkZXJcIik7XG4gICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKGVuZW15R3JpZEhlYWRlcik7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lLWdyaWRzLWNvbnRhaW5lclwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaWYgKHlvdXJHYW1lYm9hcmQuZ2FtZWJvYXJkW2ldICE9PSBcIlwiKSB7XG4gICAgICAgIGxldCBzaGlwU3F1YXJlID0geW91ckdhbWVib2FyZC5nYW1lYm9hcmRbaV07XG4gICAgICAgIHNoaXBTcXVhcmUgPSBzaGlwU3F1YXJlLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoc2hpcFNxdWFyZVsxXSk7XG4gICAgICB9IGVsc2Ugc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgeW91ckdyaWQuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZFwiKTtcbiAgICBjb25zdCB5b3VyR3JpZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB5b3VyR3JpZEhlYWRlci50ZXh0Q29udGVudCA9IFwiWU9VUiBHUklEXCI7XG4gICAgeW91ckdyaWRIZWFkZXIuY2xhc3NMaXN0LmFkZChcInlvdXItZ3JpZC1oZWFkZXJcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRIZWFkZXIpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh5b3VyR3JpZCk7XG4gICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lR3JpZHNDb250YWluZXIpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVTZXR1cDtcbiIsImltcG9ydCBjcmVhdGVTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCB0ZW1wUG9zaXRpb25zID0gW107XG4gIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqICs9IDEpIHtcbiAgICAgIHRlbXBQb3NpdGlvbnMucHVzaChgJHtsZXR0ZXJzW2ldfSR7an1gKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgdGVtcEdhbWVib2FyZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgdGVtcEdhbWVib2FyZC5wdXNoKFwiXCIpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcG9zaXRpb25zOiB0ZW1wUG9zaXRpb25zLFxuICAgIGdhbWVib2FyZDogdGVtcEdhbWVib2FyZCxcbiAgICBzaGlwczoge30sXG4gICAgc3ViRXhpc3RzOiBmYWxzZSxcbiAgICBwbGFjZVNoaXAoc3RhcnQsIGVuZCkge1xuICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2Yoc3RhcnQpO1xuICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKGVuZCk7XG4gICAgICBsZXQgc2hpcEluZm87XG4gICAgICBpZiAoKGVuZEluZGV4IC0gc3RhcnRJbmRleCkgJSAxMCA9PT0gMClcbiAgICAgICAgc2hpcEluZm8gPSBbKGVuZEluZGV4IC0gc3RhcnRJbmRleCkgLyAxMCArIDEsIFwidmVydFwiXTtcbiAgICAgIGVsc2Ugc2hpcEluZm8gPSBbZW5kSW5kZXggLSBzdGFydEluZGV4ICsgMSwgXCJob3JcIl07XG4gICAgICBsZXQgc2hpcE5hbWU7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDUpIHNoaXBOYW1lID0gXCJBaXJjcmFmdC1DYXJyaWVyXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDQpIHNoaXBOYW1lID0gXCJCYXR0bGVzaGlwXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViRXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuc3ViRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwTmFtZSA9IFwiU3VibWFyaW5lXCI7XG4gICAgICAgIH0gZWxzZSBzaGlwTmFtZSA9IFwiQ3J1aXNlclwiO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBJbmZvWzBdID09PSAyKSBzaGlwTmFtZSA9IFwiRGVzdHJveWVyXCI7XG4gICAgICBpZiAoc2hpcEluZm9bMV0gPT09IFwiaG9yXCIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleCArIDE7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChpID09PSBzdGFydEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLWxlZnQtc3F1YXJlYDtcbiAgICAgICAgICBlbHNlIGlmIChpID09PSBlbmRJbmRleClcbiAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkW2ldID0gYCR7c2hpcE5hbWV9IGVuZC1yaWdodC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gbWlkLSR7c2hpcEluZm9bMV19LXNxdWFyZWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxMCkge1xuICAgICAgICAgIGlmIChpID09PSBzdGFydEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXRvcC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLWJvdHRvbS1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gbWlkLSR7c2hpcEluZm9bMV19LXNxdWFyZWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2hpcHNbc2hpcE5hbWVdID0gY3JlYXRlU2hpcChzaGlwSW5mb1swXSk7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwc1tzaGlwTmFtZV07XG4gICAgfSxcbiAgICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuICAgICAgY29uc3QgdGFyZ2V0ZWRTcXVhcmUgPSB0aGlzLnBvc2l0aW9ucy5pbmRleE9mKGNvb3Jkcyk7XG4gICAgICBpZiAodGhpcy5nYW1lYm9hcmRbdGFyZ2V0ZWRTcXVhcmVdKSB7XG4gICAgICAgIHRoaXMuc2hpcHNbdGhpcy5nYW1lYm9hcmRbdGFyZ2V0ZWRTcXVhcmVdXS5oaXQoKTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmRbdGFyZ2V0ZWRTcXVhcmVdID0gXCJIaXRcIjtcbiAgICAgICAgcmV0dXJuIFwiSGl0XCI7XG4gICAgICB9XG4gICAgICB0aGlzLmdhbWVib2FyZFt0YXJnZXRlZFNxdWFyZV0gPSBcIk1pc3NcIjtcbiAgICAgIHJldHVybiBcIk1pc3NcIjtcbiAgICB9LFxuICAgIGFsbFN1bmsoKSB7XG4gICAgICBsZXQgYWxsU3VuayA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIGZvciAoY29uc3Qgc2hpcCBpbiB0aGlzLnNoaXBzKSB7XG4gICAgICAgIGlmICghdGhpcy5zaGlwc1tzaGlwXS5zdW5rKSBhbGxTdW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsU3VuaztcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlR2FtZWJvYXJkO1xuIiwiY29uc3QgY3JlYXRlU2hpcCA9IChzaGlwTGVuZ3RoKSA9PiAoe1xuICBsZW5ndGg6IHNoaXBMZW5ndGgsXG4gIGhpdHM6IDAsXG4gIHN1bms6IGZhbHNlLFxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIGlmICh0aGlzLmlzU3VuaygpID09PSB0cnVlKSB0aGlzLnN1bmsgPSB0cnVlO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnYW1lU2V0dXAgZnJvbSBcIi4vRE9NLWdhbWVib2FyZFwiO1xuXG5nYW1lU2V0dXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==