/*__________________________GENERALS__________________________*/

export const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

export const OBJECTS_TYPE = {
  BASE: "base",
  PLAYER1: "player-1",
  ENEMY_TANK: "enemy-tank",
  BULLET: "bullet",
  BULLET_EXPLOSION: "bullet-explosion",
  TANK_EXPLOSION: "tank-explosion",
  BRICK_WALL: "brick-wall",
  STEEL_WALL: "steel-wall",
  POINTS: "points",
  PLAYER_SHIELD: "player-shield",
  SPAWN_MARKER: "spawn-marker",
};

/*__________________________SIZES__________________________*/

export const NUMBER_OF_CELL = 13;
export const CELL_SIZE = 64;
export const TILE_SIZE = CELL_SIZE / 2;
export const STAGE_SIZE = NUMBER_OF_CELL * CELL_SIZE;

/*__________________________CONTROLS__________________________*/

export const Keys = {
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  SPACE: "Space",
};

/*__________________________TANK__________________________*/

export const TANK_TYPE = 0;
export const TANK_WIDTH = CELL_SIZE;
export const TANK_HEIGHT = CELL_SIZE;
export const TANK_SPEED = 3;

/*__________________________BASE__________________________*/

export const BASE_X = 6 * CELL_SIZE;
export const BASE_Y = 12 * CELL_SIZE;
export const BASE_WIDTH = CELL_SIZE;
export const BASE_HEIGHT = CELL_SIZE;
export const BASE_SPTITES = [
  [19 * CELL_SIZE, 2 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [20 * CELL_SIZE, 2 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
];

/*__________________________BULLET__________________________*/

export const BULLET_WIDTH = 16;
export const BULLET_HEIGHT = 16;
export const BULLET_SPEED = 7;
export const BULLET_SPRITES = [
  [20 * CELL_SIZE + 8, 6 * CELL_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT], // bullet up
  [21.5 * CELL_SIZE + 8, 6 * CELL_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT], // bullet left
  [21 * CELL_SIZE + 8, 6 * CELL_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT], // bullet down
  [20.5 * CELL_SIZE + 8, 6 * CELL_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT], // bullet right
];

/*__________________________PLAYER__________________________*/

export const PLAYER1_EXTRA_LIVES = 2;
export const PLAYER1_START_POSITION_X = 4 * CELL_SIZE;
export const PLAYER1_START_POSITION_Y = 12 * CELL_SIZE;
export const PLAYER1_SPRITES = [
  [0 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // up
  [1 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // up move
  [6 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // right
  [7 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // right move
  [4 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // down
  [5 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // down move
  [2 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // left
  [3 * CELL_SIZE, TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // left move
];

export const PLAYER_SHIELD_SPRITES = [
  [16 * CELL_SIZE, 9 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [17 * CELL_SIZE, 9 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
];

/*__________________________WALLS__________________________*/

export const BRICK_WALL_SPRITES = [
  [16 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 1111 full 0
  [16.5 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 0101 right 1
  [17 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 0011 bottom 2
  [17.5 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 1010 left 3
  [18 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 1100 top 4
  [18.5 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 0010     5        [1][2]
  [19 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 1000     6         [3][4]
  [19.5 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 0001 7
  [20 * CELL_SIZE, 4 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // 0100 8
];

export const STEEL_WALL_SPRITES = [
  [16 * CELL_SIZE, 4.5 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // full wall x,y,w,h
  [17 * CELL_SIZE, 4.5 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // right wall
  [18 * CELL_SIZE, 4.5 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // bottom wall
  [19 * CELL_SIZE, 4.5 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // left wall
  [20 * CELL_SIZE, 4.5 * CELL_SIZE, TILE_SIZE, TILE_SIZE], // top wall
];

/*__________________________EXPLOSION__________________________*/

export const BULLET_EXPLOSION_WIDTH = CELL_SIZE;
export const BULLET_EXPLOSION_HEIGHT = CELL_SIZE;
export const BULLET_EXPLOSION_ANIMATION_SPEED = 50; // ms
export const BULLET_EXPLOSION_DESTROY_DELAY = 50; // ms
export const BULLET_EXPLOSION_SPRITES = [
  [16 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion
  [17 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion 2
  [18 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion 3
];

export const TANK_EXPLOSION_WIDTH = CELL_SIZE;
export const TANK_EXPLOSION_HEIGHT = CELL_SIZE;
export const TANK_EXPLOSION_ANIMATION_SPEED = 70; // ms
export const TANK_EXPLOSION_DESTROY_DELAY = 70; // ms
export const TANK_EXPLOSION_SPRITES = [
  [16 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion
  [17 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion 2
  [18 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion 3
  [19 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE * 2, CELL_SIZE * 2], // explosion 4
  [21 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE * 2, CELL_SIZE * 2], // explosion 5
  [18 * CELL_SIZE, 8 * CELL_SIZE, CELL_SIZE, CELL_SIZE], // explosion 3
];

/*__________________________ENEMY__________________________*/
export const ENEMY_TANK_QUANT = 4;
export const ENEMY_TANK_SPEED = 2;
export const ENEMY_TANK_TURN_TIMER_THRESHOLD = 200; // ms
export const ENEMY_TANK_SPAWN_TIMEOUT = 5000; // ms
export const ENEMY_TANK_RANDOM_TURN = 32; // 1 to 31
export const ENEMY_TANK_RANDOM_FIRE = 100; // 1 to 99
export const PLAYER_HUNTING_TIME = 20000;
export const BASE_HUNTING_TIME = 40000;
export const ENEMY_TANK_START_POSITIONS = [
  [6 * CELL_SIZE, 0],
  [12 * CELL_SIZE, 0],
  [0 * CELL_SIZE, 0],
];
export const ENEMY_TANK_TYPE = 4;
export const ENEMY_TANK_SPRITES = [
  [8 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // up
  [9 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // up move
  [14 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // right
  [15 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // right move
  [12 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // down
  [13 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // down move
  [10 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // left
  [11 * CELL_SIZE, ENEMY_TANK_TYPE * CELL_SIZE, CELL_SIZE, CELL_SIZE], // left move
];

export const ENEMY_TANK_SPAWN_SPRITES = [
  [19 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [18 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [17 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [16 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [17 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [18 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [19 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [18 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [17 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [16 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [17 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [18 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
  [19 * CELL_SIZE, 6 * CELL_SIZE, CELL_SIZE, CELL_SIZE],
];
export const ENEMY_TANK_SPAWN_ANIMATION_SPEED = 80;
export const ENEMY_TANK_SPAWN_MARK_TIMEOUT =
  ENEMY_TANK_SPAWN_TIMEOUT -
  ENEMY_TANK_SPAWN_SPRITES.length * ENEMY_TANK_SPAWN_ANIMATION_SPEED;

/* __________________________PANEL__________________________ */
export const PANEL_ICONS_POSITION = [926, 96];
export const PANEL_ICONS_SPRITES = [CELL_SIZE * 18, CELL_SIZE * 11.5];

export const PANEL_STAGE_INFO_SPRITES = [
  [CELL_SIZE * 24, 0],
  [CELL_SIZE * 19, CELL_SIZE * 11],
];
export const PANEL_STAGE_INFO_POSITION = [
  [926, 700],
  [960, 770],
];

export const PANEL_EXTRA_LIVES_SPRITES = [
  [CELL_SIZE * 22, 0],
  [CELL_SIZE * 18.5, CELL_SIZE * 11],
];
export const PANEL_EXTRA_LIVES_POSITION = [
  [926, 548],
  [962, 580],
];

/* __________________________SCORE__________________________ */
export const POINTS_WIDTH = CELL_SIZE;
export const POINTS_HEIGHT = TILE_SIZE;
export const POINTS_DESTROY_DELAY = 50;
export const POINTS_SPRITES = [
  [16 * CELL_SIZE, 10 * CELL_SIZE, CELL_SIZE, TILE_SIZE], // 100
  [17 * CELL_SIZE, 10 * CELL_SIZE, CELL_SIZE, TILE_SIZE], // 200
  [18 * CELL_SIZE, 10 * CELL_SIZE, CELL_SIZE, TILE_SIZE], // 300
  [19 * CELL_SIZE, 10 * CELL_SIZE, CELL_SIZE, TILE_SIZE], // 400
  [20 * CELL_SIZE, 10 * CELL_SIZE, CELL_SIZE, TILE_SIZE], // 500
];
