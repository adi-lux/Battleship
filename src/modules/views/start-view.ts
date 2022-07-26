import { StartController } from '../controllers/start-controller';

export class StartView implements ViewType {
	controller: StartController;
	gameStart: boolean;

	constructor(givenController: StartController) {
		this.controller = givenController;
		this.gameStart = false;
	}
	//buildView() {}
	// function that generates DOM button to take input for Name
	// and button to click on
	removeView() {
		const currView = document.querySelector('.start-screen');
		currView?.remove();
	}
	startGame(e: Event) {
		e.preventDefault();
		const newForm = e.target as HTMLFormElement;
		const givenName = newForm.form[0].value;
		console.log('name', givenName);

		if (givenName != null) {
			this.controller.startGame(givenName);
			this.removeView();
		}
	}
	updateEventListeners() {
		const newButton = document.getElementById('start-game-button');
		newButton?.addEventListener('click', this.startGame.bind(this));
	}
	buildView() {
		this.updateEventListeners();
		return; // generates view containing Home screen
	}
	updateView() {
		if (!this.gameStart) {
			this.buildView();
		}
	}
}
