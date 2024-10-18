export default class Sprite {
  constructor(src) {
    this.src = src;
    this.image = new Image();
  }

  async load() {
    return new Promise((res, rej) => {
      this.image.src = this.src;
      this.image.addEventListener("load", () => res(this));
    });
  }
}
