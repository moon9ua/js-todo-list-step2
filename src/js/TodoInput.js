function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector(".new-todo");

  $todoInput.addEventListener("keyup", (event) => keyupTodoInput(event));

  const keyupTodoInput = (event) => {
    const $newTodoTarget = event.target;
    // console.log(event.key); // ❓ 한글을 치면 엔터가 두번 입력된다. 왜?
    if (event.key === "Enter" && $todoInput.value) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}

export default TodoInput;
