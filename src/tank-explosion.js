import {
  CELL_SIZE,
  OBJECTS_TYPE,
  TANK_EXPLOSION_ANIMATION_SPEED,
  TANK_EXPLOSION_DESTROY_DELAY,
  TANK_EXPLOSION_HEIGHT,
  TANK_EXPLOSION_SPRITES,
  TANK_EXPLOSION_WIDTH,
} from "./constants.js";
import Explosion from "./expolosion.js";

export default class TankExplosion extends Explosion {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.TANK_EXPLOSION;
    this.width = TANK_EXPLOSION_WIDTH;
    this.height = TANK_EXPLOSION_HEIGHT;
    this.sprites = TANK_EXPLOSION_SPRITES;
  }

  get sprite() {
    return this.sprites[this.animationFrame];
  }

  update({ world, frameDelta }) {
    if (this.animationFrame === 3 && this.width === CELL_SIZE) {
      this._adjusment();
    }
    this.frames += frameDelta;
    if (this.isExploding) {
      this._animate();
    } else {
      this._destroy(world);
    }
  }

  _animate() {
    if (this.frames > TANK_EXPLOSION_ANIMATION_SPEED) {
      this.animationFrame++;
      this.frames = 0;
    }
  }

  _adjusment() {
    this.x -= this.width / 2;
    this.y -= this.height / 2;
    this.width *= 2;
    this.height *= 2;
  }

  _destroy(world) {
    if (this.frames > TANK_EXPLOSION_DESTROY_DELAY) {
      world.objects.delete(this);
    }
  }
}
