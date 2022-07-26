export class StartView implements ViewType {
	controller: ControllerType;

	constructor(givenController: ControllerType) {
		this.controller = givenController;
	}

	// function that generates DOM button to take input for Name
	// and button to click on
	updateView(model: BattleshipGame) {
		return model;
	}
}
