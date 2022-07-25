import { Ship } from './ship-factory';

test('creating a Ship object works', () => {
  const newShip = new Ship({ length: 3, direction: Direction.vertical });

  expect(newShip).toHaveProperty('length');
  expect(newShip).toHaveProperty('direction');
});

test('New Ship can properly get hit', () => {
  const newShip = new Ship({ length: 3, direction: Direction.vertical });

  expect(newShip.hit(2)).toBeFalsy();
});

test('New Ship can determine whether it has sunk', () => {
  const newShip = new Ship({ length: 3, direction: Direction.vertical });
  expect(newShip.isSunk()).toBeFalsy();
});

test('New Ship can determine whether it has sunk', () => {
  const newShip = new Ship({ length: 3, direction: Direction.vertical });
  newShip.hit(2);
  newShip.hit(0);
  newShip.hit(1);
  expect(newShip.isSunk()).toBeTruthy();
});


test('New Ship cannot further modify already sunk ship', () => {
    const newShip = new Ship({ length: 3, direction: Direction.vertical });
    newShip.hit(2);
    newShip.hit(0);
    newShip.hit(1);
    expect(newShip.isSunk()).toBeTruthy();
    newShip.hit(2);
    expect(newShip.isSunk()).toBeTruthy();
});
  