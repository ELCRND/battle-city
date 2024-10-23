import {
  STAGE_SIZE,
  TILE_SIZE,
  OBJECTS_TYPE,
  PLAYER1_EXTRA_LIVES,
  ENEMY_TANK_QUANT,
  ENEMY_TANK_SPAWN_TIMEOUT,
  ENEMY_TANK_SPAWN_MARK_TIMEOUT,
} from "./constants.js";

import Base from "./base.js";
import BrickWall from "./brick-wall.js";
import SteelWall from "./stell-wall.js";
import PlayerTank from "./player-tank.js";
import EnemyTank from "./enemyTanks.js";
import SpawnMarker from "./spawn-marker.js";

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
    this.player = new PlayerTank({ extraLives: PLAYER1_EXTRA_LIVES });
    this.objects = new Set([this.base, this.player, ...this.terrains]);
    this.spawnMark = null;
    this.enemyTankCount = 0;
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
  get haveEnemies() {
    return this.enemies.length > 0;
  }

  update(input, frameDelta) {
    const state = {
      input,
      frameDelta,
      world: this,
    };

    if (this.haveEnemies) {
      this._handlerAddEnemyTank(frameDelta);
    }

    this.objects.forEach((object) => {
      if (object.isDestroyed) {
        this._deleteObjects(object);
      }
      if (typeof object === "object") {
        object.update(state);
      }
    });
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
        other.type === OBJECTS_TYPE.TANK_EXPLOSION ||
        other.type === OBJECTS_TYPE.POINTS ||
        other.type === OBJECTS_TYPE.PLAYER_SHIELD ||
        other.type === OBJECTS_TYPE.SPAWN_MARKER
      )
        continue;
      if (other !== object && this.haveCollision(object, other)) {
        // other.debug = true;
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

  _deleteObjects(object) {
    switch (object.type) {
      case OBJECTS_TYPE.BASE:
        break;
      case OBJECTS_TYPE.ENEMY_TANK:
        this.enemyTankCount -= 1;
      case OBJECTS_TYPE.BRICK_WALL:
      case OBJECTS_TYPE.BULLET:
        this.objects.delete(object);
      case OBJECTS_TYPE.PLAYER1:
        if (object.extraLives >= 0) {
          const newLife = new PlayerTank({ extraLives: object.extraLives });
          this.objects.delete(object);
          this.player = newLife;
          this.objects.add(this.player);
        } else {
          this.objects.delete(object);
        }
    }
  }

  _handlerAddEnemyTank(frameDelta) {
    if (this.enemyTankCount < ENEMY_TANK_QUANT) {
      this.spawnEnemyTankTimer += frameDelta;
    }

    if (
      !this.spawnMark &&
      this.spawnEnemyTankTimer > ENEMY_TANK_SPAWN_MARK_TIMEOUT
    ) {
      this._addSpawnMark();
    } else if (this.spawnEnemyTankTimer > ENEMY_TANK_SPAWN_TIMEOUT) {
      this.objects.delete(this.spawnMark);
      this.spawnMark = null;
      this.spawnEnemyTankTimer = 0;
      this._addEnemyTank();
    }
  }

  _addSpawnMark() {
    const { x, y, width, height } = this.enemies[0];
    this.spawnMark = new SpawnMarker({ x, y, width, height });
    this.objects.add(this.spawnMark);
  }

  _addEnemyTank() {
    const collision = this.getCollision(this.enemies[0]);
    let isFreePlace = true;

    collision?.objects.forEach((object) => {
      if (
        object.type === OBJECTS_TYPE.PLAYER1 ||
        object.type === OBJECTS_TYPE.ENEMY_TANK
      ) {
        isFreePlace = false;
      }
    });

    if (isFreePlace) {
      this.objects.add(this.enemies.shift());
      this.enemyTankCount += 1;
    }
  }
}
