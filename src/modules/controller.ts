interface ControllerType {
	model: BattleshipGame;
}

export class Controller implements ControllerType {
	model: BattleshipGame;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
	}
}
