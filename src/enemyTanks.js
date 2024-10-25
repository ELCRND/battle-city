import {
  OBJECTS_TYPE,
  CELL_SIZE,
  ENEMY_TANK_START_POSITIONS,
  ENEMY_TANK_TURN_TIMER_THRESHOLD,
  ENEMY_TANK_SPEED,
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_RANDOM_FIRE,
  ENEMY_TANK_RANDOM_TURN,
  PLAYER_HUNTING_TIME,
  BASE_HUNTING_TIME,
  BONUS_TIME,
} from "./constants.js";
import { getAxisforDirection, getValueForDirection } from "./utils.js";

import Tank from "./tank.js";
import Bonus from "./bonus.js";

export default class EnemyTank extends Tank {
  constructor({ indexStartPosition, isBonusTank = false, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.ENEMY_TANK;
    this.x = ENEMY_TANK_START_POSITIONS[indexStartPosition][0];
    this.y = ENEMY_TANK_START_POSITIONS[indexStartPosition][1];
    this.direction = Tank.Direction.DOWN;
    this.sprites = ENEMY_TANK_SPRITES;
    this.isBonusTank = isBonusTank;
    this.turnTimer = 0;
    this.huntingTime = 0;
    this.bonusAnimationFrame = 0;
    this.bonusFrames = 0;
    this.freezed = false;
    this.grenade = false;
  }

  get randomMove() {
    return this.huntingTime < PLAYER_HUNTING_TIME;
  }

  get playerHunt() {
    return (
      this.huntingTime > PLAYER_HUNTING_TIME &&
      this.huntingTime < BASE_HUNTING_TIME
    );
  }

  get baseHunt() {
    return this.huntingTime > BASE_HUNTING_TIME;
  }

  update({ frameDelta, world }) {
    if (this.isDestroyed) {
      this.destroy(world);
      return;
    }

    if (world.gameFreeze) {
      this._freeze();
      return;
    } else if (this.freezed) {
      this._unfreeze();
    }

    this.huntingTime += frameDelta;

    const axis = getAxisforDirection(this.direction);
    const value = getValueForDirection(this.direction);

    this.move(axis, value);
    this.animate(frameDelta);
    this._randomFire(world);

    if (this._canRandomTurn()) {
      this.turn(this._getRandomDirection());
    }

    const isOutOfBounds = world.isOutOfBounds(this);
    const collision = world.getCollision(this);

    if (isOutOfBounds || collision) {
      this.move(axis, -value);

      collision && this._checkPlayerOnPath(world, collision);

      if (this._shouldTurn(frameDelta)) {
        this._targetChoice(world);
      }
    }
  }

  hit() {
    this.isDestroyed = true;
  }

  destroy(world) {
    // if (this.isBonusTank) {
    world.objects.add(new Bonus());
    // }
    world.objects.add(this.сreateExplosion());
    world.objects.delete(this);
  }

  massDestruction(world) {
    this.grenade = true;
    world.objects.add(this.сreateExplosion(this.grenade));
    world.objects.delete(this);
    this.grenade = false;
  }

  _freeze() {
    this.speed = 0;
    this.freezed = true;
  }

  _unfreeze() {
    this.speed = ENEMY_TANK_SPEED;
    this.freezed = false;
  }

  _targetChoice(world) {
    if (this.randomMove) {
      this.turn(this._getRandomDirection());
    } else if (this.playerHunt) {
      this.turn(this._getDirectionToHunt(world.player));
    } else if (this.baseHunt) {
      this.turn(this._getDirectionToHunt(world.base));
    }
  }

  _freezeHandler(frameDelta) {
    this.freezedTime += frameDelta;
    if (this.freezedTime > BONUS_TIME) {
      this.unfreeze();
    }
  }

  _canRandomTurn() {
    return (
      this.x % CELL_SIZE === 0 &&
      this.y % CELL_SIZE === 0 &&
      Math.floor(Math.random() * ENEMY_TANK_RANDOM_TURN) === 1
    );
  }

  _checkPlayerOnPath(world, collision) {
    if (
      collision?.objects
        .values()
        .some((object) => object.type === OBJECTS_TYPE.PLAYER1)
    ) {
      this._randomFire(world);
    }
  }

  _randomFire(world) {
    if (Math.floor(Math.random() * ENEMY_TANK_RANDOM_FIRE) === 1) {
      this.fire(world);
    }
  }

  _shouldTurn(frameDelta) {
    this.turnTimer += frameDelta;
    if (this.turnTimer > ENEMY_TANK_TURN_TIMER_THRESHOLD) {
      this.turnTimer = 0;
      return true;
    }
    return false;
  }

  _getRandomDirection() {
    return Math.floor(Math.random() * 4);
  }

  _getDirectionToHunt(huntinqObject) {
    if (this.y < huntinqObject.y) {
      if (Math.random() < 0.5) return Tank.Direction.DOWN;
      else return Math.floor(Math.random() * 4);
    } else if (this.y > huntinqObject.y) {
      if (Math.random() < 0.5) return Tank.Direction.UP;
      else return Math.floor(Math.random() * 4);
    } else if (this.x < huntinqObject.x) {
      if (Math.random() < 0.5) return Tank.Direction.RIGHT;
      else return Math.floor(Math.random() * 4);
    } else if (this.x > huntinqObject.x) {
      if (Math.random() < 0.5) return Tank.Direction.LEFT;
      else return Math.floor(Math.random() * 4);
    }
  }

  _bonusAnimate(frameDelta) {
    this.bonusFrames += frameDelta;
    if (this.bonusFrames > 150) {
      this.bonusAnimationFrame ^= 1;
      this.bonusFrames = 0;
    }
  }
}
