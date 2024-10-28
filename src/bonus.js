import {
  BONUS_ANIMATION_SPEED,
  BONUS_HEIGHT,
  BONUS_SPRITES,
  BONUS_WIDTH,
  CELL_SIZE,
  NUMBER_OF_CELL,
  OBJECTS_TYPE,
  TILE_SIZE,
} from "./constants.js";
import GameObject from "./game-object.js";
import { Points } from "./points.js";

export default class Bonus extends GameObject {
  static BonusMap = {
    PLAYER_SHIELD: 0,
    FREEZE: 1,
    BASE_ARMOR: 2,
    UPGRADE: 3,
    GRENADE: 4,
    EXTRA_LIFE: 5,
    GUN: 6,
  };

  static getRandomBonusIndex() {
    return Math.floor(Math.random() * 7);
  }

  static getRandomPosition() {
    return Math.floor(Math.random() * NUMBER_OF_CELL) * CELL_SIZE + TILE_SIZE;
  }

  constructor(args) {
    super(args);
    this.type = OBJECTS_TYPE.BONUS;
    this.x = Bonus.getRandomPosition();
    this.y = Bonus.getRandomPosition();
    this.width = BONUS_WIDTH;
    this.height = BONUS_HEIGHT;
    this.sprites = BONUS_SPRITES;
    this.bonusType = Bonus.getRandomBonusIndex();
  }

  get sprite() {
    if (this.animationFrame) {
      return this.sprites[this.sprites.lenght - 1];
    } else return this.sprites[this.bonusType];
  }

  update({ world, frameDelta }) {
    this._animate(frameDelta);

    if (world.haveCollision(world.player.tank, this)) {
      world.objects.add(
        new Points({ x: this.x, y: this.y + 16, quant: Points.QuantMap[500] })
      );
      world.objects.delete(this);
      switch (this.bonusType) {
        case Bonus.BonusMap.PLAYER_SHIELD:
          world.objects.add(world.player.tank.activatedShield());
          break;
        case Bonus.BonusMap.FREEZE:
          world.freezeGame();
          break;
        case Bonus.BonusMap.BASE_ARMOR:
          world.base.createSteelWall(world);
          break;
        case Bonus.BonusMap.UPGRADE:
          world.player.tank.upgrade();
          break;
        case Bonus.BonusMap.GRENADE:
          world.enemyTankCount = 0;
          world.objects.values().forEach((object) => {
            if (object.type === OBJECTS_TYPE.ENEMY_TANK) {
              object.massDestruction(world);
            }
          });
          break;
        case Bonus.BonusMap.EXTRA_LIFE:
          world.player.tank.extraLives += 1;
          break;
        case Bonus.BonusMap.GUN:
          world.player.tank.lvl = 3;
          break;
      }
    }
  }

  _animate(frameDelta) {
    this.frames += frameDelta;
    if (this.frames > BONUS_ANIMATION_SPEED) {
      this.frames = 0;
      this.animationFrame ^= 1;
    }
  }
}
