import { CELL_SIZE } from "../src/constants.js";
// export default {
//   0: [21 * CELL_SIZE.15, 0, CELL_SIZE, CELL_SIZE], //empty
//   1: [CELL_SIZE * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // full wall x,y,w,h
//   2: [17 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // right wall
//   3: [18 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // bottom wall
//   4: [19 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // left wall
//   5: [20 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // top wall
//   10: [20 * CELL_SIZE, 1 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // steel

//   11: [0 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   12: [1 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   13: [6 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   14: [7 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   15: [4 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   CELL_SIZE: [5 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   17: [2 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
//   18: [3 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
// };
export default {
  0: [21 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], //empty
  1: [16 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // full wall x,y,w,h
  2: [17 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // right wall
  3: [18 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // bottom wall
  4: [19 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // left wall
  5: [20 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE], // top wall
  10: [20 * CELL_SIZE, 1 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // steel
  111: [16 * CELL_SIZE, 1 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // steel full wall

  11: [0 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  12: [1 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  13: [6 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  14: [7 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  15: [4 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  16: [5 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  17: [2 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
  18: [3 * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE],
};
