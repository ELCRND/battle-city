import { OBJECTS_TYPE, WATER_WALL_SPRITES } from "./constants.js";
import Wall from "./wall.js";

export default class WaterWall extends Wall {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.WATER;
    this.sprites = WATER_WALL_SPRITES;
  }

  get sprite() {
    return this.sprites[this.animationFrame];
  }

  update({ frameDelta }) {
    this.frames += frameDelta;
    if (this.frames > 1000) {
      this.animationFrame = (this.animationFrame + 1) % 2;
      this.frames = 0;
    }
  }
}
