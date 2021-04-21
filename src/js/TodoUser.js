function TodoUser({ onChangeUser }) {
  // this.todoUsers = [];
  this.selectedUserId = "";

  this.setState = () => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        const userObject = JSON.parse(xhr.responseText);
        this.todoUsers = [];
        for (const user of userObject) {
          this.todoUsers.push(user);
        }
        if (!this.selectedUserId) {
          this.selectedUserId = this.todoUsers[0]._id;
          // console.log(this.selectedUser);
        }
        this.render();
        // console.log(this);
        // ❗️ arrow function으로 하면 this가 TodoUser, 아니면 xhr 되는 듯?
      }
    };
    xhr.open(
      "GET",
      "https://js-todo-list-9ca3a.df.r.appspot.com/api/users",
      true
    );
    xhr.send();
  };

  this.render = () => {
    $userList.innerHTML = "";
    this.todoUsers
      .map(todoItemTemplate)
      .map((value) => $userList.append(value));
  };

  const todoItemTemplate = (item) => {
    const makeDOM = (tag, attributes) => {
      const dom = document.createElement(tag);
      for (const key in attributes) {
        // for of 불가
        dom.setAttribute(key, attributes[key]);
      }
      return dom;
    };

    const userListItem = makeDOM("user-list-item", {
      key: item._id,
      "data-_id": item._id,
      "data-name": item.name,
      "data-todolist": item.todoList,
      "data-active": item._id === this.selectedUserId ? true : false,
    });

    const button = makeDOM("button", {
      class: item._id === this.selectedUserId ? "ripple active" : "ripple",
      "data-id": item._id,
      "data-action": "selectUser",
      selectuser: "click",
    });
    button.append(document.createTextNode(item.name));

    userListItem.append(button);
    return userListItem;
  };

  const $userList = document.querySelector("#user-list");
  $userList.addEventListener("click", (e) => clickTodoUser(e));

  const clickTodoUser = (event) => {
    if (event.target.classList.contains("ripple")) {
      this.selectedUserId = event.target.getAttribute("data-id");

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          const userObject = JSON.parse(xhr.responseText);
          onChangeUser(userObject);
        }
      };
      xhr.open(
        "GET",
        `https://js-todo-list-9ca3a.df.r.appspot.com/api/users/${this.selectedUserId}`,
        true
      );
      xhr.send();
    }
  };
}

export default TodoUser;
