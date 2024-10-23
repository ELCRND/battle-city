import { OBJECTS_TYPE, PLAYER_SHIELD_SPRITES } from "./constants.js";
import GameObject from "./game-object.js";

export default class PlayerShield extends GameObject {
  constructor(args) {
    super(args);

    this.tank = args;
    this.type = OBJECTS_TYPE.PLAYER_SHIELD;
    this.sprites = PLAYER_SHIELD_SPRITES;
    this.timeActive = 0;
  }

  get sprite() {
    return this.sprites[this.animationFrame];
  }

  update({ world, frameDelta }) {
    this.x = this.tank.x;
    this.y = this.tank.y;
    this.timeActive += frameDelta;
    if (this.timeActive > 5000) {
      this._destroy(world);
    } else {
      this._animate(frameDelta);
    }
  }

  _animate(frameDelta) {
    this.frames += frameDelta;
    if (this.frames > 30) {
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  _destroy(world) {
    this.tank.shield = null;
    world.objects.delete(this);
  }
}
