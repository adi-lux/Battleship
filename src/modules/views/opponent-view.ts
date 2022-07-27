// add Robot AI view

// if turn, don't need to reveal unless hit

interface OpponentControl extends ControllerType {
	getAttacked(x: number, y: number): void;
}
interface newShip extends ShipKind {
	isSunk(): boolean;
}
export class OpponentView implements ViewType {
	controller;
	constructor(givenController: OpponentControl) {
		this.controller = givenController;
	}

	handleMoves(e: Event) {
		const identity = (e.target as HTMLDivElement).id;
		const idArray = identity.split('-');
		const parsedID = parseInt(idArray[1]);
		const parsedX = parsedID % 10;
		const parsedY = Math.floor(parsedID / 10);
		this.controller.getAttacked(parsedX, parsedY);
	}

	buildView(model: BattleshipGame) {
		const alreadyExisting = document.getElementById('opponent-side');
		if (alreadyExisting) {
			alreadyExisting.remove();
		}

		const opModel = model.enemyBoard().finalBoard;

		const gameBoard = document.querySelector('.dual-board');

		const newBoardFragment = document.createDocumentFragment();

		const newBoard = document.createElement('div');
		newBoard.id = 'opponent-side';

		const cellBoard = document.createElement('div');
		cellBoard.className = 'game-board';
		for (let y = 0; y < model.enemyBoard().BattleshipRows; y++) {
			for (let x = 0; x < model.enemyBoard().BattleshipCols; x++) {
				const emptySpace = document.createElement('p');
				emptySpace.classList.add('cell');
				emptySpace.id = `enemy-${y * 10 + x}`;

				if (typeof opModel[x][y] === 'boolean' && opModel[x][y] === false) {
					emptySpace.classList.add('unhit-cell');
					if (model.stage === 3) {
						emptySpace.addEventListener('click', this.handleMoves.bind(this));
					}
				} else if (
					typeof opModel[x][y] === 'boolean' &&
					opModel[x][y] === true
				) {
					emptySpace.classList.add('missed-cell');
				} else if (!model.enemyBoard().checkSpotHitBool(x, y)) {
					if (model.stage === 3) {
						emptySpace.addEventListener('click', this.handleMoves.bind(this));
					}

					emptySpace.classList.add('unhit-cell');
				} else if ((model.enemyBoard().checkBoard(x, y) as newShip).isSunk()) {
					emptySpace.classList.add('hit-cell');
					emptySpace.textContent = 'X';
				} else {
					emptySpace.classList.add('hit-cell');
					emptySpace.textContent = '-';
				}

				cellBoard.appendChild(emptySpace);
			}
		}
		const playerNameHeader = document.createElement('h1');
		playerNameHeader.className = 'player-name';
		playerNameHeader.textContent = model.playerTwo.name;

		newBoard.appendChild(cellBoard);
		newBoard.appendChild(playerNameHeader);
		newBoardFragment.appendChild(newBoard);

		gameBoard?.appendChild(newBoardFragment);

		// we are generating dom elements for the opponent right now lol
	}

	// opponent ships cannot be seen UNLESS they are hit...
	// SO THEREFORE, they are either Red, Missed, or White

	//buildView() {}
	// <div class="dual-board">
	// 	<div id="player-side">
	// 		<div class="gameboard">
	// 			.cell#player-$*100
	// 		</div>
	// 		<h1 class="player-name">Jonathan</h1>
	// 	</div>
	// 	<div id="opponent-side">
	// 		<div class="gameboard">
	// 			.cell#enemy-$*100
	// 		</div>
	// 		<h1 class="player-name">Wilbur</h1>
	// 	</div>
	// </div>

	updateView(model: BattleshipGame) {
		if (model.stage !== 1) {
			this.buildView(model);
		}
	}
}
