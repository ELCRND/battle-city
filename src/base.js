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
    this.gameOver = false;
    this.isExploded = false;
  }

  get sprite() {
    return this.sprites[Number(this.gameOver)];
  }

  update({ world }) {
    if (this.isExploded && !this.gameOver) {
      world.objects.add(this.сreateExplosion());
      this.gameOver = true;
    }
  }

  hit() {
    this.isExploded = true;
  }

  сreateExplosion() {
    return new TankExplosion({ x: this.x, y: this.y });
  }
}
