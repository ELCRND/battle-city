import {
  Keys,
  OBJECTS_TYPE,
  PLAYER1_START_POSITION_X,
  PLAYER1_START_POSITION_Y,
  PLAYER1_SPRITES,
  PLAYER_SPEED,
  PLAYER1_EXTRA_LIVES,
} from "./constants.js";

import {
  getAxisforDirection,
  getDirectionForKeys,
  getValueForDirection,
} from "./utils.js";

import Tank from "./tank.js";
import PlayerShield from "./player-shield.js";
import TankExplosion from "./tank-explosion.js";

export default class PlayerTank extends Tank {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.PLAYER1;
    this.x = PLAYER1_START_POSITION_X;
    this.y = PLAYER1_START_POSITION_Y;
    this.speed = PLAYER_SPEED;
    this.sprites = PLAYER1_SPRITES;
    this.extraLives = PLAYER1_EXTRA_LIVES;
    this.direction = Tank.Direction.UP;
    this.shield = new PlayerShield(this);
    this.timeShieldActive = 0;
    this.lvl = 0;
  }

  update({ input, frameDelta, world }) {
    if (this.isDestroyed) {
      this.destroy(world);
    }

    if (this.reSpawn) {
      this._reSpawn(world);
      this.reSpawn = false;
    }

    if (this.shield && !world.objects.has(this.shield)) {
      world.objects.add(this.shield);
    }

    if (input.has(Keys.SPACE)) {
      input.keys.delete(Keys.SPACE);

      this.fire(world);
    }

    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys);
      const axis = getAxisforDirection(direction);
      const value = getValueForDirection(direction);

      this.turn(direction);
      this.move(axis, value);
      this.animate(frameDelta);

      const isOutOfBounds = world.isOutOfBounds(this);
      const collision = world.getCollision(this);

      if (isOutOfBounds || collision) {
        this.move(axis, -value);
      }
    }
  }

  upgrade() {
    if (this.lvl < 3) {
      this.lvl += 1;
    }
  }

  activatedShield() {
    this.shield = new PlayerShield(this);
    return this.shield;
  }

  hit() {
    if (this.extraLives <= 0 && !this.shield) {
      this.isDestroyed = true;
    } else if (this.extraLives > 0 && !this.shield) {
      this.reSpawn = true;
    }
  }

  _reSpawn(world) {
    world.objects.add(new TankExplosion(this));
    world.objects.add(this.activatedShield());
    this.x = PLAYER1_START_POSITION_X;
    this.y = PLAYER1_START_POSITION_Y;
    this.extraLives -= 1;
    this.lvl = 0;
  }
}
