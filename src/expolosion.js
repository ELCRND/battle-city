import GameObject from "./game-object.js";

export default class Explosion extends GameObject {
  constructor(args) {
    super(args);
  }

  get top() {
    return 0;
  }
  get right() {
    return 0;
  }
  get bottom() {
    return 0;
  }
  get left() {
    return 0;
  }

  get sprite() {
    return this.sprites[this.animationFrame];
  }

  get isExploding() {
    return this.animationFrame < this.sprites.length - 1;
  }
}
