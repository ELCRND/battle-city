import GameObject from "./game-object.js";

export default class Explosion extends GameObject {
  constructor(args) {
    super(args);
  }

  get sprite() {
    return this.sprites[this.animationFrame];
  }

  get isExploding() {
    return this.animationFrame < this.sprites.length - 1;
  }
}
