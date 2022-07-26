// add Robot AI view

// if turn, don't need to reveal unless hit
export class OpponentView implements ViewType {
	controller: ControllerType;
	constructor(givenController: ControllerType) {
		this.controller = givenController;
	}

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
		return model;
	}
}
