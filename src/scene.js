import { Stage, Layer, Text } from 'konva';
import { CircleEntity, RectEntity } from './entity';
import {
  PRIMARY_COLOR,
  DANGER_COLOR,
  INFO_OFFSET_X,
  INFO_OFFSET_Y,
  SECONDARY_COLOR
} from './constants';
import { countDistance,
  getFigureParaments,
   generateCoordinates, 
  generateCoordinatesCircle,
   generateGrid } from './helpers';

export class Scene {
  constructor(width, height, container) {
    this.width = width;
    this.height = height;
    let grid = generateGrid(width, height);
    const figureParams = getFigureParaments(width, height);

    // TODO: do some stuff with grid -> use it for figure positioning
    console.log(grid);

    this.stage = new Stage({
      width,
      height,
      container,
    });

    this.entities = [];

    for (let i = 0; i < 3; i++) { 
      const area = figureParams.RECT_WIDTH * figureParams.RECT_HEIGHT;
      const coordsData = generateCoordinates(this.width, this.height, grid);
      grid = coordsData.grid;
      const coords = {
        x: coordsData.x,
        y: coordsData.y
      };

      const rectEntity = new RectEntity({
        area,
        coords,
        width: figureParams.RECT_WIDTH,
        height: figureParams.RECT_HEIGHT,
        baseColor: SECONDARY_COLOR,
        dragBoundFunc: this.dragBoundFunc.bind(this)
      });
      this.entities.push(rectEntity);
    }

    for (let i = 0; i < 5; i++) {
      const area = Math.PI * Math.pow(figureParams.CIRCLE_RADIUS, 2);
      const coords = generateCoordinatesCircle(this.width, this.height);

      const circleEntity = new CircleEntity({
        area,
        coords,
        radius: figureParams.CIRCLE_RADIUS,
        baseColor: PRIMARY_COLOR,
        dragBoundFunc: this.dragBoundFunc.bind(this)
      });
      this.entities.push(circleEntity);
    }

    this.layer = new Layer();

    this.infoText = new Text({ fill: PRIMARY_COLOR, x: INFO_OFFSET_X, y: INFO_OFFSET_Y });
    this.infoText.offsetX(this.infoText.getTextWidth());
    this.infoText.offsetY(this.infoText.getTextHeight());
    this.layer.add(this.infoText);

    this.entities.forEach(entity => this.layer.add(entity.getEntity()));
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
      Version 2
    `);

    for (const entity of this.entities) {
      let distance = 0;

      for (const _entity of this.entities) {
        if (entity !== _entity) {
          const aX = entity.getEntity().getX();
          const aY = entity.getEntity().getY();
          const bX = _entity.getEntity().getX();
          const bY = _entity.getEntity().getY();

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
      entity.getCurrentHealth() > 0 ? entity.getBaseColor() : DANGER_COLOR,
    ));
  }

  dragBoundFunc(position) {
    // TODO: add logic that doesn't allow entity go to under another entity
    // entities contains inside this because of bind context
    console.log(this);
    return {
      x: position.x,
      y: position.y,
    }
  }
}