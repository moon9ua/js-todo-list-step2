function TodoList({ $target, onCheck }) {
  this.setState = (updatedState) => {
    this.state = updatedState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = "";
    this.state.user.todoList //
      .map((item) => {
        item.priority == "NONE"
          ? ($target.innerHTML += noneItemTemplate(item))
          : ($target.innerHTML += rankedItemTemplate(item));
      });
  };

  const noneItemTemplate = (item) => {
    return `
<li ${item.isCompleted ? 'class="completed"' : ""} data-id=${item._id}>
  <div class="view">
    <input class="toggle" type="checkbox" ${item.isComplted ? "checked" : ""}/>
    <label class="label">
      <select class="chip select">
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
      ${item.contents}
    </label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value=${item.contents} />
</li>`;
    // ❓ 이런 것에 대한 들여쓰기 가이드는 없나?
  };

  const rankedItemTemplate = (item) => {
    return `
<li ${item.isCompleted ? 'class="completed"' : ""} data-id=${item._id}>
  <div class="view">
    <input class="toggle" type="checkbox" ${item.isComplted ? "checked" : ""}/>
    <label class="label">
      ${
        item.priority == "FIRST"
          ? '<span class="chip primary">1순위</span>'
          : '<span class="chip secondary">2순위</span>'
      }
      ${item.contents}
    </label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value=${item.contents} />
</li>`;
  };

  $target.addEventListener("click", (e) => onClickTodoList(e)); // 함수 명만 전달하면 안되는데... 더 짧게 할 방법 없나?

  const onClickTodoList = (event) => {
    //
    console.log(event.target);

    if (event.target.classList.contains("toggle")) {
      // onCheck();
    }
  };
}

export default TodoList;
