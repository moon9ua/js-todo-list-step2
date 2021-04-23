function TodoTitle({ $target }) {
  this.setState = (updatedState) => {
    this.state = updatedState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = todoTitleTemplate(this.state.user);
  };

  const todoTitleTemplate = (user) => {
    return `
<h1 id="user-title" data-username=${user.name}>
  <span><strong>${user.name}</strong>'s Todo List</span>
</h1>`;
  }; // 템플릿은 다른 파일에 분리하면 좋겠지.
}

export default TodoTitle;
