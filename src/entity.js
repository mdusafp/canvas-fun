import { circleFactory, rectFactory } from "./helpers";

class BaseEntity {
  constructor(area, baseColor) {
    this._damage = 0;
    this._health = area * 2;
    this._baseColor = baseColor;
  }

  getBaseColor() {
    return this._baseColor;
  }

  setFill(color) {
    this._figure.setFill(color);
  }

  getTotalHealth() {
    return this._health;
  }

  getCurrentHealth() {
    return this._health - this._damage;
  }

  setDamage(damage) {
    this._damage = damage;
  }

  getEntity() {
    return this._figure;
  }
}

export class CircleEntity extends BaseEntity {
  constructor({
    area,
    coords,
    radius,
    baseColor,
    dragBoundFunc,
  }) {
    super(area, baseColor);

    this._radius = radius;
    this._figure = circleFactory({ coords, radius, baseColor, dragBoundFunc });
  }
}

export class RectEntity extends BaseEntity {
  constructor({
    area,
    width,
    height,
    coords,
    baseColor,
    dragBoundFunc,
  }) {
    super(area, baseColor);

    this._figure = rectFactory({ width, height, coords, baseColor, dragBoundFunc });
  }
}
