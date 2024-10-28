import { FOREST_WALL_SPRITES, OBJECTS_TYPE } from "./constants.js";
import Wall from "./wall.js";

export default class ForestWall extends Wall {
  constructor(args) {
    super(args);

    this.type = OBJECTS_TYPE.FOREST;
    this.sprites = FOREST_WALL_SPRITES;
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
}
