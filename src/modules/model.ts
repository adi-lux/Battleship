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

	addObserver(newView: ViewType) {
		this.observers.push(newView);
	}
	updateObservers() {
		for (const observer of this.observers) {
			observer.updateView(this);
		}
	}

	updateObserver(observer: ViewType) {
		observer.updateView(this);
	}

	reset() {}
}
