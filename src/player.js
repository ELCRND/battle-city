import PlayerTank from "./player-tank.js";

export default class Player {
  constructor() {
    this.score = 0;
    this.tank = new PlayerTank();
  }
}
