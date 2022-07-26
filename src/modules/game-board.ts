import { Ship } from './ship-factory';

interface GameBoardTemplate {
	BattleshipCols: number;
	BattleshipRows: number;
	shipCount: number;
	finalBoard: (boolean | Ship)[][];
}

export class GameBoard implements GameBoardTemplate {
	readonly BattleshipCols = 10;
	readonly BattleshipRows = 10;
	shipCount: number;
	finalBoard: (boolean | Ship)[][];

	constructor() {
		this.finalBoard = new Array(10)
			.fill(false)
			.map((x) => Array(10).fill(false));

		this.shipCount = 0;
	}

	private checkValidPlacement(
		x: number,
		y: number,
		direction: Direction,
		length: number
	): boolean {
		const totalX = x + length;
		const totalY = y + length;

		if (
			(direction === Direction.horizontal &&
				totalX <= this.BattleshipCols &&
				y < this.BattleshipRows) ||
			(direction === Direction.vertical &&
				totalY <= this.BattleshipRows &&
				x < this.BattleshipCols)
		) {
			return true;
		}
		return false;
	}

	traverseBoard(x: number, y: number, dir: Direction, length: number): number {
		// find the "head" of ship -> will alows be up or left so -1
		let hitIndex = 0;
		if (dir === Direction.horizontal) {
			while (hitIndex <= length) {
				if (
					x - hitIndex < 0 ||
					typeof this.finalBoard[x - hitIndex][y] === 'boolean'
				) {
					return hitIndex - 1;
				}
				hitIndex += 1;
			}
		} else if (dir === Direction.vertical) {
			while (hitIndex <= length) {
				if (
					y - hitIndex < 0 ||
					typeof this.finalBoard[x][y - hitIndex] === 'boolean'
				) {
					return hitIndex - 1;
				}
				hitIndex += 1;
			}
		}
		return -1;
	}

	checkBoard(x: number, y: number): boolean | Ship {
		return this.finalBoard[x][y];
	}

	checkAllSunk() {
		let totalSunk = 0;

		for (let i = 0; i < this.finalBoard[0].length; i++) {
			for (let j = 0; j < this.finalBoard.length; j++) {
				const boardSpot = this.checkBoard(i, j);
				if (
					typeof boardSpot !== 'boolean' &&
					boardSpot.isSunk() &&
					this.traverseBoard(i, j, boardSpot.direction, boardSpot.length) === 0
				) {
					totalSunk += 1;
				}
			}
		}

		return totalSunk === this.shipCount;
	}

	placeShip(
		x: number,
		y: number,
		direction: Direction,
		length: number
	): boolean {
		const newShip = new Ship({ length, direction });

		if (
			direction === Direction.horizontal &&
			this.checkValidPlacement(x, y, direction, length)
		) {
			for (let i = 0; i < length; i++) {
				this.finalBoard[x + i][y] = newShip;
			}
			this.shipCount += 1;
		} else if (
			direction === Direction.vertical &&
			this.checkValidPlacement(x, y, direction, length)
		) {
			for (let i = 0; i < length; i++) {
				this.finalBoard[x][y + i] = newShip;
			}
			this.shipCount += 1;
		} else {
			return false;
		}
		return true;
	}

	receiveAttack(x: number, y: number): boolean {
		if (x >= this.BattleshipCols || y >= this.BattleshipRows) {
			return false;
		}
		const boardSpot = this.checkBoard(x, y);
		if (typeof boardSpot !== 'boolean') {
			const hitIndex = this.traverseBoard(
				x,
				y,
				boardSpot.direction,
				boardSpot.length
			);
			boardSpot.hit(hitIndex);
			return true;
		} else {
			this.finalBoard[x][y] = true;
			return false;
		}
	}
}

// Class:    GameBoard
//------------------------------------------
// Methods:  checkBoard(x,y)
//           checkAllSunk()
//           placeShip(x,y,Direction,length)
//           receiveAttack(x,y)
