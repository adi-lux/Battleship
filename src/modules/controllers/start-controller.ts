export class StartController implements ControllerType {
	model: BattleshipGame;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
	}
}
