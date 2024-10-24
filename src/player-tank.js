import {
  Keys,
  OBJECTS_TYPE,
  PLAYER1_START_POSITION_X,
  PLAYER1_START_POSITION_Y,
  PLAYER1_SPRITES,
  PLAYER_SPEED,
} from "./constants.js";
import {
  getAxisforDirection,
  getDirectionForKeys,
  getValueForDirection,
} from "./utils.js";
import Tank from "./tank.js";
import PlayerShield from "./player-shield.js";

export default class PlayerTank extends Tank {
  constructor({ extraLives, ...args }) {
    super(args);

    this.type = OBJECTS_TYPE.PLAYER1;
    this.x = PLAYER1_START_POSITION_X;
    this.y = PLAYER1_START_POSITION_Y;
    this.speed = PLAYER_SPEED;
    this.sprites = PLAYER1_SPRITES;
    this.extraLives = extraLives;
    this.direction = Tank.Direction.UP;
    this.shield = new PlayerShield(this);
    this.timeShieldActive = 0;
    this.tankType = 0;
  }

  update({ input, frameDelta, world }) {
    if (this.isDestroyed) {
      world.objects.add(this.сreateExplosion(this.type));
      return;
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
    if (this.tankType < 3) {
      this.tankType += 1;
    }
  }

  activatedShield() {
    return new PlayerShield(this);
  }

  hit() {
    // if (this.extraLives >= 0 && !this.shield) {
    //   this.isDestroyed = true;
    //   this.extraLives -= 1;
    // }
  }
}
