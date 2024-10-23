import {
  STAGE_SIZE,
  NUMBER_OF_CELL,
  CELL_SIZE,
  TILE_SIZE,
  PANEL_ICONS_POSITION,
  PANEL_ICONS_SPRITES,
  PANEL_EXTRA_LIVES_POSITION,
  PANEL_EXTRA_LIVES_SPRITES,
  PANEL_STAGE_INFO_POSITION,
  PANEL_STAGE_INFO_SPRITES,
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
    this.renderEnemyIcons(stage.enemies);
    this.renderPayerExtraLives(stage.player);
    this.renderStagesNum();
    // this.renderGrid();
  }

  renderStage(stage) {
    this.ctx.fillStyle = "#737573";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(CELL_SIZE, CELL_SIZE, STAGE_SIZE, STAGE_SIZE);

    for (const object of stage.objects) {
      const { x, y, width, height, sprite } = object;
      if (!sprite) continue;

      this.ctx.drawImage(
        this.sprite.image,
        ...sprite,
        x + CELL_SIZE,
        y + CELL_SIZE,
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
          x * CELL_SIZE + CELL_SIZE,
          y * CELL_SIZE + CELL_SIZE,
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
          x * TILE_SIZE + CELL_SIZE,
          y * TILE_SIZE + CELL_SIZE,
          TILE_SIZE - 2,
          TILE_SIZE - 2
        );
      }
    }
  }

  renderEnemyIcons(enemies) {
    for (let i = 0, x = 0, y = 0; i < enemies.length; i++, x++) {
      if (x === 2) (x = 0), y++;
      this.ctx.drawImage(
        this.sprite.image,
        PANEL_ICONS_SPRITES[0],
        PANEL_ICONS_SPRITES[1],
        TILE_SIZE,
        TILE_SIZE,
        PANEL_ICONS_POSITION[0] + x * TILE_SIZE,
        PANEL_ICONS_POSITION[1] + y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }

  renderStagesNum() {
    this.ctx.drawImage(
      this.sprite.image,
      PANEL_STAGE_INFO_SPRITES[0][0],
      PANEL_STAGE_INFO_SPRITES[0][1],
      CELL_SIZE,
      CELL_SIZE,
      PANEL_STAGE_INFO_POSITION[0][0],
      PANEL_STAGE_INFO_POSITION[0][1],
      CELL_SIZE,
      CELL_SIZE
    );
    this.ctx.drawImage(
      this.sprite.image,
      PANEL_STAGE_INFO_SPRITES[1][0],
      PANEL_STAGE_INFO_SPRITES[1][1],
      TILE_SIZE,
      TILE_SIZE,
      PANEL_STAGE_INFO_POSITION[1][0],
      PANEL_STAGE_INFO_POSITION[1][1],
      TILE_SIZE,
      TILE_SIZE
    );
  }

  renderPayerExtraLives(player) {
    this.ctx.drawImage(
      this.sprite.image,
      PANEL_EXTRA_LIVES_SPRITES[0][0],
      PANEL_EXTRA_LIVES_SPRITES[0][1],
      CELL_SIZE,
      CELL_SIZE,
      PANEL_EXTRA_LIVES_POSITION[0][0],
      PANEL_EXTRA_LIVES_POSITION[0][1],
      CELL_SIZE,
      CELL_SIZE
    );
    this.ctx.drawImage(
      this.sprite.image,
      PANEL_EXTRA_LIVES_SPRITES[1][0] + player.extraLives * TILE_SIZE,
      PANEL_EXTRA_LIVES_SPRITES[1][1],
      TILE_SIZE,
      TILE_SIZE,
      PANEL_EXTRA_LIVES_POSITION[1][0],
      PANEL_EXTRA_LIVES_POSITION[1][1],
      TILE_SIZE,
      TILE_SIZE
    );
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
