import { GameBoard } from './game-board';
import { Ship } from './ship-factory';

describe('Creating and populating GameBoard object.', () => {
	test('creating a GameBoard object works', () => {
		const newBoard = new GameBoard();

		expect(newBoard).toBeTruthy();
	});

	test('Creating a GameBoard object results in an empty Board.', () => {
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
	test('Player can place ship at coordinate.', () => {
		const newBoard = new GameBoard();

		expect(newBoard.placeShip(3, 4, 2, Direction.vertical)).toBeTruthy();
	});

	test('Player cannot place ship at invalid coordinate.', () => {
		const newBoard = new GameBoard();

		expect(newBoard.placeShip(10, 4, 2, Direction.vertical)).toBeFalsy();
	});

	test('When player places ship at coordinate, it is on board.', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		expect(newBoard.checkBoard(3, 4)).toHaveProperty('length');
	});
});

describe('Board receiving attacks.', () => {
	test('Board can receive empty board attacks.', () => {
		const newBoard = new GameBoard();

		expect(newBoard.receiveAttack(3, 4)).toBe(false);
	});
	test('Board can receive attacks with afflicted but not sunk ships.', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);

		expect(newBoard.receiveAttack(3, 4)).toBe(true);
		const newShip = newBoard.checkBoard(3, 4);
		expect(newShip).toBeTruthy();
	});

	test('Ship cannot receive attack  at invalid coordinate.', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);

		expect(newBoard.receiveAttack(10, 4)).toBe(false);
	});
	test('Board can receive attacks and successfully sink ships.', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		newBoard.receiveAttack(3, 4);
		newBoard.receiveAttack(3, 5);
		const newShip = newBoard.checkBoard(3, 4) as Ship;
		expect(newShip.isSunk()).toBe(true);
	});

	test('Board can keep track of missed attacks', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		newBoard.receiveAttack(3, 3);
		const missedAttack = newBoard.checkBoard(3, 3);
		const unhit = newBoard.checkBoard(3, 2);
		expect(missedAttack).toBe(true);
		expect(unhit).toBe(false);
	});

	test('Board can see if all ships have been sunk', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		newBoard.receiveAttack(3, 4);
		newBoard.receiveAttack(3, 5);
		expect(newBoard.checkAllSunk()).toBe(true);
	});

	test('Board can see if all ships have been sunk if they haven not', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		newBoard.receiveAttack(3, 4);
		expect(newBoard.checkAllSunk()).toBe(false);
	});

	test('Board can see if all ships have been sunk', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		newBoard.placeShip(5, 4, 2, Direction.vertical);
		newBoard.receiveAttack(3, 4);
		newBoard.receiveAttack(3, 5);
		newBoard.receiveAttack(5, 4);
		newBoard.receiveAttack(5, 5);
		expect(newBoard.checkAllSunk()).toBe(true);
	});

	test('Board can see if all ships have not been sunk', () => {
		const newBoard = new GameBoard();
		newBoard.placeShip(3, 4, 2, Direction.vertical);
		newBoard.placeShip(5, 4, 2, Direction.vertical);
		newBoard.receiveAttack(5, 4);
		newBoard.receiveAttack(3, 4);
		newBoard.receiveAttack(3, 5);
		expect(newBoard.checkAllSunk()).toBe(false);
	});
});
