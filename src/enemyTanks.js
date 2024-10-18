import {
  OBJECTS_TYPE,
  ENEMY_TANK_SPEED,
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_START_POSITIONS,
  ENEMY_TANK_TURN_TIMER_THRESHOLD,
} from "./constants.js";
import { getAxisforDirection, getValueForDirection } from "./utils.js";
import Tank from "./tank.js";

export default class EnemyTank extends Tank {
  constructor({ indexStartPosition, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.ENEMY_TANK;
    this.direction = Tank.Direction.DOWN;
    this.speed = ENEMY_TANK_SPEED;
    this.sprites = ENEMY_TANK_SPRITES;
    this.x = ENEMY_TANK_START_POSITIONS[indexStartPosition][0];
    this.y = ENEMY_TANK_START_POSITIONS[indexStartPosition][1];
    this.turnTimer = 0;
  }

  update({ frameDelta, world }) {
    if (this.isDestroyed) {
      world.objects.add(this.сreateExplosion());
      return;
    }

    const axis = getAxisforDirection(this.direction);
    const value = getValueForDirection(this.direction);

    this.move(axis, value);
    this.animate(frameDelta);
    // this._randomFire(world);

    const isOutOfBounds = world.isOutOfBounds(this);
    const hasCollision = world.hasCollision(this);

    if (isOutOfBounds || hasCollision) {
      this.move(axis, -value);
      this._shouldTurn(frameDelta);
    }
  }

  hit() {
    this.isDestroyed = true;
  }

  _getRandomDirection() {
    return Math.floor(Math.random() * 4);
  }

  _randomFire(world) {
    if (Math.floor(Math.random() * 100) === 1) {
      this.fire();
      if (this.bullet) {
        world.objects.add(this.bullet);
      }
    }
  }

  _shouldTurn(frameDelta) {
    this.turnTimer += frameDelta;
    if (this.turnTimer > ENEMY_TANK_TURN_TIMER_THRESHOLD) {
      this.turnTimer = 0;
      this.turn(this._getRandomDirection());
    }
  }
}
