import {
  TANK_WIDTH,
  TANK_HEIGHT,
  TANK_SPEED,
  DIRECTION,
  TILE_SIZE,
  BULLET_SPEED,
  BULLET_WIDTH,
  CELL_SIZE,
  BULLET_HEIGHT,
} from "./constants.js";
import { getAxisforDirection } from "./utils.js";
import GameObject from "./game-object.js";
import Bullet from "./bullet.js";
import TankExplosion from "./tank-explosion.js";

export default class Tank extends GameObject {
  constructor(args) {
    super(args);

    this.width = TANK_WIDTH;
    this.height = TANK_HEIGHT;
    this.speed = TANK_SPEED;
    this.bullet = null;
    this.bulletSpeed = BULLET_SPEED;
    this.isDestroyed = false;
  }

  get sprite() {
    return this.sprites[this.direction * 2 + this.animationFrame];
  }

  turn(direction) {
    const axis = getAxisforDirection(direction);
    this.direction = direction;

    if (axis === "y") {
      const trashold = this.x % TILE_SIZE;
      if (trashold <= TILE_SIZE / 2) this.x -= trashold;
      else if (trashold > TILE_SIZE / 2) this.x += TILE_SIZE - trashold;
    }
    if (axis === "x") {
      const trashold = this.y % TILE_SIZE;
      if (trashold <= TILE_SIZE / 2) this.y -= trashold;
      else if (trashold > TILE_SIZE / 2) this.y += TILE_SIZE - trashold;
    }
  }

  move(axis, value) {
    this[axis] += value * this.speed;
  }

  fire() {
    if (!this.bullet) {
      const { x, y } = this._getBulletStartPosition();
      const bullet = new Bullet({
        tank: this,
        x,
        y,
        direction: this.direction,
        speed: this.bulletSpeed,
      });
      this.bullet = bullet;
    }
  }

  animate(frameDelta) {
    this.frames += frameDelta;
    if (this.frames > 20) {
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  _getBulletStartPosition() {
    if (this.direction === DIRECTION.UP) {
      return {
        x: this.x + (CELL_SIZE - BULLET_WIDTH) / 2 + 1,
        y: this.y - TILE_SIZE / 2,
      };
    }
    if (this.direction === DIRECTION.RIGHT) {
      return {
        x: this.x + CELL_SIZE,
        y: this.y + (CELL_SIZE - BULLET_WIDTH) / 2 + 1,
      };
    }
    if (this.direction === DIRECTION.DOWN) {
      return {
        x: this.x + (CELL_SIZE - BULLET_WIDTH) / 2 + 1,
        y: this.y + CELL_SIZE,
      };
    }
    if (this.direction === DIRECTION.LEFT) {
      return {
        x: this.x - TILE_SIZE / 2,
        y: this.y + (CELL_SIZE - BULLET_WIDTH) / 2 + 1,
      };
    }
  }

  сreateExplosion() {
    return new TankExplosion({ x: this.x, y: this.y });
  }
}
