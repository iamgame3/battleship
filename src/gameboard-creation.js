import createShip from "./ship-creation";

const createGameboard = () => {
  const tempGameboard = [];
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 1; j < 11; j += 1) {
      tempGameboard.push(`${letters[i]}${j}`);
    }
  }
  return {
    gameboard: tempGameboard,
    placeShip(start, end) {
      const startIndex = this.gameboard.indexOf(start);
      const endIndex = this.gameboard.indexOf(end);
      const length = endIndex - startIndex + 1;
      let shipName;
      if (length === 5) shipName = "Aircraft Carrier";
      if (length === 4) shipName = "Battleship";
      if (length === 3) {
        if (this.ships.Submarine) shipName = "Cruiser";
        else shipName = "Submarine";
      }
      if (length === 2) shipName = "Destroyer";
      for (let i = startIndex; i < endIndex; i += 1) {
        this.gameboard[i] = shipName;
      }
      this.ships[shipName] = createShip(length);
    },
    ships: {},
  };
};

export default createGameboard;
