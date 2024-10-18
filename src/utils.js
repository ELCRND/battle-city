import { DIRECTION } from "./constants.js";

export function getDirectionForKeys(keys) {
  if (keys.has("ArrowUp")) return DIRECTION.UP;
  if (keys.has("ArrowRight")) return DIRECTION.RIGHT;
  if (keys.has("ArrowDown")) return DIRECTION.DOWN;
  if (keys.has("ArrowLeft")) return DIRECTION.LEFT;
}

export function getAxisforDirection(direction) {
  return direction % 2 === 0 ? "y" : "x";
}

export function getValueForDirection(direction) {
  switch (direction) {
    case DIRECTION.UP:
      return -1;
    case DIRECTION.RIGHT:
      return 1;
    case DIRECTION.DOWN:
      return 1;
    case DIRECTION.LEFT:
      return -1;
  }
}

export function getSideForDirection(direction) {
  switch (direction) {
    case DIRECTION.UP:
      return "top";
    case DIRECTION.RIGHT:
      return "right";
    case DIRECTION.DOWN:
      return "bottom";
    case DIRECTION.LEFT:
      return "left";
  }
}
