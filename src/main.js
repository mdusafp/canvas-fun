import { Scene } from './scene';
import { CONTAINER } from './constants';

function setup(width, height) {
  const scene = new Scene(width, height, CONTAINER);
  scene.calcInfluence(width / 2, height / 2);
  // TODO: move event listener directly to entity and understand how to call calcInfluence from entity
  document.onmouseup = event => scene.calcInfluence(event.x, event.y);
}

function main() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  setup(width, height);
}


main();