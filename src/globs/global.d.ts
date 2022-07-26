export {};

declare global {
	const enum Direction {
		horizontal = 1,
		vertical = 2,
	}

	interface ShipKind {
		length: number;
		direction: Direction;
		hitList?: boolean[];
	}
	interface GameBoardTemplate {
		BattleshipCols: number;
		BattleshipRows: number;
		shipCount: number;
		finalBoard: (boolean | ShipKind)[][];
	}

	interface PlayerInterface {
		name: string;
		isTurn: boolean;
		isWinner: boolean;
		currentBoard: GameBoardTemplate;
	}
	interface BattleshipGame {
		playerOne: PlayerInterface;
		playerTwo: PlayerInterface;
		playerOneBoard: GameBoardTemplate;
		playerTwoBoard: GameBoardTemplate;
		gameStart: boolean;
	}
	interface ControllerType {
		model: BattleshipGame;
	}

	interface ViewType {
		controller: ControllerType;
		updateView: Function;
	}
}
