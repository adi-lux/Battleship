export class BoardView {
	buildView() {
		const dualBoard = document.querySelector('.dual-board');
		if (dualBoard) {
			dualBoard.remove();
		}

		const originalDocument = document.getElementById('game-container');
		const boardView = document.createElement('div');
		boardView.className = 'dual-board';
		originalDocument?.appendChild(boardView);
	}

	updateView(model: BattleshipGame) {
		if (model.stage !== 1) {
			this.buildView();
		}
	}
}
