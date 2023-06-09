/* eslint-disable no-constant-condition */
import createGameboard from "./gameboard";

const createPlayer = () => ({
  gameboard: createGameboard(),
  attack(enemyGameboard, coords) {
    return enemyGameboard.receiveAttack(coords);
  },
});

const createAI = () => ({
  gameboard: createGameboard(),
  attack(enemyGameboard, lastAttackIndex) {
    const positions = enemyGameboard.gameboard;
    const randomAttack = () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const randomNumber = Math.round(Math.random() * 99);
        const possibleAttack = positions[randomNumber];
        if (possibleAttack !== "Hit" && possibleAttack !== "Miss") {
          return [enemyGameboard.receiveAttack(randomNumber), randomNumber];
        }
      }
    };
    if (lastAttackIndex === undefined) return randomAttack();
    const predictShipLocation = (lAttackIndex) => {
      const squareAbove = positions[lAttackIndex - 10];
      const squareBelow = positions[lAttackIndex + 10];
      let squareLeft;
      let squareRight;
      if (lAttackIndex % 10 !== 0) squareLeft = positions[lAttackIndex - 1];
      if (lAttackIndex.toString().substring[1] !== "9")
        squareRight = positions[lAttackIndex + 1];
      if (positions[lAttackIndex] === "Hit") {
        if (
          enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex]
          ].isSunk()
        )
          return randomAttack();
        if (
          (squareAbove === undefined || squareAbove === "Miss") &&
          squareBelow === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex + 10]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex + 10);
        if (
          (squareBelow === undefined || squareBelow === "Miss") &&
          squareAbove === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex - 10]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex - 10);
        if (
          (squareLeft === undefined || squareLeft === "Miss") &&
          squareRight === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex + 1]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex + 1);
        if (
          (squareRight === undefined || squareRight === "Miss") &&
          squareLeft === "Hit" &&
          !enemyGameboard.ships[
            enemyGameboard.shipPositions[lAttackIndex - 1]
          ].isSunk()
        )
          return predictShipLocation(lAttackIndex - 1);
        if (squareAbove && squareBelow) {
          if (
            squareAbove === "Hit" &&
            squareBelow !== "Miss" &&
            squareBelow !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex + 10),
              lAttackIndex + 10,
            ];
          if (
            squareBelow === "Hit" &&
            squareAbove !== "Miss" &&
            squareAbove !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex - 10),
              lAttackIndex - 10,
            ];
        }
        if (squareLeft && squareRight) {
          if (
            squareLeft === "Hit" &&
            squareRight !== "Miss" &&
            squareRight !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex + 1),
              lAttackIndex + 1,
            ];
          if (
            squareRight === "Hit" &&
            squareLeft !== "Miss" &&
            squareLeft !== "Hit"
          )
            return [
              enemyGameboard.receiveAttack(lAttackIndex - 1),
              lAttackIndex - 1,
            ];
        }
        if (
          squareAbove !== undefined &&
          squareAbove !== "Miss" &&
          squareAbove !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex - 10),
            lAttackIndex - 10,
          ];
        if (
          squareLeft !== undefined &&
          squareLeft !== "Miss" &&
          squareLeft !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex - 1),
            lAttackIndex - 1,
          ];
        if (
          squareRight !== undefined &&
          squareRight !== "Miss" &&
          squareRight !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex + 1),
            lAttackIndex + 1,
          ];
        if (
          squareBelow !== undefined &&
          squareBelow !== "Miss" &&
          squareBelow !== "Hit"
        )
          return [
            enemyGameboard.receiveAttack(lAttackIndex + 10),
            lAttackIndex + 10,
          ];
      }
      if (
        squareAbove === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 20] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 10]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy -= 10;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy + 10);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareLeft === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 2] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 1]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy -= 1;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy + 1);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareRight === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 2] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 1]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy += 1;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy - 1);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareBelow === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 20] === "Hit" &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 10]
        ].isSunk()
      ) {
        let lAttackIndexCopy = lAttackIndex;
        while (true) {
          lAttackIndexCopy += 10;
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "")
            return predictShipLocation(lAttackIndexCopy - 10);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === "Miss")
            return predictShipLocation(lAttackIndexCopy);
          if (enemyGameboard.gameboard[lAttackIndexCopy] === undefined) break;
        }
      }
      if (
        squareAbove === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 20] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex - 20] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 10]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex - 10);
      if (
        squareLeft === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex - 2] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex - 2] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex - 1]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex - 1);
      if (
        squareRight === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 2] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex + 2] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 1]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex + 1);
      if (
        squareBelow === "Hit" &&
        enemyGameboard.gameboard[lAttackIndex + 20] !== "Miss" &&
        enemyGameboard.gameboard[lAttackIndex + 20] !== undefined &&
        !enemyGameboard.ships[
          enemyGameboard.shipPositions[lAttackIndex + 10]
        ].isSunk()
      )
        return predictShipLocation(lAttackIndex + 10);
      return randomAttack();
    };
    return predictShipLocation(lastAttackIndex);
  },
});

export { createPlayer, createAI };
