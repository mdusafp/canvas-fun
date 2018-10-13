import { Stage, Layer, Text } from 'konva';
import { Entity } from './entity';
import {
  CIRCLE_RADIUS,
  PRIMARY_COLOR,
  DANGER_COLOR,
  INFO_OFFSET_X,
  INFO_OFFSET_Y,
} from './constants';
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

    this.infoText = new Text({ fill: PRIMARY_COLOR, x: INFO_OFFSET_X, y: INFO_OFFSET_Y });
    this.infoText.offsetX(this.infoText.getTextWidth());
    this.infoText.offsetY(this.infoText.getTextHeight());
    this.layer.add(this.infoText);

    this.entities.forEach(entity => this.layer.add(entity.getCircle()));
    this.stage.add(this.layer);
  }

  calcInfluence(temperature, vibration) {
    this.infoText.text(`
      Temperature: ${temperature}
      Vibration: ${vibration}
      Influence function: t * v * |t - v| * pi / 2d
      t - temperature
      v - vibration
      pi - math constant
      d - distance
    `);

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

      const totalInfluence = temperature * Math.PI / 2 * vibration * Math.abs(temperature - vibration) / distance;
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