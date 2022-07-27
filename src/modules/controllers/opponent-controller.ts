export class OpponentController implements ControllerType {
	model: BattleshipGame;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
		this.model.robotSetup();
	}

	getAttacked(x: number, y: number) {
		this.model.yourPlay(x, y);
		this.model.robotPlay();
		this.model.updateObservers();
	}
}
