import TodoTitle from "./TodoTitle.js";
import TodoUser from "./TodoUser.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import TodoDeleteAll from "./TodoDeleteAll.js";

import api from "../Utils/api.js"; // ❓ {api}랑 무슨 차이?

function TodoApp() {
  const init = async () => {
    this.state = {
      // ❓ 항상 의문인 const와 this의 차이 및 사용법
      user: [],
      users: [],
      // filter: "all",
    };

    this.state.users = await api.getUserList();
    // ❓ await를 함수 내에서도 써줬는데 여기도 쓴다? 모르겠다...
    this.state.user = this.state.users[0];

    this.todoTitle = new TodoTitle({
      $target: document.querySelector("#user-title"),
    });

    this.todoUser = new TodoUser({
      $target: document.querySelector("#user-list"),
      onChangeUser: (userId) => {
        for (const user of this.state.users) {
          if (user._id === userId) {
            this.state.user = user;
            break;
          }
        }
        this.setState();
      },
      onDeleteUser: async (userId, userName) => {
        if (confirm(`${userName}을 삭제하시겠습니까?`)) {
          await api.deleteUser(userId);
          this.state.users = await api.getUserList();
          this.state.user = this.state.users[0];
          this.setState(false);
        }
      },
      onCreateUser: async () => {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요."); // c처럼 이거 한줄에 못쓰나?
        if (userName) {
          await api.addUser(userName);
          this.setState();
        }
      },
    });

    this.todoInput = new TodoInput({
      $target: document.querySelector(".new-todo"),
      onAddItem: async (contents) => {
        await api.addItem(this.state.user._id, contents);
        this.setState();
      },
    });

    this.todoList = new TodoList({
      $target: document.querySelector(".todo-list"),
      onCheckItem: async (dataId) => {
        await api.completeToggle(this.state.user._id, dataId);
        this.setState();
      },
      onEditItem: async (dataId, contents) => {
        await api.editItem(this.state.user._id, dataId, contents);
        this.setState();
      },
      onDeleteItem: async (dataId) => {
        await api.deleteItem(this.state.user._id, dataId);
        this.setState();
      },
    });

    this.todoCount = new TodoCount({
      $target: document.querySelector(".todo-count strong"),
    });

    this.todoFilter = new TodoFilter({
      $target: document.querySelector(".filters"),
    });
    // ❓ 지나친 분리인가? 어떻게 하는게 적절할까?

    this.todoDeleteAll = new TodoDeleteAll({
      $target: document.querySelector(".clear-completed"),
      onDeleteAll: async () => {
        await api.deleteItemAll(this.state.user._id);
        this.setState();
      },
    });

    this.setState();
  };

  this.fetchState = async () => {
    this.state.users = await api.getUserList();
    this.state.user = await api.getUser(this.state.user._id);
  };

  this.setState = (doFetch = true) => {
    if (doFetch) {
      this.fetchState();
    }
    this.todoTitle.setState(this.state);
    this.todoUser.setState(this.state);
    this.todoList.setState(this.state);
    this.todoCount.setState(this.state);
  };

  init();
}

export default TodoApp;
