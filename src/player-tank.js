import {
  Keys,
  OBJECTS_TYPE,
  PLAYER1_START_POSITION_X,
  PLAYER1_START_POSITION_Y,
  PLAYER1_SPRITES,
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
    this.sprites = PLAYER1_SPRITES;
    this.extraLives = extraLives;
    this.direction = Tank.Direction.UP;
    this.shield = new PlayerShield(this);
    this.timeShieldActive = 0;
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
      this.fire();
      input.keys.delete(Keys.SPACE);
      if (this.bullet) {
        world.objects.add(this.bullet);
      }
    }

    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys);
      const axis = getAxisforDirection(direction);
      const value = getValueForDirection(direction);

      this.turn(direction);
      this.move(axis, value);
      this.animate(frameDelta);

      const isOutOfBounds = world.isOutOfBounds(this);
      const hasCollision = world.hasCollision(this);

      if (isOutOfBounds || hasCollision) {
        this.move(axis, -value);
      }
    }
  }

  hit() {
    // if (this.extraLives >= 0 && !this.shield) {
    //   this.isDestroyed = true;
    //   this.extraLives -= 1;
    // }
  }
}
