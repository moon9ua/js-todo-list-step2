import TodoTitle from "./TodoTitle.js";
import TodoUser from "./TodoUser.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import TodoDeleteAll from "./TodoDeleteAll.js";

import api from "../Utils/api.js"; // ❓ {api}랑 무슨 차이?

function TodoApp() {
  this.state = {
    user: [],
    users: [],
    // filter: "all",
  };

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
        await this.fetchState(true);
        this.setState(true);
      }
    },
    onCreateUser: async () => {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요."); // ❓ c처럼 이거 한줄에 못쓰나?
      if (userName) {
        await api.addUser(userName);
        await this.fetchState();
        this.setState();
      }
    },
  });

  this.todoInput = new TodoInput({
    $target: document.querySelector(".new-todo"),
    onAddItem: async (contents) => {
      await api.addItem(this.state.user._id, contents);
      await this.fetchState();
      this.setState();
    },
  });

  this.todoList = new TodoList({
    $target: document.querySelector(".todo-list"),
    onCheckItem: async (dataId) => {
      await api.completeToggle(this.state.user._id, dataId);
      await this.fetchState();
      this.setState();
    },
    onEditItem: async (dataId, contents) => {
      await api.editItem(this.state.user._id, dataId, contents);
      await this.fetchState();
      this.setState();
    },
    onDeleteItem: async (dataId) => {
      await api.deleteItem(this.state.user._id, dataId);
      await this.fetchState();
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
      await this.fetchState();
      this.setState();
    },
  });

  this.fetchState = async (getFirstUser = false) => {
    this.state.users = await api.getUserList();
    this.state.user = await api.getUser(
      getFirstUser ? this.state.users[0]._id : this.state.user._id
    );
  };

  this.setState = () => {
    this.todoTitle.setState(this.state);
    this.todoUser.setState(this.state);
    this.todoList.setState(this.state);
    this.todoCount.setState(this.state);
  };

  const init = async () => {
    // ❓ 항상 의문인 const와 this의 차이 및 사용법
    await this.fetchState(true);
    this.setState();
  };

  init();
}

export default TodoApp;
