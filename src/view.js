import {
  CELL_SIZE,
  NUMBER_OF_CELL,
  STAGE_SIZE,
  TILE_SIZE,
} from "./constants.js";

export default class View {
  constructor(canvas, sprite) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.sprite = sprite;
  }

  async init() {
    await this.sprite.load();
  }

  update(stage) {
    this.clearScreen();
    this.renderStage(stage);
    this.renderGrid();
  }

  renderStage(stage) {
    this.ctx.fillStyle = "#737573";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(96, 64, STAGE_SIZE, STAGE_SIZE);

    for (const object of stage.objects) {
      const { x, y, width, height, sprite } = object;
      if (!sprite) continue;

      this.ctx.drawImage(
        this.sprite.image,
        ...sprite,
        x + 96,
        y + 64,
        width,
        height
      );

      if (object.debug) {
        this.ctx.strokeStyle = "#0f0";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 98, y + 66, width - 2, height - 2);
        object.debug = false;
      }
    }
  }

  renderGrid() {
    for (let y = 0; y < NUMBER_OF_CELL; y++) {
      for (let x = 0; x < NUMBER_OF_CELL; x++) {
        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 0.2;
        this.ctx.strokeRect(
          x * CELL_SIZE + 98,
          y * CELL_SIZE + 66,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      }
    }
    for (let y = 0; y < NUMBER_OF_CELL * 2; y++) {
      for (let x = 0; x < NUMBER_OF_CELL * 2; x++) {
        this.ctx.strokeStyle = "#ccc";
        this.ctx.lineWidth = 0.1;
        this.ctx.strokeRect(
          x * TILE_SIZE + 98,
          y * TILE_SIZE + 66,
          TILE_SIZE - 2,
          TILE_SIZE - 2
        );
      }
    }
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
