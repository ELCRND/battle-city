const node = document.querySelector("#statistics");

export default class Statistics {
  constructor({ stage, stageIndex }) {
    this.stage = stage;
    this.stageIndex = stageIndex;
    this.node = node;
    this.canvas = null;
    this.ctx = null;
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1024;
    this.canvas.height = 960;
    this.ctx = this.canvas.getContext("2d");
    this.node.appendChild(this.canvas);
  }

  update() {
    this._renderRecord();
    this._renderStageCount(this.stageIndex);
    this._renderPlayer();
    this._renderScore(this.stage.player.score);
    // this._renderScoreByTank(3);
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
    this.ctx.fillStyle = "#de2800";
    this.ctx.fillText(`${count} pt.`, 80, 450);
  }
}
