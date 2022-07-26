export class View implements ViewType {
	controller: ControllerType;
	constructor(givenController: ControllerType) {
		this.controller = givenController;
	}
	updateView(givenModel: BattleshipGame) {}
}
