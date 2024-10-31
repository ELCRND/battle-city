/*!!!*/
import Menu from "./menu.js";
import Stage from "./stage.js";
import Statistics from "./statistics.js";
import View from "./view.js";

export default class Game {
  constructor({ input, view, menu, stages, sprite }) {
    this.input = input;
    this.view = view;
    this.menu = menu;
    this.statistics = null;
    this.stages = stages;
    this.sprite = sprite;
    this.stage = null;
    this.stageIndex = 0;
    this.frames = 0;
    this.lastFrame = 0;
    this.restart = false;
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
    if (!this.stage && this.statistics && this.input.has("Enter")) {
      this.input.keys.delete("Enter");
      this.statistics.off();
      this.statistics = null;

      if (this.restart || this.stageIndex >= this.stages.length - 1) {
        this.stageIndex = 0;
        this.menu = new Menu();
        this.menu.sprite = this.sprite;
        this.menu.init();
        this.view = new View(this.sprite);
        this.stage = new Stage(this.stages[this.stageIndex]);
      } else {
        this.stageIndex += 1;
        this.stage = new Stage(this.stages[this.stageIndex]);
        this.view = new View(this.sprite);
        this.view.init();
      }
    }

    if (this.stage?.gameOverComplete || this.stage?.stageCompleteFrames > 3000) {
      if (this.stage?.gameOverComplete) this.restart = true;

      this.statistics = new Statistics({
        stage: this.stage,
        stageIndex: this.stageIndex,
        sprite: this.sprite,
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

    this.statistics?.update(frameDelta);

    this.frames = 0;
    this.lastFrame = currentFrame;

    requestAnimationFrame(this._loop);
  };
}
