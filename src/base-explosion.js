import {
  BASE_EXPLOSION_ANIMATION_SPEED,
  BASE_EXPLOSION_DESTROY_DELAY,
  BASE_EXPLOSION_SPRITES,
  CELL_SIZE,
  OBJECTS_TYPE,
} from "./constants.js";
import Explosion from "./expolosion.js";
import GameOver from "./game-over.js";

export default class BaseExplosion extends Explosion {
  constructor(args) {
    super(args);

    this.base = args;
    this.type = OBJECTS_TYPE.BASE_EXPLOSION;
    this.sprites = BASE_EXPLOSION_SPRITES;
  }

  update({ world, frameDelta }) {
    if (this.animationFrame === 3 && this.width === CELL_SIZE) {
      this._increase();
    } else if (this.animationFrame === 5 && this.width > CELL_SIZE) {
      this._decrease();
    }

    this.frames += frameDelta;

    if (this.isExploding) {
      this._animate();
    } else {
      this._destroy(world);
    }
  }

  _animate() {
    if (this.frames > BASE_EXPLOSION_ANIMATION_SPEED) {
      this.animationFrame++;
      this.frames = 0;
    }
  }

  _increase() {
    this.x -= this.width / 2;
    this.y -= this.height / 2;
    this.width *= 2;
    this.height *= 2;
  }

  _decrease() {
    this.width /= 2;
    this.height /= 2;
    this.x += this.width / 2;
    this.y += this.height / 2;
  }

  _destroy(world) {
    if (this.frames > BASE_EXPLOSION_DESTROY_DELAY) {
      world.objects.delete(this);
      world.gameOver = new GameOver();
    }
  }
}
