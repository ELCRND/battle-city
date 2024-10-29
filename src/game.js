import Stage from "./stage.js";
import Statistics from "./statistics.js";

export default class Game {
  constructor({ input, view, menu, stages, sprite }) {
    this.input = input;
    this.view = view;
    this.menu = menu;
    this.statistics = null;
    this.stages = stages;
    this.sprite = sprite;
    this.stage = null;
    this.stageIndex = 1;
    this.frames = 0;
    this.lastFrame = 0;
  }

  get startGame() {
    return !this.menu;
  }

  async init() {
    this.menu.sprite = this.sprite;
    this.menu.init();
    await this.sprite.load();
  }

  start() {
    this.stage = new Stage(this.stages[this.stageIndex]);

    requestAnimationFrame(this._loop);
  }

  _loop = (currentFrame) => {
    if (this.stage?.gameOver && this.stage?.gameOverFrames > 300) {
      this.statistics = new Statistics({
        stage: this.stage,
        stageIndex: this.stageIndex,
      });
      this.statistics.init();
      this.view.off();
      this.view = null;
      this.stage = null;
    }

    if (this.menu?.selector === 0 && this.input.has("Enter")) {
      this.menu.off();
      this.menu = null;
      this.view.sprite = this.sprite;
      this.view.init();
    }

    const frameDelta = currentFrame - this.lastFrame;

    this.menu?.update(this.input, frameDelta);
    if (!this.menu) {
      this.stage?.update(this.input, frameDelta);
      this.view?.update(this.stage);
    }

    this.statistics?.update();

    this.frames = 0;
    this.lastFrame = currentFrame;

    requestAnimationFrame(this._loop);
  };
}
