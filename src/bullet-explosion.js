import {
  OBJECTS_TYPE,
  BULLET_EXPLOSION_WIDTH,
  BULLET_EXPLOSION_HEIGHT,
  BULLET_EXPLOSION_SPRITES,
  BULLET_EXPLOSION_DESTROY_DELAY,
  BULLET_EXPLOSION_ANIMATION_SPEED,
} from "./constants.js";
import Explosion from "./expolosion.js";

export default class BulletExplosion extends Explosion {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.BULLET_EXPLOSION;
    this.width = BULLET_EXPLOSION_WIDTH;
    this.height = BULLET_EXPLOSION_HEIGHT;
    this.sprites = BULLET_EXPLOSION_SPRITES;
  }

  update({ world, frameDelta }) {
    this.frames += frameDelta;
    if (this.isExploding) {
      this._animate();
    } else {
      this._destroy(world);
    }
  }

  _animate() {
    if (this.frames > BULLET_EXPLOSION_ANIMATION_SPEED) {
      this.animationFrame++;
      this.frames = 0;
    }
  }

  _destroy(world) {
    if (this.frames > BULLET_EXPLOSION_DESTROY_DELAY) {
      world.objects.delete(this);
    }
  }
}
