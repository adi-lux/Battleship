import { StartController } from '../controllers/start-controller';

export class StartView implements ViewType {
	controller: StartController;
	gameStart: boolean;

	constructor(givenController: StartController) {
		this.controller = givenController;
	}

	removeView() {
		const currView = document.getElementById('start-screen');
		currView?.remove();
	}

	startGame(e: Event) {
		e.preventDefault();
		const newForm = e.target as HTMLFormElement;
		const givenName = newForm.form[0].value;

		if (givenName != null) {
			this.removeView();
			this.controller.startGame(givenName);
		}
	}

	buildView() {
		// <div class='start-screen'>
		// 	<h1>Battleship</h1>
		// 	<form action='#' id='username'>
		// 		<input
		// 			type='text'
		// 			name='player-name'
		// 			id='player-name'
		// 			maxlength='14'
		// 			placeholder='Your Name'
		// 		/>
		// 		<input type='submit' value='Start' id='start-game-button' />
		// 	</form>
		// </div>;

		const mainDiv = document.getElementById('game-container');
		mainDiv?.remove();

		const newMain = document.createElement('div');
		newMain.id = 'game-container';

		const addFragment = document.createDocumentFragment();

		const startScreen = document.createElement('div');
		startScreen.id = 'start-screen';

		const headerName = document.createElement('h1');
		headerName.textContent = 'Battleship';

		const startForm = document.createElement('form');
		startForm.id = 'username';
		startForm.action = '#';

		const nameInput = document.createElement('input');
		nameInput.type = 'text';
		nameInput.name = 'player-name';
		nameInput.id = 'player-name';
		nameInput.maxLength = 14;
		nameInput.placeholder = 'Your Name';

		const submitButton = document.createElement('input');
		submitButton.type = 'submit';
		submitButton.value = 'Start';
		submitButton.id = 'start-game-button';
		submitButton.addEventListener('click', this.startGame.bind(this));

		startForm.appendChild(nameInput);
		startForm.appendChild(submitButton);

		startScreen.appendChild(headerName);
		startScreen.appendChild(startForm);

		addFragment.appendChild(startScreen);

		newMain.appendChild(addFragment);
		document.body.appendChild(newMain);
	}

	updateView(model: BattleshipGame) {
		if (model.stage === 1) {
			this.buildView();
		}
	}
}
