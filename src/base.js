import BaseExplosion from "./base-explosion.js";
import {
  BASE_X,
  BASE_Y,
  BASE_WIDTH,
  BASE_HEIGHT,
  BASE_SPTITES,
  OBJECTS_TYPE,
  BONUS_TIME,
} from "./constants.js";
import GameObject from "./game-object.js";
import SteelWall from "./stell-wall.js";

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
    this.isExploded = false;
    this.shieldActive = false;
  }

  get sprite() {
    return this.sprites[Number(this.isDestroyed)];
  }

  update({ world, frameDelta }) {
    if (this.shieldActive) {
      this.frames += frameDelta;

      if (this.frames > BONUS_TIME) {
        this._deleteSteelWall(world);
      }
    }

    if (this.isExploded && !this.isDestroyed) {
      world.objects.add(this.сreateExplosion(world));
      this.isDestroyed = true;
    }
  }

  hit() {
    this.isExploded = true;
  }

  createSteelWall(world) {
    const positions = [
      [this.left - 32, this.top + 32],
      [this.left - 32, this.top],
      [this.left - 32, this.top - 32],
      [this.left, this.top - 32],
      [this.left + 32, this.top - 32],
      [this.left + 64, this.top - 32],
      [this.left + 64, this.top],
      [this.left + 64, this.top + 32],
    ];

    positions.forEach((position) => {
      world.objects.add(
        new SteelWall({
          x: position[0],
          y: position[1],
          isShield: true,
        })
      );
    });

    this.shieldActive = true;
  }

  _deleteSteelWall(world) {
    world.objects.forEach((object) => {
      if (object.type === OBJECTS_TYPE.STEEL_WALL && object.isShield) {
        world.objects.delete(object);
      }
    });
    this.shieldActive = false;
    this.frames = 0;
  }

  сreateExplosion() {
    return new BaseExplosion(this);
  }
}
