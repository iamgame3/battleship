const randomShips = (playerGameboard) => {
  for (let i = 0; i < 5; i += 1) {
    let shipLength;
    if (i === 0) shipLength = 1;
    else if (i === 1 || i === 2) shipLength = 2;
    else if (i === 3) shipLength = 3;
    else shipLength = 4;
    const randomSmallNumber = Math.random();
    if (randomSmallNumber < 0.5) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const randomBigNumber = Math.round(Math.random() * 99);
        if (
          Math.floor(randomBigNumber / 10) ===
            Math.floor((randomBigNumber + shipLength) / 10) &&
          randomBigNumber + shipLength < 100
        ) {
          let spaceAvailable = true;
          for (let j = 0; j < shipLength + 1; j += 1)
            if (playerGameboard.gameboard[randomBigNumber + j] !== "")
              spaceAvailable = false;
          if (spaceAvailable) {
            playerGameboard.placeShip(
              playerGameboard.positions[randomBigNumber],
              playerGameboard.positions[randomBigNumber + shipLength]
            );
            break;
          }
        }
      }
    } else {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const randomBigNumber = Math.round(Math.random() * 99);
        if (randomBigNumber + shipLength * 10 < 100) {
          let spaceAvailable = true;
          for (let j = 0; j < (shipLength + 1) * 10; j += 10)
            if (playerGameboard.gameboard[randomBigNumber + j] !== "")
              spaceAvailable = false;
          if (spaceAvailable) {
            playerGameboard.placeShip(
              playerGameboard.positions[randomBigNumber],
              playerGameboard.positions[randomBigNumber + shipLength * 10]
            );
            break;
          }
        }
      }
    }
  }
  return playerGameboard.gameboard;
};

export default randomShips;
