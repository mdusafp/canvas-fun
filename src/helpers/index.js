import { Circle, Rect } from 'konva';
import { BORDER_COLOR, CHUNK_SIZE } from '../constants';

// TODO: provide generator which will disable generation of coordinates on the border
export function generateCoordinates(width, height, grid) {
  const figureParams = getFigureParaments(width, height);
  let isSuccesfullyPos = false
  const chunkWidth = width / CHUNK_SIZE;
  const chunkHeight = height / CHUNK_SIZE;
  for (let x = chunkWidth; (x < width - chunkWidth) && !isSuccesfullyPos; x += chunkWidth) {
    for (let y = chunkHeight; (y < height - chunkHeight) && !isSuccesfullyPos; y += chunkHeight) {
      if (!grid.get({ x: x, y: y })) {
        let copyGrid = grid;
        isSuccesfullyPos = true;
        for (let xs = x; xs < x + figureParams.RECT_WIDTH && isSuccesfullyPos; xs += chunkWidth) {
          for (let ys = y; ys < y + figureParams.RECT_HEIGHT && isSuccesfullyPos; ys +=chunkHeight) {
            if (!copyGrid.get({ x: xs, y: ys })) {
              copyGrid[{ x: xs, y: ys }] = true;
              console.log(copyGrid)
            }
            else
              isSuccesfullyPos = false;
          }
        }

        if(isSuccesfullyPos) {
          return {x: x, y: y, grid: copyGrid};
        }
      }
    }
  }

  return {
    x: 0,
    y: 0,
  }
}

export function generateCoordinatesCircle(width, height) {
  const figureParams = getFigureParaments(width, height);
  const maxWidth = width - figureParams.CIRCLE_RADIUS;
  const maxHeight = height - figureParams.CIRCLE_RADIUS;

  let x = Math.ceil(Math.random() * maxWidth);
  let y = Math.ceil(Math.random() * maxHeight);

  return {
    x: x > maxWidth ? maxWidth : x < figureParams.CIRCLE_RADIUS ? 2 * figureParams.CIRCLE_RADIUS : x,
    y: y > maxHeight ? maxHeight : y < figureParams.CIRCLE_RADIUS ? 2 * figureParams.CIRCLE_RADIUS : y,
  }
}

export function countDistance(aX, aY, bX, bY) {
  return Math.sqrt(
    Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2)
  );
}

export function getFigureParaments(width, height) {
  const CIRCLE_RADIUS = 3 * width / CHUNK_SIZE;
  const RECT_WIDTH = 3 * width / CHUNK_SIZE;
  const RECT_HEIGHT = 5 * height / CHUNK_SIZE;

  return { CIRCLE_RADIUS, RECT_HEIGHT, RECT_WIDTH }
}

/**
 * Create konva circle
 * @param {*} options
 * @param {number} options.radius
 * @param {object} options.coords
 * @param {number} options.coords.x
 * @param {number} options.coords.y
 * @param {string} options.baseColor
 * @param {function} options.dragBoundFunc
 */
export function circleFactory(options) {
  const { x, y } = options.coords;

  const circleConfig = {
    x, y,
    radius: options.radius,
    fill: options.baseColor,
    stroke: BORDER_COLOR,
    strokeWidth: 1,
    draggable: true,
    dragBoundFunc: options.dragBoundFunc,
  };

  return new Circle(circleConfig);
}

/**
 * Create konva rect
 * @param {*} options
 * @param {number} options.width
 * @param {number} options.height
 * @param {object} options.coords
 * @param {number} options.coords.x
 * @param {number} options.coords.y
 * @param {string} options.baseColor
 * @param {function} options.dragBoundFunct
 */
export function rectFactory(options) {
  const { x, y } = options.coords;

  const rectConfig = {
    x, y,
    width: options.width,
    height: options.height,
    fill: options.baseColor,
    stroke: BORDER_COLOR,
    strokeWidth: 1,
    draggable: false,
    dragBoundFunc: options.dragBoundFunc,
  };

  return new Rect(rectConfig);
}

export function generateGrid(width, height) {
  const points = [];
  const chunkWidth = width / CHUNK_SIZE;
  const chunkHeight = height / CHUNK_SIZE;
  for (let x = chunkWidth; x < width - chunkWidth; x += chunkWidth) {
    for (let y = chunkHeight; y < height - chunkHeight; y += chunkHeight) {
      points.push({ x, y });
    }
  }
  return new Map(points.map(point => [point, false]));
}
