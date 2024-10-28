import {
  OBJECTS_TYPE,
  POINTS_WIDTH,
  POINTS_HEIGHT,
  POINTS_SPRITES,
  POINTS_DESTROY_DELAY,
} from "./constants.js";
import GameObject from "./game-object.js";

export class Points extends GameObject {
  static QuantMap = {
    100: 0,
    200: 1,
    300: 2,
    400: 3,
    500: 4,
  };

  constructor({ type, quant, ...args }) {
    super(args);
    this.type = OBJECTS_TYPE.POINTS;
    this.width = POINTS_WIDTH;
    this.height = POINTS_HEIGHT;
    this.sprites = POINTS_SPRITES;
    this.quant = quant;
  }

  get top() {
    return 0;
  }
  get right() {
    return 0;
  }
  get bottom() {
    return 0;
  }
  get left() {
    return 0;
  }

  get sprite() {
    return this.sprites[this.quant];
  }

  update({ world, frameDelta }) {
    this.frames += frameDelta;

    if (this.frames > 200) {
      this._destroy(world);
    }
  }

  _destroy(world) {
    if (this.frames > POINTS_DESTROY_DELAY) {
      world.player.score += (this.quant + 1) * 100;
      world.objects.delete(this);
    }
  }
}
