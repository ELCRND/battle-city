import {
  CELL_SIZE,
  OBJECTS_TYPE,
  TANK_EXPLOSION_ANIMATION_SPEED,
  TANK_EXPLOSION_DESTROY_DELAY,
  TANK_EXPLOSION_SPRITES,
} from "./constants.js";
import Explosion from "./expolosion.js";
import { Points } from "./points.js";

export default class TankExplosion extends Explosion {
  constructor({ type, lvl, grenade, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.TANK_EXPLOSION;
    this.sprites = TANK_EXPLOSION_SPRITES;
    this.explodedObject = type;
    this.lvl = lvl;
    this.withoutPoints = grenade;
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

      if (
        this.explodedObject === OBJECTS_TYPE.ENEMY_TANK &&
        !this.withoutPoints
      ) {
        world.objects.add(
          new Points({
            x: this.x,
            y: this.y + 16,
            type: this.explodedObject,
            quant: Points.QuantMap[(this.lvl + 1) * 100],
          })
        );
      }
    }
  }
}
