import createGameboard from "./gameboard";

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
    // eslint-disable-next-line no-constant-condition
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
