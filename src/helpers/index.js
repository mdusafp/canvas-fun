import { Circle } from 'konva';
import { PRIMARY_COLOR, BORDER_COLOR } from '../constants';

// TODO: provide generator which will disable generation of coordinates on the border
function generateCoordinates(width, height) {
  return {
    x: Math.ceil(Math.random() * width),
    y: Math.ceil(Math.random() * height),
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
 * @param {number} options.width
 * @param {number} options.height
 * @param {number} options.radius
 */
export function circleFactory(options) {
  const width = options.width || 100;
  const height = options.height || 100;
  const radius = options.radius || 50;

  const { x, y } = generateCoordinates(width, height);

  const circleConfig = {
    x, y,
    radius,
    fill: PRIMARY_COLOR,
    stroke: BORDER_COLOR,
    strokeWidth: 1,
    draggable: true,
    dragBoundFunc(position) {
      const maxWidth = width - radius;
      const maxHeight = height - radius;
      return {
        x: position.x > maxWidth ? maxWidth : position.x < radius ? radius : position.x,
        y: position.y > maxHeight ? maxHeight : position.y < radius ? radius : position.y,
      }
    }
  };

  return new Circle(circleConfig);
}
