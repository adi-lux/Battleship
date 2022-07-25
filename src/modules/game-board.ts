import { Ship } from './ship-factory';

export class GameBoard {
  finalBoard: (boolean | Direction)[][]; // False = unhit, True = hit and missed, Direction =
  shipList: Map<number[], Ship>;
  constructor() {
    this.finalBoard = new Array(10).fill(new Array(10).fill(false));
  }

  // Use left to right and top to down
  // There can be 5 ships maximum
  placeShip(
    x: number,
    y: number,
    direction: Direction,
    length: number
  ): boolean {
    if (direction === Direction.horizontal && x + length <= BATTLESHIP_COLS) {
      for (let i = 0; i < length; i++) {
        this.finalBoard[x + i][y] = Direction.horizontal;
      }
    } else if (
      direction === Direction.vertical &&
      y + length <= BATTLESHIP_ROWS
    ) {
      for (let i = 0; i < length; i++) {
        this.finalBoard[x][y + i] = Direction.vertical;
      }
    } else {
      return false;
    }
    this.shipList.set([x, y], new Ship({ length, direction }));
    return true;
  }
  receiveAttack(x: number, y: number) {}
  checkBoard(x: number, y: number) {}
}
