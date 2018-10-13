import { circleFactory } from "./helpers";

export class Entity {
  constructor(width, height, radius) {
    const areaOfCircle = Math.PI * Math.pow(radius, 2);
    this.damage = 0;
    this.health = areaOfCircle * 2;
    this.circle = circleFactory({ width, height, radius });
  }

  setFill(color) {
    this.circle.setFill(color);
  }

  getCircle() {
    return this.circle;
  }

  getTotalHealth() {
    return this.health;
  }

  getCurrentHealth() {
    return this.health - this.damage;
  }

  setDamage(damage) {
    this.damage = damage;
  }
}