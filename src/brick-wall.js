import { BRICK_WALL_SPRITES, DIRECTION, OBJECTS_TYPE } from "./constants.js";
import Wall from "./wall.js";

export default class BrickWall extends Wall {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.BRICK_WALL;
    this.sprites = BRICK_WALL_SPRITES;
    this.spriteIndex = 0;
    this.stability = `1111`; // full wall, top-left | top-right | bottom-left | bottom-right
  }

  get sprite() {
    return this.sprites[this.spriteIndex];
  }

  get isUndamaged() {
    return this.stability === "1111";
  }

  hit({ direction }) {
    if (this.stability.match(/1/g).length === 1) {
      this.isDestroyed = true;
      return;
    }

    if (direction === DIRECTION.UP) {
      if (this.isUndamaged) {
        this.spriteIndex = 4;
        this.stability = "1100";
      } else if (this.stability === "0011" || this.stability === "1100") {
        this.isDestroyed = true;
      } else if (this.stability === "0101") {
        this.spriteIndex = 8;
        this.stability = "0100";
      } else if (this.stability === "1010") {
        this.spriteIndex = 6;
        this.stability = "1000";
      }
    }

    if (direction === DIRECTION.RIGHT) {
      if (this.isUndamaged) {
        this.spriteIndex = 1;
        this.stability = "0101";
      } else if (this.stability === "1010" || this.stability === "0101") {
        this.isDestroyed = true;
      } else if (this.stability === "0011") {
        this.spriteIndex = 7;
        this.stability = "0001";
      } else if (this.stability === "1100") {
        this.spriteIndex = 8;
        this.stability = "0100";
      }
    }
    if (direction === DIRECTION.DOWN) {
      if (this.isUndamaged) {
        this.spriteIndex = 2;
        this.stability = "0011";
      } else if (this.stability === "1100" || this.stability === "0011") {
        this.isDestroyed = true;
      } else if (this.stability === "0101") {
        this.spriteIndex = 7;
        this.stability = "0001";
      } else if (this.stability === "1010") {
        this.spriteIndex = 5;
        this.stability = "0010";
      }
    }
    if (direction === DIRECTION.LEFT) {
      if (this.isUndamaged) {
        this.spriteIndex = 3;
        this.stability = "1010";
      } else if (this.stability === "1010" || this.stability === "0101") {
        this.isDestroyed = true;
      } else if (this.stability === "0011") {
        this.spriteIndex = 5;
        this.stability = "0010";
      } else if (this.stability === "1100") {
        this.spriteIndex = 6;
        this.stability = "1000";
      }
    }
  }
}
