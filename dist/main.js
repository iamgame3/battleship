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
            if (attackResult[1] === true) {
              const sunkenShipDOM = document.createElement("div");
              sunkenShipDOM.textContent = `${attackResult[2]} SUNK!`;
              sunkenShipDOM.classList.add("sunken-ship-text");
              enemyGridSunk.appendChild(sunkenShipDOM);
            }
          } else {
            square.style.color = "gray";
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
        if (attackResult[0][0] === "Hit") {
          attackedSquare.style.color = "red";
          attackedSquare.textContent = "X";
          if (attackResult[0][1] === true) {
            const sunkenShipDOM = document.createElement("div");
            sunkenShipDOM.textContent = `${attackResult[0][2]} SUNK!`;
            sunkenShipDOM.classList.add("sunken-ship-text");
            yourGridSunk.appendChild(sunkenShipDOM);
          }
        } else {
          attackedSquare.style.color = "gray";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053Qzs7QUFFeEMsMERBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS1nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZUFJIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuXG4vLyBURU1QIEZVTkMgRk9SIFBMQUNJTkcgU0hJUFNcbmNvbnN0IHBsYWNlU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJhM1wiLCBcImE3XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiZzFcIiwgXCJnNFwiKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcImM4XCIsIFwiZThcIik7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXCJpNlwiLCBcImk4XCIpO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFwiYjRcIiwgXCJjNFwiKTtcbiAgcmV0dXJuIGdhbWVib2FyZC5nYW1lYm9hcmQ7XG59O1xuXG5jb25zdCBnYW1lU2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVTdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1zdGFydC1idXR0b25cIik7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1jb250YWluZXJcIik7XG5cbiAgZ2FtZVN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcGFnZUNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1pc3NMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29uc3QgaGl0TGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG1pc3NMZWdlbmQudGV4dENvbnRlbnQgPSBcIi86IE1JU1NcIjtcbiAgICBoaXRMZWdlbmQudGV4dENvbnRlbnQgPSBcIlg6IEhJVFwiO1xuICAgIG1pc3NMZWdlbmQuY2xhc3NMaXN0LmFkZChcImxlZ2VuZC1pdGVtXCIpO1xuICAgIGhpdExlZ2VuZC5jbGFzc0xpc3QuYWRkKFwibGVnZW5kLWl0ZW1cIik7XG4gICAgbGVnZW5kLmNsYXNzTGlzdC5hZGQoXCJsZWdlbmRcIik7XG4gICAgbGVnZW5kLmFwcGVuZENoaWxkKG1pc3NMZWdlbmQpO1xuICAgIGxlZ2VuZC5hcHBlbmRDaGlsZChoaXRMZWdlbmQpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobGVnZW5kKTtcbiAgICBjb25zdCBnYW1lR3JpZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgZW5lbXkgPSBjcmVhdGVBSSgpO1xuICAgIHBsYWNlU2hpcHMoZW5lbXkuZ2FtZWJvYXJkKTtcbiAgICBjb25zdCBlbmVteUdyaWRTdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbmVteUdyaWRTdW5rLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLXN1bmtcIik7XG4gICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKGVuZW15R3JpZFN1bmspO1xuICAgIGNvbnN0IHlvdXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCB5b3UgPSBjcmVhdGVQbGF5ZXIoKTtcbiAgICBwbGFjZVNoaXBzKHlvdS5nYW1lYm9hcmQpO1xuICAgIGNvbnN0IHlvdXJHcmlkU3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgeW91ckdyaWRTdW5rLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLXN1bmtcIik7XG4gICAgeW91ckdyaWQuYXBwZW5kQ2hpbGQoeW91ckdyaWRTdW5rKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJub3JtYWwtc3F1YXJlXCIpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgICBzcXVhcmUuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYXR0YWNrUmVzdWx0ID0geW91LmF0dGFjayhlbmVteS5nYW1lYm9hcmQsIGkpO1xuICAgICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICAgIHNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc3Vua2VuU2hpcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgIHN1bmtlblNoaXBET00udGV4dENvbnRlbnQgPSBgJHthdHRhY2tSZXN1bHRbMl19IFNVTkshYDtcbiAgICAgICAgICAgICAgc3Vua2VuU2hpcERPTS5jbGFzc0xpc3QuYWRkKFwic3Vua2VuLXNoaXAtdGV4dFwiKTtcbiAgICAgICAgICAgICAgZW5lbXlHcmlkU3Vuay5hcHBlbmRDaGlsZChzdW5rZW5TaGlwRE9NKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKFwiZW5lbXktZ3JpZFwiKTtcbiAgICBjb25zdCBlbmVteUdyaWRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgZW5lbXlHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJFTkVNWSBHUklEXCI7XG4gICAgZW5lbXlHcmlkSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1ncmlkLWhlYWRlclwiKTtcbiAgICBlbmVteUdyaWQuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkSGVhZGVyKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgY2hpbGRMaXN0OiBmYWxzZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dGFja1Jlc3VsdCA9IGVuZW15LmF0dGFjayh5b3UuZ2FtZWJvYXJkKTtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1pZD0nJHthdHRhY2tSZXN1bHRbMV19J11gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChhdHRhY2tSZXN1bHRbMF1bMF0gPT09IFwiSGl0XCIpIHtcbiAgICAgICAgICBhdHRhY2tlZFNxdWFyZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICBpZiAoYXR0YWNrUmVzdWx0WzBdWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBzdW5rZW5TaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHN1bmtlblNoaXBET00udGV4dENvbnRlbnQgPSBgJHthdHRhY2tSZXN1bHRbMF1bMl19IFNVTkshYDtcbiAgICAgICAgICAgIHN1bmtlblNoaXBET00uY2xhc3NMaXN0LmFkZChcInN1bmtlbi1zaGlwLXRleHRcIik7XG4gICAgICAgICAgICB5b3VyR3JpZFN1bmsuYXBwZW5kQ2hpbGQoc3Vua2VuU2hpcERPTSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dGFja2VkU3F1YXJlLnN0eWxlLmNvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgYXR0YWNrZWRTcXVhcmUudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwKTtcbiAgICB9O1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIG9ic2VydmVyLm9ic2VydmUoZW5lbXlHcmlkLCBjb25maWcpO1xuICAgIGdhbWVHcmlkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1ncmlkcy1jb250YWluZXJcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGlmICh5b3UuZ2FtZWJvYXJkLmdhbWVib2FyZFtpXSkge1xuICAgICAgICBsZXQgc2hpcFNxdWFyZSA9IHlvdS5nYW1lYm9hcmQuZ2FtZWJvYXJkW2ldO1xuICAgICAgICBzaGlwU3F1YXJlID0gc2hpcFNxdWFyZS5zcGxpdChcIiBcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHNoaXBTcXVhcmVbMV0pO1xuICAgICAgfSBlbHNlIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibm9ybWFsLXNxdWFyZVwiKTtcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGkpO1xuICAgICAgc3F1YXJlLnN0eWxlLmZvbnRTaXplID0gXCI0MHB4XCI7XG4gICAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICB5b3VyR3JpZC5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkXCIpO1xuICAgIGNvbnN0IHlvdXJHcmlkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHlvdXJHcmlkSGVhZGVyLnRleHRDb250ZW50ID0gXCJZT1VSIEdSSURcIjtcbiAgICB5b3VyR3JpZEhlYWRlci5jbGFzc0xpc3QuYWRkKFwieW91ci1ncmlkLWhlYWRlclwiKTtcbiAgICB5b3VyR3JpZC5hcHBlbmRDaGlsZCh5b3VyR3JpZEhlYWRlcik7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZCk7XG4gICAgZ2FtZUdyaWRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHlvdXJHcmlkKTtcbiAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVHcmlkc0NvbnRhaW5lcik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZVNldHVwO1xuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHRlbXBQb3NpdGlvbnMgPSBbXTtcbiAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGogKz0gMSkge1xuICAgICAgdGVtcFBvc2l0aW9ucy5wdXNoKGAke2xldHRlcnNbaV19JHtqfWApO1xuICAgIH1cbiAgfVxuICBjb25zdCB0ZW1wR2FtZWJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICs9IDEpIHtcbiAgICB0ZW1wR2FtZWJvYXJkLnB1c2goXCJcIik7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbnM6IHRlbXBQb3NpdGlvbnMsXG4gICAgZ2FtZWJvYXJkOiB0ZW1wR2FtZWJvYXJkLFxuICAgIHNoaXBzOiB7fSxcbiAgICBzdWJFeGlzdHM6IGZhbHNlLFxuICAgIHBsYWNlU2hpcChzdGFydCwgZW5kKSB7XG4gICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wb3NpdGlvbnMuaW5kZXhPZihzdGFydCk7XG4gICAgICBjb25zdCBlbmRJbmRleCA9IHRoaXMucG9zaXRpb25zLmluZGV4T2YoZW5kKTtcbiAgICAgIGxldCBzaGlwSW5mbztcbiAgICAgIGlmICgoZW5kSW5kZXggLSBzdGFydEluZGV4KSAlIDEwID09PSAwKVxuICAgICAgICBzaGlwSW5mbyA9IFsoZW5kSW5kZXggLSBzdGFydEluZGV4KSAvIDEwICsgMSwgXCJ2ZXJ0XCJdO1xuICAgICAgZWxzZSBzaGlwSW5mbyA9IFtlbmRJbmRleCAtIHN0YXJ0SW5kZXggKyAxLCBcImhvclwiXTtcbiAgICAgIGxldCBzaGlwTmFtZTtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNSkgc2hpcE5hbWUgPSBcIkFpcmNyYWZ0LUNhcnJpZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gNCkgc2hpcE5hbWUgPSBcIkJhdHRsZXNoaXBcIjtcbiAgICAgIGlmIChzaGlwSW5mb1swXSA9PT0gMykge1xuICAgICAgICBpZiAodGhpcy5zdWJFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5zdWJFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgIHNoaXBOYW1lID0gXCJTdWJtYXJpbmVcIjtcbiAgICAgICAgfSBlbHNlIHNoaXBOYW1lID0gXCJDcnVpc2VyXCI7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcEluZm9bMF0gPT09IDIpIHNoaXBOYW1lID0gXCJEZXN0cm95ZXJcIjtcbiAgICAgIGlmIChzaGlwSW5mb1sxXSA9PT0gXCJob3JcIikge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4ICsgMTsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtbGVmdC1zcXVhcmVgO1xuICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGVuZEluZGV4KVxuICAgICAgICAgICAgdGhpcy5nYW1lYm9hcmRbaV0gPSBgJHtzaGlwTmFtZX0gZW5kLXJpZ2h0LXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXggKyAxOyBpICs9IDEwKSB7XG4gICAgICAgICAgaWYgKGkgPT09IHN0YXJ0SW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtdG9wLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSBpZiAoaSA9PT0gZW5kSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBlbmQtYm90dG9tLXNxdWFyZWA7XG4gICAgICAgICAgZWxzZSB0aGlzLmdhbWVib2FyZFtpXSA9IGAke3NoaXBOYW1lfSBtaWQtJHtzaGlwSW5mb1sxXX0tc3F1YXJlYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zaGlwc1tzaGlwTmFtZV0gPSBjcmVhdGVTaGlwKHNoaXBJbmZvWzBdKTtcbiAgICAgIHJldHVybiB0aGlzLnNoaXBzW3NoaXBOYW1lXTtcbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2soZ2FtZWJvYXJkSW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0pIHtcbiAgICAgICAgY29uc3QgYXR0YWNrZWRTaGlwID0gdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgdGhpcy5zaGlwc1thdHRhY2tlZFNoaXBbMF1dLmhpdCgpO1xuICAgICAgICB0aGlzLmdhbWVib2FyZFtnYW1lYm9hcmRJbmRleF0gPSBcIkhpdFwiO1xuICAgICAgICBjb25zdCBpc1N1bmsgPSB0aGlzLnNoaXBzW2F0dGFja2VkU2hpcFswXV0uaXNTdW5rKCk7XG4gICAgICAgIHJldHVybiBbXCJIaXRcIiwgaXNTdW5rLCBhdHRhY2tlZFNoaXBbMF1dO1xuICAgICAgfVxuICAgICAgdGhpcy5nYW1lYm9hcmRbZ2FtZWJvYXJkSW5kZXhdID0gXCJNaXNzXCI7XG4gICAgICByZXR1cm4gW1wiTWlzc1wiLCBmYWxzZV07XG4gICAgfSxcbiAgICBhbGxTdW5rKCkge1xuICAgICAgbGV0IGFsbFN1bmsgPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBmb3IgKGNvbnN0IHNoaXAgaW4gdGhpcy5zaGlwcykge1xuICAgICAgICBpZiAoIXRoaXMuc2hpcHNbc2hpcF0uc3VuaykgYWxsU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbFN1bms7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVib2FyZDtcbiIsImltcG9ydCBjcmVhdGVHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IGNyZWF0ZVBsYXllciA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgY29vcmRzKSB7XG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgfSxcbn0pO1xuXG5jb25zdCBjcmVhdGVBSSA9ICgpID0+ICh7XG4gIGdhbWVib2FyZDogY3JlYXRlR2FtZWJvYXJkKCksXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCkge1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IGVuZW15R2FtZWJvYXJkLmdhbWVib2FyZDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDk5KTtcbiAgICAgIGNvbnN0IHBvc3NpYmxlQXR0YWNrID0gcG9zaXRpb25zW3JhbmRvbU51bWJlcl07XG4gICAgICBpZiAocG9zc2libGVBdHRhY2sgIT09IFwiSGl0XCIgJiYgcG9zc2libGVBdHRhY2sgIT09IFwiTWlzc1wiKSB7XG4gICAgICAgIHJldHVybiBbZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21OdW1iZXIpLCByYW5kb21OdW1iZXJdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pO1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZUFJIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKHNoaXBMZW5ndGgpID0+ICh7XG4gIGxlbmd0aDogc2hpcExlbmd0aCxcbiAgaGl0czogMCxcbiAgc3VuazogZmFsc2UsXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gICAgaWYgKHRoaXMuaXNTdW5rKCkgPT09IHRydWUpIHRoaXMuc3VuayA9IHRydWU7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVTZXR1cCBmcm9tIFwiLi9ET00tZ2FtZWJvYXJkXCI7XG5cbmdhbWVTZXR1cCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9