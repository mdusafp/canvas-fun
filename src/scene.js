import { Stage, Layer } from 'konva';
import { Entity } from './entity';
import { CIRCLE_RADIUS, PRIMARY_COLOR, DANGER_COLOR } from './constants';
import { countDistance } from './helpers';

export class Scene {
  constructor(width, height, container) {
    this.width = width;
    this.height = height;

    this.stage = new Stage({
      width,
      height,
      container,
    });

    this.entities = [];
    for (let i = 0; i < 10; i++) this.entities.push(new Entity(width, height, CIRCLE_RADIUS));

    this.layer = new Layer();
    this.entities.forEach(entity => this.layer.add(entity.getCircle()));
    this.stage.add(this.layer);
  }

  calcInfluence(temperature, vibration) {
    for (const entity of this.entities) {
      let distance = 0;

      for (const _entity of this.entities) {
        if (entity !== _entity) {
          const aX = entity.getCircle().getX();
          const aY = entity.getCircle().getY();
          const bX = _entity.getCircle().getX();
          const bY = _entity.getCircle().getY();

          distance += countDistance(aX, aY, bX, bY);
        }
      }

      const totalInfluence = distance * temperature / vibration;
      console.log(totalInfluence, entity.getTotalHealth(), entity.getCurrentHealth());
      entity.setDamage(totalInfluence);
    }

    this.updateEntityColors();
    this.layer.draw();
  }

  updateEntityColors() {
    this.entities.forEach(entity => entity.setFill(
      entity.getCurrentHealth() > 0 ? PRIMARY_COLOR : DANGER_COLOR,
    ));
  }
}