import createShip from "./ship-creation";

test("Correctly sinks a ship.", () => {
  const testShip = createShip(1);
  testShip.hit();
  expect(testShip.sunk).toBe(true);
});
