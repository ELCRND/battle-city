import {
  BASE_X,
  BASE_Y,
  BASE_WIDTH,
  BASE_HEIGHT,
  BASE_SPTITES,
  OBJECTS_TYPE,
} from "./constants.js";
import GameObject from "./game-object.js";
import TankExplosion from "./tank-explosion.js";

export default class Base extends GameObject {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.BASE;
    this.x = BASE_X;
    this.y = BASE_Y;
    this.width = BASE_WIDTH;
    this.height = BASE_HEIGHT;
    this.sprites = BASE_SPTITES;
    this.isDestroyed = false;
    this.gameOver = false;
  }

  get sprite() {
    return this.sprites[Number(this.gameOver)];
  }

  update({ world }) {
    if (this.isDestroyed && !this.gameOver) {
      world.objects.add(this.сreateExplosion());
      this.gameOver = true;
    }
  }

  hit() {
    this.isDestroyed = true;
  }

  сreateExplosion() {
    return new TankExplosion({ x: this.x, y: this.y });
  }
}
