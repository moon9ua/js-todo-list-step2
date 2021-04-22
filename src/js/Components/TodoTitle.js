function TodoTitle({ $target }) {
  this.setState = (updatedState) => {
    // this.name = updatedState.user.name; // 이게 효율적일 것 같지만...
    this.state = updatedState; // 통일성을 위해서는 이게 나을 것 같은데.
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
  }; // 템플릿은 다른 파일에 분리하자.
}

export default TodoTitle;
