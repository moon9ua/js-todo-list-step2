function TodoCount({ $target }) {
  this.setState = (updatedState) => {
    this.state = updatedState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = this.state.user.todoList.length;
  };
}

export default TodoCount;
