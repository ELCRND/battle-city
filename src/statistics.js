/*!!!*/
const node = document.querySelector("#statistics");

export default class Statistics {
  static *counterGenerator(a) {
    let b = 0;
    while (b < a) yield ++b;
  }

  constructor({ stage, stageIndex, sprite }) {
    this.stage = stage;
    this.stageIndex = stageIndex;
    this.sprite = sprite;
    this.node = node;
    this.canvas = null;
    this.ctx = null;
    this.frames = 0;
    this.tankType = 0;
    this.counter = Statistics.counterGenerator(
      this.stage.player.enemiesStatistics[this.tankType]
    );
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1024;
    this.canvas.height = 960;
    this.ctx = this.canvas.getContext("2d");
    this.node.appendChild(this.canvas);
  }

  off() {
    this.clearScreen();
    this.canvas.width = 0;
    this.canvas.height = 0;
  }

  update(frameDelta) {
    this._renderRecord();
    this._renderStageCount(this.stageIndex);
    this._renderPlayer();
    this._renderScore(this.stage.player.score);
    this.frames += frameDelta;
    if (this.frames > 300) {
      const count = this.counter.next();
      if (count.done) {
        this.tankType += 1;
        this.counter = Statistics.counterGenerator(
          this.stage.player.enemiesStatistics[this.tankType]
        );
      }
      !count.done && this._renderScoreByTank(count.value, this.tankType);
      this.frames = 0;
    }
  }

  _renderRecord() {
    this.ctx.font = "36px PressStart2P";
    this.ctx.fillStyle = "#de2800";
    this.ctx.fillText("Record", 0, 50);
    this.ctx.fillStyle = "#b77010";
    this.ctx.fillText(localStorage.getItem("score"), 400, 50);
  }

  _renderStageCount(stageNum) {
    this.ctx.font = "36px PressStart2P";
    this.ctx.fillStyle = "#de2800";
    this.ctx.fillText(`Stage ${stageNum + 1}`, 0, 150);
  }

  _renderPlayer() {
    this.ctx.font = "36px PressStart2P";
    this.ctx.fillStyle = "#de2800";
    this.ctx.fillText(`1 player`, 0, 250);
  }

  _renderScore(score) {
    this.ctx.font = "36px PressStart2P";
    this.ctx.fillStyle = "#b77010";
    this.ctx.fillText(score, 100, 350);
  }

  _renderScoreByTank(count, tankType) {
    this.ctx.font = "36px PressStart2P";
    this.ctx.fillStyle = "#fff";

    this.ctx.clearRect(0, 400 + 100 * tankType, this.canvas.width, 150);
    this.ctx.fillText(`${count * (100 * (tankType + 1))}`, 0, 450 + 100 * tankType);
    this.ctx.fillText(`pt.`, 200, 450 + 100 * tankType);
    this.ctx.fillText(`${count}`, 400, 450 + 100 * tankType);

    this.ctx.drawImage(
      this.sprite.image,
      8 * 64,
      (4 + tankType) * 64,
      64,
      64,
      500,
      396 + 100 * tankType,
      64,
      64
    );
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
