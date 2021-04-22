import TodoApp from "./Components/TodoApp.js";

const init = () => {
  new TodoApp();
};

window.addEventListener("load", init);
// document.addEventListener('DOMContentLoaded', init); // ❓ 차이?

// window.addEventListener('load', () => TodoApp()); // ❓ 차이?
// new todoApp(); // ❓ 차이?
