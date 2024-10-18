import {
  STAGE_SIZE,
  TILE_SIZE,
  ENEMY_TANK_QUANT,
  ENEMY_TANK_SPAWN_THRESHOLD,
  OBJECTS_TYPE,
} from "./constants.js";
import Base from "./base.js";
import PlayerTank from "./player-tank.js";
import EnemyTank from "./enemyTanks.js";
import BrickWall from "./brick-wall.js";
import SteelWall from "./stell-wall.js";

export default class Stage {
  static TerrainType = {
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,
    WATER: 4,
    ICE: 5,
  };

  static createObject(type, args) {
    switch (type) {
      case Stage.TerrainType.BRICK_WALL:
        return new BrickWall(args);
      case Stage.TerrainType.STEEL_WALL:
        return new SteelWall(args);
    }
  }

  static createTerrain(map) {
    const objects = [];

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map.length; j++) {
        const value = map[j][i];

        if (value) {
          const object = Stage.createObject(value, {
            x: i * TILE_SIZE,
            y: j * TILE_SIZE,
          });

          objects.push(object);
        }
      }
    }
    return objects;
  }

  static createEnemies(types) {
    let indexStartPosition = 2;
    return types.map((type) => {
      indexStartPosition = (indexStartPosition + 1) % 3;
      return new EnemyTank({ indexStartPosition, type });
    });
  }

  constructor(data) {
    this.enemies = Stage.createEnemies(data.enemies);
    this.terrains = Stage.createTerrain(data.map);
    this.base = new Base();
    this.player = new PlayerTank();
    this.objects = new Set([
      this.base,
      this.player,
      this.enemies.shift(),
      ...this.terrains,
    ]);
    this.enemyTankCount = 1;
    this.spawnEnemyTankTimer = 0;
  }

  get width() {
    return STAGE_SIZE;
  }
  get height() {
    return STAGE_SIZE;
  }
  get top() {
    return 0;
  }
  get right() {
    return this.width;
  }
  get bottom() {
    return this.height;
  }
  get left() {
    return 0;
  }

  isOutOfBounds(object) {
    return (
      object.top < this.top ||
      object.right > this.right ||
      object.bottom > this.bottom ||
      object.left < this.left
    );
  }

  hasCollision(object) {
    const collision = this.getCollision(object);

    return Boolean(collision);
  }

  getCollision(object) {
    const collisionObjects = this.getCollisionObjects(object);

    if (collisionObjects.size > 0) {
      return { objects: collisionObjects };
    }
  }

  getCollisionObjects(object) {
    const objects = new Set();

    for (const other of this.objects) {
      if (
        other.type === OBJECTS_TYPE.BULLET_EXPLOSION ||
        other.type === OBJECTS_TYPE.TANK_EXPLOSION
      )
        continue;
      if (other !== object && this.haveCollision(object, other)) {
        other.debug = true;
        objects.add(other);
      }
    }

    return objects;
  }

  haveCollision(a, b) {
    if (!a || !b) return;
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }

  update(input, frameDelta) {
    const state = {
      input,
      frameDelta,
      world: this,
    };

    if (this._shouldAddEnemyTank(frameDelta)) {
      this._addEnemyTank();
    }

    this.objects.forEach((object) => {
      if (object.isDestroyed) {
        this._deleteObjects(object);
      }
      typeof object === "object" && object.update(state);
    });
  }

  _deleteObjects(object) {
    switch (object.type) {
      case OBJECTS_TYPE.BASE:
        break;
      case OBJECTS_TYPE.ENEMY_TANK:
        this.enemyTankCount -= 1;
      case OBJECTS_TYPE.BRICK_WALL:
      case OBJECTS_TYPE.BULLET:
        this.objects.delete(object);
    }
  }

  _shouldAddEnemyTank(frameDelta) {
    if (this.enemyTankCount < ENEMY_TANK_QUANT) {
      this.spawnEnemyTankTimer += frameDelta;
    }
    if (this.spawnEnemyTankTimer > ENEMY_TANK_SPAWN_THRESHOLD) {
      this.spawnEnemyTankTimer = 0;
      return true;
    }

    return false;
  }

  _addEnemyTank() {
    if (this.enemies.length > 0) {
      const tank = this.enemies[0];
      if (!this.hasCollision(tank)) {
        this.objects.add(this.enemies.shift());
        this.enemyTankCount += 1;
      }
    }
  }
}
