import Game from "./src/game.js";
import Input from "./src/input.js";
import View from "./src/view.js";
import Sprite from "./src/sprite.js";
import stages from "./data/stages.js";
import Menu from "./src/menu.js";

const menuNode = document.querySelector("#menu");
const canvas = document.querySelector("#canvas");
// const sprite = new Sprite("./assets/final32.png");
const sprite = new Sprite("./assets/final64.png");

const game = new Game({
  input: new Input(),
  view: new View(canvas, sprite),
  menu: new Menu(menuNode),
  stages,
  sprite,
});

game.init().then(() => game.start());
console.log(game);
