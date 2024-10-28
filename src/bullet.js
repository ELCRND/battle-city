import {
  OBJECTS_TYPE,
  BULLET_WIDTH,
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_SPEED_INCREASED,
  BULLET_SPRITES,
  TILE_SIZE,
  CELL_SIZE,
} from "./constants.js";
import { getAxisforDirection, getValueForDirection } from "./utils.js";
import GameObject from "./game-object.js";
import BulletExplosion from "./bullet-explosion.js";

export default class Bullet extends GameObject {
  constructor({ tank, direction, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.BULLET;
    this.tank = tank;
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    this.direction = direction;
    this.speed = this.tank.lvl ? BULLET_SPEED_INCREASED : BULLET_SPEED;
    this.sprites = BULLET_SPRITES;
    this.isDestroyed = false;
    this.target = "";
  }

  get sprite() {
    return this.sprites[this.direction];
  }

  update({ world }) {
    if (this.isDestroyed) {
      this._destroy(world);
    }

    this._move();

    const isOutOfBounds = world.isOutOfBounds(this);
    const collision = world.getCollision(this);

    if (isOutOfBounds || collision) {
      if (collision && this._shouldDestroyed(collision.objects)) {
        this._destroy(world);
      }
      this.isDestroyed = true;
    }
  }

  _move() {
    const axis = getAxisforDirection(this.direction);
    const value = getValueForDirection(this.direction);
    const delta = value * this.speed;

    this[axis] += delta;
  }

  _shouldDestroyed(objects) {
    let flag = false; // need to destroy two walls together

    for (const object of objects) {
      this.target = object.type;

      if (this.target !== this.tank.type && this.target !== this.type) {
        object.hit(this);
        flag = true;
      }
    }

    return flag;
  }

  _destroy(world) {
    this.speed = 0;
    this.tank.bullet -= 1;

    if (this.target !== this.type) {
      world.objects.add(this._createExplosion());
    }

    world.objects.delete(this);
  }

  _createExplosion() {
    const { x, y } = this._getExplosionStartingPosition();
    return new BulletExplosion({ x, y });
  }

  _getExplosionStartingPosition() {
    const trashold = (CELL_SIZE - BULLET_WIDTH) / 2 + 1;
    switch (this.direction) {
      case Bullet.Direction.UP:
        return {
          x: this.left - trashold,
          y: this.top - TILE_SIZE / 2,
        };
      case Bullet.Direction.RIGHT:
        return {
          x: this.left - TILE_SIZE,
          y: this.top - trashold,
        };
      case Bullet.Direction.DOWN:
        return {
          x: this.left - trashold,
          y: this.top - TILE_SIZE,
        };
      case Bullet.Direction.LEFT:
        return {
          x: this.left - TILE_SIZE / 2,
          y: this.top - trashold,
        };
    }
  }
}
