import PlayerTank from "./player-tank.js";

export default class Player {
  constructor() {
    this.score = 0;
    this.tank = new PlayerTank();
    this.enemiesStatistics = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    };
  }
}
