import { OBJECTS_TYPE, STEEL_WALL_SPRITES } from "./constants.js";
import Wall from "./wall.js";

export default class SteelWall extends Wall {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.STEEL_WALL;
    this.sprites = STEEL_WALL_SPRITES;
  }
}
