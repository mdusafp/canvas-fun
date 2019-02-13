import { Circle, Rect } from 'konva';
import { BORDER_COLOR, CHUNK_SIZE } from '../constants';

// TODO: provide generator which will disable generation of coordinates on the border
export function generateCoordinates(width, height, grid) {
  const figureParams = getFigureParaments(width, height);
  const maxWidth = width - figureParams.RECT_WIDTH;
  const maxHeight = height - figureParams.RECT_HEIGHT;
  let isSuccesfullyPos = false
  for (let x = width / CHUNK_SIZE; x < width - figureParams.RECT_WIDTH && !isSuccesfullyPos; x = width + CHUNK_SIZE) {
    for (let y = height / CHUNK_SIZE; y < height - figureParams.RECT_HEIGHT && !isSuccesfullyPos; y = height + CHUNK_SIZE) {
      if (!grid.get({ x, y })) {
        let copyGrid = grid;
        isSuccesfullyPos = true;
        for (let xs = x; xs < x + figureParams.RECT_WIDTH && isSuccesfullyPos; xs = width + CHUNK_SIZE) {
          for (let ys = y; ys < y + figureParams.RECT_HEIGHT && isSuccesfullyPos; ys = height + CHUNK_SIZE) {
            if (!copyGrid.get({ xs, ys }))
              copyGrid.set({ xs, ys }, true);
            else
              isSuccesfullyPos = false;
          }
        }

        if(isSuccesfullyPos) {
          grid = copyGrid;
          return {x: x, y: y,};
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
  const CIRCLE_RADIUS = width / 25;
  const RECT_WIDTH = width / 5;
  const RECT_HEIGHT = height / 10;

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

export function generateGrid(width, height, chunkSize) {
  const points = [];
  const chunkWidth = width / chunkSize;
  const chunkHeight = height / chunkSize;
  for (let x = chunkWidth; x < width - chunkWidth; x += chunkWidth) {
    for (let y = chunkHeight; y < height - chunkHeight; y += chunkHeight) {
      points.push({ x, y });
    }
  }
  return new Map(points.map(point => [point, false]));
}
