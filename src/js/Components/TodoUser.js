function TodoUser({ $target, onChangeUser }) {
  this.setState = (updatedState) => {
    this.state = updatedState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = ""; // div 하위가 없어짐.
    this.state.users //
      .map((user) => {
        if (user === this.state.user) {
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
    // console.log(event.target);
    if (event.target.classList.contains("user-delete-button")) {
      // console.log("delete");
    } else if (event.target.classList.contains("user-create-button")) {
      // console.log("create");
    } else {
      // console.log("none");
      onChangeUser(event.target.getAttribute("data-id"));
    }
  };
}

export default TodoUser;
