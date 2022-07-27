export class PlayerController implements ControllerType {
	model: BattleshipGame;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
	}

	placeShip(x: number, y: number, dir: Direction, length: number) {
		this.model.yourSetup(x, y, dir, length);
		this.model.updateObservers();
	}
}
