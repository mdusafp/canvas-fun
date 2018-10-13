import { Scene } from './scene';
import { CONTAINER, GUEST_EMAIL, GUEST_PASS } from './constants';

(function (document) {
  function setup(width, height) {
    const scene = new Scene(width, height, CONTAINER);
    scene.calcInfluence(width / 2, height / 2);
    // TODO: move event listener directly to entity and understand how to call calcInfluence from entity
    document.onmouseup = event => scene.calcInfluence(event.x, event.y);
  }
  
  function login() {
    const { loginForm } = document.forms;
    const { email, password } = loginForm.elements;

    if (email.value === GUEST_EMAIL && password.value === GUEST_PASS) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setup(width, height);
    }
  }
  
  function renderLogin(elem) {
    elem.innerHTML = `
      <form class="form" name="loginForm">
        <h2>etu apu</h2>
        <input type="email" name="email" placeholder="Enter email" required />
        <input type="password" name="password" placeholder="Enter password" required />
        <button type="submit">Log in</button>
      </form>
    `;

    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.onclick = event => {
      event.preventDefault();
      login();
    }
  }
  
  function main() {
    const container = document.getElementById(CONTAINER);
    renderLogin(container);
  }
  
  main();
})(window.document)
