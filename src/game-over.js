import {
  GAME_OVER_HEIGHT,
  GAME_OVER_SPRITES,
  GAME_OVER_WIDTH,
  STAGE_SIZE,
} from "./constants.js";
import GameObject from "./game-object.js";

export default class GameOver extends GameObject {
  constructor() {
    super();

    this.width = 256;
    this.height = 128;
    this.x = STAGE_SIZE / 2 - this.width / 2;
    this.y = STAGE_SIZE;
    this.sprites = GAME_OVER_SPRITES;
  }

  get sprite() {
    return this.sprites;
  }

  update({ frameDelta }) {
    this.frames += frameDelta;
    if (this.frames > 20) {
      this.frames = 0;
      if (this.y > STAGE_SIZE / 2 - this.height / 2) {
        this.y -= 15;
      }
    }
  }
}
