import { StartView } from './views/start-view';
import { PlayerView } from './views/player-view';
import { OpponentView } from './views/opponent-view';
import { Controller } from './controller';
export class View {
	controller
	model;
	startView;
	playerView;
	opponentView;

	constructor(givenController: Controller) {
		this.controller = givenController;
		this.model = this.controller.model;
		this.startView = new StartView(this.controller.startController);
		this.playerView = new PlayerView(this.controller.playerController);
		this.opponentView = new OpponentView(this.controller.opponentController);
		this.model.addObservers([
			this.startView,
			this.playerView,
			this.opponentView,
		]);
		this.model.updateObservers();
	}
}
