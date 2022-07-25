import { GameBoard } from './game-board';
import { Ship } from './ship-factory';

describe('Creating and populating GameBoard object', () => {
  test('creating a GameBoard object works', () => {
    const newBoard = new GameBoard();

    expect(newBoard).toBeTruthy();
  });

  test('creating a GameBoard object results in an empty Board', () => {
    const newBoard = new GameBoard();
    expect(newBoard.finalBoard).toEqual([
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
    ]);
  });
  test('Player can place ship at coordinate', () => {
    const newBoard = new GameBoard();

    expect(newBoard.placeShip(3, 4, 2, Direction.vertical)).toBeTruthy();
  });

  test('When player places ship at coordinate, it is on board.', () => {
    const newBoard = new GameBoard();
    newBoard.placeShip(3, 4, 2, Direction.vertical);
    expect(newBoard.checkBoard(3, 4)).toBeTruthy();
  });
});

describe('Board receiving attacks', () => {
  test('Board can receive empty board attacks', () => {
    const newBoard = new GameBoard();

    expect(newBoard.receiveAttack(3, 4)).toBe([3, 4]);
  });
  test('Board can receive attacks with afflicted but not sunk ships', () => {
    const newBoard = new GameBoard();
    newBoard.placeShip(3, 4, 2, Direction.vertical);

    expect(newBoard.receiveAttack(3, 4)).toBe([3, 4]);
    const newShip = newBoard.checkBoard(3, 4);
    expect(newShip).toBeTruthy();
  });

  test('Board can receive attacks and successfully sink ships', () => {
    const newBoard = new GameBoard();
    newBoard.placeShip(3, 4, 2, Direction.vertical);
    newBoard.receiveAttack(3, 4);
    newBoard.receiveAttack(3, 5);
    // const newShip = newBoard.checkBoard(3, 4);
    // expect(newShip.isSunk()).toBeTruthy();
  });
});
