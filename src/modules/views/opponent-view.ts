// add Robot AI view

// if turn, don't need to reveal unless hit
export class OpponentView implements ViewType {
	controller: ControllerType;

	constructor(givenController: ControllerType) {
		this.controller = givenController;
	}
	updateView(model: BattleshipGame) {
		return model;
	}
}
