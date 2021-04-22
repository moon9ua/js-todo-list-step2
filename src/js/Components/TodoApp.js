import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoItem from "./TodoItem.js";
import TodoCount from "./TodoCount.js";
import TodoUser from "./TodoUser.js";
import TodoTitle from "./TodoTitle.js";
import api from "../Utils/api.js"; // ❓ {api}랑 무슨 차이?

function TodoApp() {
  // this.todoItems = []; // _id, contents, isCompleted, priority 객체 배열

  const init = async () => {
    this.state = {
      // ❓ 항상 의문인 const와 this의 차이 및 사용법
      user: [],
      users: [],
      filter: "all",
    };

    this.state.users = await api.getUserList();
    this.state.user = this.state.users[0];
    // ❓ await를 함수 내에서도 써줬는데 여기도 쓴다? 병렬처리를 위해?
    // ❓ user도 await를 써야해?

    this.todoTitle = new TodoTitle({
      $target: document.querySelector("#user-title"),
    });

    this.todoUser = new TodoUser({
      $target: document.querySelector("#user-list"),
      onChangeUser: (id) => {
        this.state.users.map((user) => {
          if (user._id === id) {
            this.state.user = user;
          }
        });
        this.setState();
      },
      onDeleteUser: () => {},
      onCreateUser: () => {},
    });

    this.todoList = new TodoList({
      $target: document.querySelector(".todo-list"),
      onCheck: (id) => {},
    });

    // const todoUser = new TodoUser({
    //   onChangeUser: (user) => {
    //     this.todoItems = user.todoList;
    //     this.setState(this.todoItems);
    //   },
    // });

    // new TodoInput({
    //   onAdd: (contents) => {
    //     // const newTodoItem = new TodoItem(contents, uniqueId());
    //     // this.todoItems.push(newTodoItem);
    //     // this.setState(this.todoItems);
    //     // const xhr = new XMLHttpRequest();
    //     // xhr.onreadystatechange = () => {
    //     //   if (xhr.readyState === xhr.DONE) {
    //     //   }
    //     // };
    //     // xhr.open(
    //     //   "POST",
    //     //   `https://js-todo-list-9ca3a.df.r.appspot.com/api/users/${this.todoItems._id}/items/`,
    //     //   true
    //     // );
    //     // xhr.send();
    //   },
    // });

    // const todoList = new TodoList({
    //   onCheck: (id) => {
    //     this.todoItems.forEach((item) => {
    //       if (item.getId() == id) item.switchCompleted();
    //     });
    //     this.setState(this.todoItems);
    //   },
    //   onEditing: (id) => {
    //     this.todoItems.forEach((item) => {
    //       if (item.getId() == id) item.switchEditing();
    //     });
    //     this.setState(this.todoItems);
    //   },
    //   onEdit: (id, contents) => {
    //     this.todoItems.forEach((item) => {
    //       if (item.getId() == id) {
    //         item.switchEditing();
    //         item.setContents(contents);
    //       }
    //     });
    //     this.setState(this.todoItems);
    //   },
    //   onDelete: (id) => {
    //     const updatedItems = this.todoItems.filter((item) => {
    //       return item.getId() != id;
    //     });
    //     this.setState(updatedItems);
    //   },
    // });

    // const todoCount = new TodoCount({
    //   onFilter: (filter) => {
    //     const updatedItems = this.todoItems.filter((item) => {
    //       if (filter === "all") return true;
    //       else if (filter === "active") return item.getCompleted() == false;
    //       else if (filter === "completed") return item.getCompleted() == true;
    //     });
    //     todoList.setState(updatedItems);
    //     todoCount.setState(updatedItems);
    //   },
    // });
    this.setState();
  };

  this.setState = () => {
    // this.todoItems = updatedItems;

    // console.log(this.state);

    this.todoTitle.setState(this.state);
    this.todoUser.setState(this.state);
    this.todoList.setState(this.state);
    // console.log(this.todoItems);
    // todoList.setState(this.todoItems);
    // todoCount.setState(this.todoItems);
  };

  init();
}

export default TodoApp;
