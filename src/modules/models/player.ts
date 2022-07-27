import { GameBoard } from './game-board';

export class Player implements PlayerInterface {
	name: string;
	isTurn: boolean;
	isWinner: boolean;
	currentBoard: GameBoard;
	constructor(givenName: string, givenTurn: boolean, givenBoard: GameBoard) {
		this.name = givenName;
		this.isTurn = givenTurn;
		this.currentBoard = givenBoard;
		this.isWinner = false;
	}

	_toggleTurn(): void {
		this.isTurn = !this.isTurn;
	}

	hasLost(): boolean {
		return this.currentBoard.checkAllSunk();
	}

	win(): void {
		this.isWinner = true;
	}
	receiveAttack(x: number, y: number): boolean {
		const success = this.currentBoard.receiveAttack(x, y);
		this._toggleTurn();

		return success;
	}

	attackPlayer(opponent: Player, x: number, y: number): boolean {
		return opponent.receiveAttack(x, y);
	}
}

export class BattleshipAI extends Player {
	moveList: Set<[number, number]>;
	placeList: Set<[number, number]>;
	constructor(givenBoard: GameBoard) {
		super('Robot', false, givenBoard);
		this.moveList = new Set();
		this.placeList = new Set();
	}

	private getRandInt() {
		return Math.floor(Math.random() * 10);
	}
	private checkMove(x: number, y: number): boolean {
		if (this.moveList.has([x, y])) {
			return false;
		}
		this.moveList.add([x, y]);
		return true;
	}

	private checkShip(x: number, y: number, dir: Direction, length: number) {
		if (dir === 2 && y + length < this.currentBoard.BattleshipRows) {
			for (let i = y; i < y + length; i++) {
				if (
					typeof this.currentBoard.checkBoard(x, i) !== 'boolean' ||
					this.placeList.has([x, i])
				) {
					return false;
				}
			}

			for (let i = y; i < y + length; i++) {
				this.placeList.add([x, i]);
			}
		} else if (dir === 1 && x + length < this.currentBoard.BattleshipCols) {
			for (let i = x; i < x + length; i++) {
				if (
					typeof this.currentBoard.checkBoard(i, y) !== 'boolean' ||
					this.placeList.has([i, y])
				) {
					return false;
				}
			}

			for (let i = x; i < x + length; i++) {
				this.placeList.add([i, y]);
			}
		} else {
			return false;
		}
		return true;
	}

	private getValidShip(length: number): [Direction, number, number] {
		const newShipDirection: Direction = Math.floor(Math.random() * 2) + 1;
		let x = this.getRandInt();
		let y = this.getRandInt();
		let validInput = this.checkShip(x, y, newShipDirection, length);
		while (!validInput) {
			x = this.getRandInt();
			y = this.getRandInt();
			validInput = this.checkShip(x, y, newShipDirection, length);
		}

		return [newShipDirection, x, y];
	}

	placeShip(length: number): boolean {
		const [newShipDirection, x, y] = this.getValidShip(length);

		return this.currentBoard.placeShip(x, y, newShipDirection, length);
	}

	attackPlayer(opponent: Player): boolean {
		let [x, y] = [this.getRandInt(), this.getRandInt()];
		let validMove = this.checkMove(x, y);

		while (!validMove) {
			[x, y] = [this.getRandInt(), this.getRandInt()];
			validMove = this.checkMove(x, y);
		}
		return super.attackPlayer(opponent, x, y);
	}
}
