export class StartController implements ControllerType {
	model;
	constructor(givenModel: BattleshipGame) {
		this.model = givenModel;
	}

	startGame(userName: string) {
		let assignedName = userName;
		if (userName == null || userName === '') {
			assignedName = 'Player';
		}
		console.log(assignedName);
		this.model.setName(assignedName);
		this.model.stage = 2;
		this.model.updateObservers();
	}
}
