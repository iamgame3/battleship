import createShip from "./ship-creation";

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
    placeShip(start, end) {
      const startIndex = this.positions.indexOf(start);
      const endIndex = this.positions.indexOf(end);
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
  };
};

export default createGameboard;
