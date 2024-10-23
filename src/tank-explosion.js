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
import { Points } from "./points.js";

export default class TankExplosion extends Explosion {
  constructor({ tankType, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.TANK_EXPLOSION;
    this.width = TANK_EXPLOSION_WIDTH;
    this.height = TANK_EXPLOSION_HEIGHT;
    this.sprites = TANK_EXPLOSION_SPRITES;
    this.tankType = tankType;
  }

  update({ world, frameDelta }) {
    if (this.animationFrame === 3 && this.width === CELL_SIZE) {
      this._increase();
    } else if (this.animationFrame === 5 && this.width > CELL_SIZE) {
      this._decrease();
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

  _increase() {
    this.x -= this.width / 2;
    this.y -= this.height / 2;
    this.width *= 2;
    this.height *= 2;
  }

  _decrease() {
    this.width /= 2;
    this.height /= 2;
    this.x += this.width / 2;
    this.y += this.height / 2;
  }

  _destroy(world) {
    if (this.frames > TANK_EXPLOSION_DESTROY_DELAY) {
      world.objects.delete(this);

      if (this.tankType === OBJECTS_TYPE.ENEMY_TANK) {
        world.objects.add(
          new Points({ x: this.x, y: this.y + 16, tankType: 0 })
        );
      }
    }
  }
}
