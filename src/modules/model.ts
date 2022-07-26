import { GameBoard } from './models/game-board';
import { BattleshipAI, Player } from './models/player';

export class Model implements BattleshipGame {
	playerOne: Player;
	playerTwo: BattleshipAI;
	playerOneBoard: GameBoard;
	playerTwoBoard: GameBoard;
	observers: ViewType[];
	constructor() {
		this.playerOneBoard = new GameBoard();
		this.playerTwoBoard = new GameBoard();
		this.playerOne = new Player('', true, this.playerOneBoard);
		this.playerTwo = new BattleshipAI(this.playerTwoBoard);
		this.observers = [];
	}

	addObservers(newViews: ViewType[]) {
		this.observers = newViews;
	}

	updateObservers() {
		for (const observer of this.observers) {
			observer.updateView(this);
		}
	}

	updateObserver(observer: ViewType) {
		observer.updateView(this);
	}

	yourTurn() {
		return this.playerOne.isTurn;
	}

	setName(givenName: string) {
		this.playerOne.name = givenName;
	}

	yourSetup(x: number, y: number, dir: Direction, length: number) {
		this.playerOne.currentBoard.placeShip(x, y, dir, length);
	}

	robotSetup() {
		this.playerTwo.placeShip(2);
		this.playerTwo.placeShip(3);
		this.playerTwo.placeShip(3);
		this.playerTwo.placeShip(4);
		this.playerTwo.placeShip(5);
	}

	yourPlay(x: number, y: number) {
		this.playerOne.attackPlayer(this.playerTwo, x, y);
	}

	robotPlay() {
		this.playerTwo.attackPlayer(this.playerOne);
	}

	playerBoard() {
		return this.playerOne.currentBoard;
	}

	enemyBoard() {
		return this.playerTwo.currentBoard;
	}

	reset() {
		this.playerOneBoard = new GameBoard();
		this.playerTwoBoard = new GameBoard();
		this.playerOne = new Player('', true, this.playerOneBoard);
		this.playerTwo = new BattleshipAI(this.playerTwoBoard);
		this.updateObservers();
	}
}
