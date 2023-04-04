import createGameboard from "./gameboard-creation";

const createPlayer = () => ({
  enemyBoard: createGameboard(),
  attack(coords) {
    return this.enemyBoard.receiveAttack(coords);
  },
});

const createAI = () => ({
  enemyBoard: createGameboard(),
  attack() {
    const { positions } = this.enemyBoard;
    while (true) {
      const randomCoords = positions[Math.round(Math.random * 100)];
      const possibleAttack = this.enemyBoard.gameboard[randomCoords];
      if (possibleAttack !== "Hit" && possibleAttack !== "Miss") {
        return this.enemyBoard.receiveAttack(possibleAttack);
      }
    }
  },
});

export { createPlayer, createAI };
