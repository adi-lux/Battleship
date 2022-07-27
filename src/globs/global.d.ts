export {};

declare global {
	const enum Direction {
		horizontal = 1,
		vertical = 2,
	}

	const enum Stage {
		starting = 1,
		placing = 2,
		playing = 3,
	}
	interface ShipKind {
		length: number;
		direction: Direction;
		hitList?: boolean[];
	}
	interface GameBoardTemplate {
		checkSpotHitBool(x: number, y: number): boolean;
		checkBoard(x: number, y: number): boolean | ShipKind;
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
		stage: Stage;
		observers: ViewType[];
		updateObservers(): void;
		updateObserver(observer: ViewType): void;
		yourTurn(): boolean;
		setName(givenName: string): void;
		yourSetup(x: number, y: number, dir: Direction, length: number): void;
		robotSetup(): void;
		yourPlay(x: number, y: number): void;
		robotPlay(): void;
		playerBoard(): GameBoardTemplate;
		enemyBoard(): GameBoardTemplate;
		reset(): void;
	}
	interface ControllerType {
		model: BattleshipGame;
	}

	interface ViewType {
		controller?: ControllerType;
		updateView: Function;
	}
}
