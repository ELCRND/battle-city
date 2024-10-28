import {
  ENEMY_TANK_SPAWN_ANIMATION_SPEED,
  ENEMY_TANK_SPAWN_SPRITES,
  OBJECTS_TYPE,
} from "./constants.js";
import GameObject from "./game-object.js";

export default class SpawnMarker extends GameObject {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.SPAWN_MARKER;
    this.sprites = ENEMY_TANK_SPAWN_SPRITES;
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

  get isEnd() {
    return this.animationFrame < this.sprites.length - 1;
  }

  update({ frameDelta }) {
    this.frames += frameDelta;
    if (this.isEnd) {
      this._animate();
    }
  }

  _animate() {
    if (this.frames > ENEMY_TANK_SPAWN_ANIMATION_SPEED) {
      this.animationFrame++;
      this.frames = 0;
    }
  }
}
