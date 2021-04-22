function TodoInput({ $target, onAddItem }) {
  $target.addEventListener("keyup", (e) => onKeyUpTodoInput(e));

  const onKeyUpTodoInput = (event) => {
    if (event.key === "Enter" && $target.value) {
      onAddItem(event.target.value);
      event.target.value = "";
    }
  };
}

export default TodoInput;
