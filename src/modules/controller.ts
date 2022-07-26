import { OpponentController } from './controllers/opponent-controller';
import { PlayerController } from './controllers/player-controller';
import { StartController } from './controllers/start-controller';
import { Model } from './model';

export class Controller {
	model;
	startController;
	playerController;
	opponentController;

	constructor(givenModel: Model) {
		this.model = givenModel;
		this.startController = new StartController(this.model);
		this.playerController = new PlayerController(this.model);
		this.opponentController = new OpponentController(this.model);
	}
}
