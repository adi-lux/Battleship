// player UI, shows everything
export class PlayerView implements ViewType {
	controller: ControllerType;
	constructor(givenController: ControllerType) {
		this.controller = givenController;
	}
	//buildView() {}
	updateView(model: BattleshipGame) {
		return model;
	}
}
