import { Model } from '../model';

export class StartController implements ControllerType {
	model: Model;
	constructor(givenModel: Model) {
		this.model = givenModel;
	}

	startGame(userName: string) {
		let assignedName = userName;
		if (userName == null || userName === '') {
			assignedName = 'Player';
		}
		console.log(assignedName);
		this.model.setName(assignedName);
		this.model.updateObservers();
	}
}
