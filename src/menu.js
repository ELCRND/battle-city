/*!!!*/
export default class Menu {
  constructor(node) {
    this.node = document.querySelector("#menu");
    this.canvas = null;
    this.ctx = null;
    this.sprite = null;
    this.selectors = [];
    this.selector = 0;
    this.frames = 0;
    this.animationFrame = 0;
  }

  async init() {
    this.node.appendChild(this._createSinglePlayer());
    this.node.appendChild(this._createMultyPlayer());
    this.node.appendChild(this._createEditor());
    this._initCanvas();
  }

  update(input, frameDelta) {
    if (input.has("ArrowDown")) {
      if (this.selector < this.selectors.length - 1) {
        this.selector += 1;
      } else this.selector = 0;
      this._clearCanvas();
      this._initCanvas();
      input.keys.delete("ArrowDown");
    }

    if (input.has("ArrowUp")) {
      if (this.selector > 0) {
        this.selector -= 1;
      } else this.selector = this.selectors.length - 1;
      this._clearCanvas();
      this._initCanvas();
      input.keys.delete("ArrowUp");
    }

    this._renderMark();
    this._animationMark(frameDelta);
  }

  off() {
    this.node.innerHTML = "";
  }

  _initCanvas() {
    this.canvas = this.selectors[this.selector].querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  _renderMark() {
    this.ctx.drawImage(
      this.sprite.image,
      (6 + this.animationFrame) * 64,
      0,
      64,
      64,
      0,
      0,
      64,
      64
    );
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, 64, 64);
  }

  _animationMark(frameDelta) {
    this.frames += frameDelta;
    if (this.frames > 50) {
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  _createSinglePlayer() {
    const selectionItem = document.createElement("div");
    const id = "single-player";
    selectionItem.id = id;
    selectionItem.setAttribute("value", id);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    canvas.id = `canvas-${id}`;

    const text = document.createElement("span");
    text.innerText = `1 Player`;

    selectionItem.appendChild(canvas);
    selectionItem.appendChild(text);

    this.selectors.push(selectionItem);

    return selectionItem;
  }

  _createMultyPlayer() {
    const selectionItem = document.createElement("div");
    const id = "multy-player";
    selectionItem.id = id;
    selectionItem.setAttribute("value", id);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    canvas.id = `canvas-${id}`;

    const text = document.createElement("span");
    text.innerText = `2 Players`;

    selectionItem.appendChild(canvas);
    selectionItem.appendChild(text);

    this.selectors.push(selectionItem);

    return selectionItem;
  }

  _createEditor() {
    const selectionItem = document.createElement("div");
    const id = "editor";
    selectionItem.id = id;
    selectionItem.setAttribute("value", id);

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    canvas.id = `canvas-${id}`;

    const text = document.createElement("span");
    text.innerText = `Editor`;

    selectionItem.appendChild(canvas);
    selectionItem.appendChild(text);

    this.selectors.push(selectionItem);

    return selectionItem;
  }
}
