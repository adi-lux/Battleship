export class BoardView {
	buildView(model: BattleshipGame) {
		const dualBoard = document.querySelector('.dual-board');
		if (dualBoard) {
			dualBoard.remove();
		}

		const originalDocument = document.getElementById('game-container');
		if (model.stage === 4) {
			console.log('winner!!');
			const newDiv = document.createElement('div');
			newDiv.className = 'restart';
			const restartButton = document.createElement('button');
			const winnerTitle = document.createElement('h1');
			if (model.checkWin() === 1) {
				winnerTitle.textContent = `The winner is ${model.playerOne.name}!`;
			} else {
				winnerTitle.textContent = `The winner is Robot!`;
			}
			restartButton.addEventListener('click', model.reset.bind(model));
			restartButton.textContent = 'Restart';
			newDiv.appendChild(winnerTitle);
			newDiv.appendChild(restartButton);
			originalDocument?.appendChild(newDiv);
		}
		const boardView = document.createElement('div');
		boardView.className = 'dual-board';
		originalDocument?.appendChild(boardView);
	}

	updateView(model: BattleshipGame) {
		if (model.stage !== 1) {
			this.buildView(model);
		}
	}
}
