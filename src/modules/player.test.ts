import { GameBoard } from './game-board';
import { BattleshipAI, Player } from './player';

describe('Player creation functions', () => {
	const playerOneGameBoard = new GameBoard();
	const playerTwoGameBoard = new GameBoard();
	const playerOne = new Player('Bob', true, playerOneGameBoard);
	const playerTwo = new Player('Bobs', false, playerTwoGameBoard);
	test('A Player exists once created', () => {
		expect(playerOne).toBeDefined();
		expect(playerTwo).toBeDefined();
	});
	test('A player can attack another player unsuccessfully', () => {
		expect(playerOne.attackPlayer(playerTwo, 2, 4)).toBe(false);
	});
	test('A player can attack another player successfully', () => {
		playerTwo.currentBoard.placeShip(3, 4, Direction.vertical, 2);
		expect(playerOne.attackPlayer(playerTwo, 3, 4)).toBe(true);
	});

	test('A player can have not won yet', () => {
		playerTwo.currentBoard.placeShip(1, 0, Direction.horizontal, 2);
		playerOne.attackPlayer(playerTwo, 1, 0);
		playerOne.attackPlayer(playerTwo, 2, 0);

		expect(playerTwo.hasLost()).toBe(false);
	});

	test('A player can sink all opponent ships', () => {
		playerOne.attackPlayer(playerTwo, 3, 5);
		expect(playerTwo.hasLost()).toBe(true);
	});

	test('A player can win', () => {
		playerOne.win();
		expect(playerOne.isWinner).toBe(true);
	});
});
describe('AI Creation functions', () => {
	const playerGameBoard = new GameBoard();
	const AIGameBoard = new GameBoard();
	const player = new Player('Bob', true, playerGameBoard);
	const robot = new BattleshipAI(AIGameBoard);
	robot.currentBoard.placeShip(3, 4, Direction.vertical, 2);

	test('A Player exists once created', () => {
		expect(player).toBeDefined();
		expect(robot).toBeDefined();
	});
	test('A player can attack another AI unsuccessfully', () => {
		expect(player.attackPlayer(robot, 2, 4)).toBe(false);
	});
	test('A player can attack another AI successfully', () => {
		expect(player.attackPlayer(robot, 3, 4)).toBe(true);
	});

	test('A robot can attack a player', () => {
		expect(robot.attackPlayer(player)).toBeDefined();
	});

	test('A player can sink all opponent ships', () => {
		player.attackPlayer(robot, 3, 5);
		expect(robot.hasLost()).toBe(true);
	});

	test('A player can win', () => {
		player.win();
		expect(player.isWinner).toBe(true);
	});
});

describe('Robot randomization functions', () => {
	const AIGameBoard = new GameBoard();
	const robot = new BattleshipAI(AIGameBoard);

	test('A robot can place Ships ', () => {
		expect(robot.placeShip(2)).toBe(true);
		expect(robot.placeShip(3)).toBe(true);
		expect(robot.placeShip(4)).toBe(true);
		expect(robot.placeShip(1)).toBe(true);
		expect(robot.placeShip(5)).toBe(true);
	});
});
