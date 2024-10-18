export default class Input {
  constructor() {
    this.keys = new Set();
    this.init();
  }

  init() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.repeat) return;
      switch (e.code) {
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowDown":
        case "ArrowLeft":
        case "Space":
        case "Escape":
        default:
          e.preventDefault();
          this.keys.add(e.code);
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowDown":
        case "ArrowLeft":
        case "Space":
        case "Escape":
        default:
          e.preventDefault();
          this.keys.delete(e.code);
      }
    });
  }

  has(...arg) {
    return Array.isArray(arg)
      ? arg.some((key) => this.keys.has(key))
      : this.keys.has(arg);
  }
}
