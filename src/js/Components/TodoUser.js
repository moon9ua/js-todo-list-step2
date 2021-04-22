function TodoUser({ $target, onChangeUser, onDeleteUser, onCreateUser }) {
  this.setState = (updatedState) => {
    this.state = updatedState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = ""; // div 하위가 없어짐.
    this.state.users //
      .map((user) => {
        if (user._id === this.state.user._id) {
          $target.innerHTML += `<button class="ripple active" data-id=${user._id}>${user.name}</button>`;
        } else {
          $target.innerHTML += `<button class="ripple" data-id=${user._id}>${user.name}</button>`;
        }
      });
    $target.innerHTML += `
<button class="ripple user-create-button" data-action="createUser">
  + 유저 생성
</button>
<button class="ripple user-delete-button" data-action="deleteUser">
  삭제 -
</button>`;
  };

  $target.addEventListener("click", (e) => onClickTodoUser(e));

  const onClickTodoUser = (event) => {
    if (!event.target.classList.contains("ripple")) return;

    if (event.target.classList.contains("user-delete-button")) {
      onDeleteUser(this.state.user._id, this.state.user.name);
    } else if (event.target.classList.contains("user-create-button")) {
      onCreateUser();
    } else {
      onChangeUser(event.target.getAttribute("data-id"));
    }
  };
}

export default TodoUser;
