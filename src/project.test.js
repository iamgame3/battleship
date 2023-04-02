import createShip from "./ship-creation";
import createGameboard from "./gameboard-creation";

test("Sinks a ship.", () => {
  const testShip = createShip(1);
  testShip.hit();
  expect(testShip.sunk).toBe(true);
});

test("Places a ship.", () => {
  const testGameboard = createGameboard();
  testGameboard.placeShip("a3", "a6");
  expect(JSON.stringify(testGameboard.ships.Battleship)).toBe(
    JSON.stringify(createShip(4))
  );
});
