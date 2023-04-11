import createShip from "./ship";
import createGameboard from "./gameboard";
import { createPlayer, createAI } from "./players";

test("Sinks a ship.", () => {
  const testShip = createShip(1);
  testShip.hit();
  expect(testShip.sunk).toBe(true);
});

test("Places a ship horizontally.", () => {
  const testGameboard = createGameboard();
  expect(JSON.stringify(testGameboard.placeShip("a3", "a5"))).toBe(
    JSON.stringify(createShip(3))
  );
});

test("Places a ship vertically.", () => {
  const testGameboard = createGameboard();
  expect(JSON.stringify(testGameboard.placeShip("a3", "d3"))).toBe(
    JSON.stringify(createShip(4))
  );
});

test("Hits a ship.", () => {
  const testGameboard = createGameboard();
  testGameboard.placeShip("a3", "a6");
  expect(testGameboard.receiveAttack("a4")).toBe("Hit");
});

test("Sinks a ship from repeated hits.", () => {
  const testGameboard = createGameboard();
  testGameboard.placeShip("a3", "a6");
  testGameboard.receiveAttack("a3");
  testGameboard.receiveAttack("a4");
  testGameboard.receiveAttack("a5");
  testGameboard.receiveAttack("a6");
  expect(testGameboard.allSunk()).toBe(true);
});

test("Attacks and hits a ship (Player).", () => {
  const testPlayer = createPlayer();
  testPlayer.enemyBoard.placeShip("a3", "a6");
  expect(testPlayer.attack("a5")).toBe("Hit");
});

test("Attacks and hits or misses a ship (AI).", () => {
  const testAI = createAI();
  testAI.enemyBoard.placeShip("a3", "a6");
  expect(["Hit", "Miss"]).toContain(testAI.attack());
});
