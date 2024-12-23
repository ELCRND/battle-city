import { OBJECTS_TYPE, STEEL_WALL_SPRITES } from "./constants.js";
import Wall from "./wall.js";

export default class SteelWall extends Wall {
  constructor({ isShield = false, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.STEEL_WALL;
    this.sprites = STEEL_WALL_SPRITES;
    this.isShield = isShield;
  }

  hit(bullet) {
    if (bullet.tank.lvl === 3 && bullet.tank.type === OBJECTS_TYPE.PLAYER1) {
      this.destroy();
    }
  }

  destroy() {
    this.isDestroyed = true;
  }
}
