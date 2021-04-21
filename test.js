// const onUserCreateHandler = () => {
//   const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
// };

// const userCreateButton = document.querySelector(".user-create-button");
// userCreateButton.addEventListener("click", onUserCreateHandler);

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
