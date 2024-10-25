import {
  CELL_SIZE,
  TILE_SIZE,
  TANK_WIDTH,
  TANK_HEIGHT,
  TANK_SPEED,
  DIRECTION,
  BULLET_WIDTH,
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
    this.isDestroyed = false;
    this.bullet = 0;
    this.lvl = 0;
  }

  get sprite() {
    if (this.isBonusTank) {
      return this.sprites[
        this.direction * 2 +
          this.animationFrame +
          this.bonusAnimationFrame * 8 +
          this.lvl * 8
      ];
    } else
      return this.sprites[
        this.direction * 2 + this.animationFrame + this.lvl * 8
      ];
  }

  get canFire() {
    if (this.lvl >= 2) {
      return this.bullet < 2;
    } else return this.bullet < 1;
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

  fire(world) {
    if (this.canFire) {
      const { x, y } = this._getBulletStartPosition();
      const bullet = new Bullet({
        tank: this,
        x,
        y,
        direction: this.direction,
        speed: this.bulletSpeed,
      });
      this.bullet += 1;
      world.objects.add(bullet);
    }
  }

  animate(frameDelta) {
    if (this.isBonusTank) {
      this.bonusFrames += frameDelta;
      if (this.bonusFrames > 150) {
        this.bonusAnimationFrame ^= 1;
        this.bonusFrames = 0;
      }
    }

    this.frames += frameDelta;
    if (this.frames > 20) {
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  _getBulletStartPosition() {
    const trashold = (CELL_SIZE - BULLET_WIDTH) / 2 + 1;
    if (this.direction === DIRECTION.UP) {
      return {
        x: this.x + trashold,
        y: this.y - TILE_SIZE / 2,
      };
    }
    if (this.direction === DIRECTION.RIGHT) {
      return {
        x: this.x + CELL_SIZE,
        y: this.y + trashold,
      };
    }
    if (this.direction === DIRECTION.DOWN) {
      return {
        x: this.x + trashold,
        y: this.y + CELL_SIZE,
      };
    }
    if (this.direction === DIRECTION.LEFT) {
      return {
        x: this.x - TILE_SIZE / 2,
        y: this.y + trashold,
      };
    }
  }

  сreateExplosion() {
    return new TankExplosion(this);
  }
}
