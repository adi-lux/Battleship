export class OpponentController implements ControllerType {
	model: BattleshipGame;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
		this.model.robotSetup();
	}

	getAttacked(x: number, y: number) {
		this.model.yourPlay(x, y);
		console.log(this.model.checkWin(), 'winner');

		if (this.model.checkWin() === 1) {
			this.model.stage = 4;
			this.model.updateObservers();
			return;
		}
		this.model.robotPlay();
		if (this.model.checkWin() === 2) {
			this.model.stage = 4;
		}

		this.model.updateObservers();
	}
}
