

export class Ship implements ShipKind {
	length: number;
	direction: Direction; // Ships are implemented top-down or left-right
	hitList: boolean[];

	constructor(newShip: ShipKind) {
		const { length, direction } = newShip;
		this.length = length;
		this.direction = direction;
		this.hitList = new Array(length).fill(false); // Creates a new array with all positions unhit.
	}

	hit(hitNum: number) {
		this.hitList[hitNum] = true;
	}

	isSunk(): boolean {
		for (const hitVal of this.hitList) {
			if (!hitVal) {
				return false;
			}
		}
		return true;
	}
}

// Class:    Ship
//------------------------------------------
// Methods:  hit(hitNum)
//           isSunk()
