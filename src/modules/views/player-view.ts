// Three stages : Starting is Stage 1
// Stage 2 is Placing: Player will be able to place their own ships onto the board : their own board is modifiable
// Stage 3 is Playing: Player will be able to attack the enemy board : their own board is view-only, enemy board is modifiable

interface newShip extends ShipKind {
	isSunk(): boolean;
}

interface PlayControl extends ControllerType {
	placeShip(x: number, y: number, dir: Direction, length: number): void;
}
// player UI, shows everything
export class PlayerView implements ViewType {
	controller: PlayControl;
	curDirection: Direction;
	totalShipLength: number;
	curShipLength: number;
	constructor(givenController: PlayControl) {
		this.controller = givenController;
		this.curDirection = 1; //horizontal
		this.totalShipLength = 0;
	}

	// Your Own Ships will always be visible to you, so they will be either missed color or hit/sunk color

	getNextShipSize() {
		switch (this.totalShipLength) {
			case 0:
				return 2;
			case 2:
				return 3;
			case 5:
				return 3;
			case 8:
				return 4;
			case 12:
				return 5;
			default:
				return 0;
		}
	}

	handleMoves(e: Event) {
		switch (this.totalShipLength) {
			case 0:
				this.curShipLength = 2;
				this.totalShipLength += 2;
				break;
			case 2:
				this.curShipLength = 3;
				this.totalShipLength += 3;
				break;
			case 5:
				this.totalShipLength += 3;
				break;
			case 8:
				this.curShipLength = 4;
				this.totalShipLength += 4;
				break;
			case 12:
				this.curShipLength = 5;
				this.totalShipLength += 5;
				this.controller.model.stage = 3;
				break;
			default:
				return;
		}
		const newTarget = e.target as HTMLDivElement;
		const identity = newTarget.id;
		const idArray = identity.split('-');
		const parsedID = parseInt(idArray[1]);
		const parsedX = parsedID % 10;
		const parsedY = Math.floor(parsedID / 10);

		if (
			(this.curDirection === 1 && parsedX + this.curShipLength <= 10) ||
			(this.curDirection === 2 && parsedY + this.curShipLength <= 10)
		) {
			this.controller.placeShip(
				parsedX,
				parsedY,
				this.curDirection,
				this.curShipLength
			);
		} else if (this.curDirection === 1 && parsedX - this.curShipLength >= 0) {
			this.controller.placeShip(
				parsedX - this.curShipLength + 1,
				parsedY,
				this.curDirection,
				this.curShipLength
			);
		} else if (this.curDirection === 2 && parsedY - this.curShipLength >= 0) {
			this.controller.placeShip(
				parsedX,
				parsedY - this.curShipLength + 1,
				this.curDirection,
				this.curShipLength
			);
		}
	}

	addPreview(e: Event) {
		console.log('hovered');

		const newTarget = e.target as HTMLDivElement;
		const identity = newTarget.id;
		const idArray = identity.split('-');
		const parsedID = parseInt(idArray[1]);
		const parsedX = parsedID % 10;
		const parsedY = Math.floor(parsedID / 10);
		const nextSize = this.getNextShipSize();

		if (this.curDirection === 1 && parsedX + nextSize <= 10) {
			for (let i = parsedX; i < parsedX + nextSize; i++) {
				const nextShipCell = document.getElementById(
					`player-${parsedY * 10 + i}`
				);
				nextShipCell?.classList.add('preview');
			}
		} else if (this.curDirection === 2 && parsedY + nextSize <= 10) {
			for (let i = parsedY; i < parsedY + nextSize; i++) {
				const nextShipCell = document.getElementById(
					`player-${i * 10 + parsedX}`
				);
				nextShipCell?.classList.add('preview');
			}
		} else if (this.curDirection === 1 && parsedX - nextSize >= 0) {
			for (let i = parsedX - nextSize + 1; i <= parsedX; i++) {
				const nextShipCell = document.getElementById(
					`player-${parsedY * 10 + i}`
				);
				nextShipCell?.classList.add('preview');
			}
		} else if (this.curDirection === 2 && parsedY - nextSize >= 0) {
			for (let i = parsedY - nextSize + 1; i <= parsedY; i++) {
				const nextShipCell = document.getElementById(
					`player-${i * 10 + parsedX}`
				);
				nextShipCell?.classList.add('preview');
			}
		}
	}

	removePreview() {
		const previews = document.querySelectorAll('.preview');
		previews.forEach((prev) => {
			prev.classList.remove('preview');
		});
	}

	switchDirection() {
		if (this.curDirection === 1) {
			this.curDirection = 2;
		} else {
			this.curDirection = 1;
		}
	}

	buildView(model: BattleshipGame) {
		const alreadyExisting = document.getElementById('player-side');
		if (alreadyExisting) {
			alreadyExisting.remove();
		}

		const opModel = model.playerBoard().finalBoard;

		const gameBoard = document.querySelector('.dual-board');

		const newBoardFragment = document.createDocumentFragment();

		const newBoard = document.createElement('div');
		newBoard.id = 'player-side';

		const cellBoard = document.createElement('div');
		cellBoard.className = 'game-board';
		for (let y = 0; y < model.playerBoard().BattleshipRows; y++) {
			for (let x = 0; x < model.playerBoard().BattleshipCols; x++) {
				const emptySpace = document.createElement('p');
				emptySpace.classList.add('cell');
				emptySpace.id = `player-${y * 10 + x}`;

				if (typeof opModel[x][y] === 'boolean' && opModel[x][y] === false) {
					emptySpace.classList.add('unhit-cell');

					if (model.stage === 2) {
						emptySpace.addEventListener(
							'mouseover',
							this.addPreview.bind(this)
						);
						emptySpace.addEventListener(
							'mouseout',
							this.removePreview.bind(this)
						);
						emptySpace.addEventListener('click', this.handleMoves.bind(this));
					}
				} else if (
					typeof opModel[x][y] === 'boolean' &&
					opModel[x][y] === true
				) {
					emptySpace.classList.add('missed-cell');
				} else if (!model.playerBoard().checkSpotHitBool(x, y)) {
					emptySpace.classList.add('hit-cell');
				} else if ((model.playerBoard().checkBoard(x, y) as newShip).isSunk()) {
					emptySpace.classList.add('hit-cell');
					emptySpace.textContent = 'X';
				} else {
					emptySpace.classList.add('hit-cell');
					emptySpace.textContent = '-';
				}

				cellBoard.appendChild(emptySpace);
			}
			document.addEventListener('keyup', (e) => {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				console.log(e.code);

				if (e.code === 'Space') {
					this.switchDirection();
				}
			});
		}
		const playerNameHeader = document.createElement('h1');
		playerNameHeader.className = 'player-name';
		if (model.stage === 2) {
			playerNameHeader.textContent = `Place your ships: Length ${this.getNextShipSize()}`;
		} else {
			playerNameHeader.textContent = model.playerOne.name;
		}

		newBoard.appendChild(cellBoard);
		newBoard.appendChild(playerNameHeader);
		newBoardFragment.appendChild(newBoard);

		gameBoard?.appendChild(newBoardFragment);
	}
	updateView(model: BattleshipGame) {
		if (model.stage !== 1) {
			this.buildView(model);
		}
	}
}
