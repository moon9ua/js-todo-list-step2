import TodoApp from "./TodoApp.js";

const init = () => {
  // new TodoApp();
  new TodoApp().setState(); // 이렇게하면 어떻게 동작?
};

window.addEventListener("load", init);
// document.addEventListener('DOMContentLoaded', init); // ❓ 차이?

// window.addEventListener('load', () => TodoApp()); // ❓ 차이?
// new todoApp(); // ❓ 차이?

// // userlist
// var xhrUserList = new XMLHttpRequest();
// xhrUserList.open(
//   "GET",
//   // "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/qyJuptvQY",
//   "https://js-todo-list-9ca3a.df.r.appspot.com/api/users",
//   true
// );
// xhrUserList.send();
// xhrUserList.onreadystatechange = function () {
//   // 요청에 대한 콜백
//   if (xhrUserList.readyState === xhrUserList.DONE) {
//     // 요청이 완료되면
//     // console.log(xhrUserList.responseText);
//     const json = JSON.parse(xhrUserList.responseText);
//     console.log(json);
//   }
// };
