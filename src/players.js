import createGameboard from "./gameboard";

const createPlayer = () => ({
  gameboard: createGameboard(),
  attack(enemyGameboard, coords) {
    return enemyGameboard.receiveAttack(coords);
  },
});

const createAI = () => ({
  gameboard: createGameboard(),
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

export { createPlayer, createAI };
