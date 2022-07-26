export class OpponentController implements ControllerType {
	model: BattleshipGame;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
	}
}
