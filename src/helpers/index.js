import { Circle, Rect } from 'konva';
import { BORDER_COLOR, CIRCLE_RADIUS, RECT_HEIGHT, RECT_WIDTH } from '../constants';

// TODO: provide generator which will disable generation of coordinates on the border
export function generateCoordinates(width, height, index, except) {
  const maxWidth = width - RECT_WIDTH;
  const maxHeight = height - RECT_HEIGHT;

  let x = index * RECT_WIDTH
  let y = index * RECT_HEIGHT

  return {
    x: x > maxWidth ? maxWidth : x < RECT_WIDTH ? 2 * RECT_WIDTH : x,
    y: y > maxHeight ? maxHeight : y < RECT_HEIGHT ? 2 * RECT_HEIGHT : y,
  }
}

export function generateCoordinatesCircle(width, height, except) {
  const maxWidth = width - CIRCLE_RADIUS;
  const maxHeight = height - CIRCLE_RADIUS;

  let x = Math.ceil(Math.random() * maxWidth);
  let y = Math.ceil(Math.random() * maxHeight);

  return {
    x: x > maxWidth ? maxWidth : x < CIRCLE_RADIUS ? 2 * CIRCLE_RADIUS : x,
    y: y > maxHeight ? maxHeight : y < CIRCLE_RADIUS ? 2 * CIRCLE_RADIUS : y,
  }
}

export function countDistance(aX, aY, bX, bY) {
  return Math.sqrt(
    Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2)
  );
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
    width: options.width || RECT_WIDTH,
    height: options.height || RECT_HEIGHT,
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
