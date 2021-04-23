function TodoList({ $target, onCheckItem, onEditItem, onDeleteItem }) {
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
    <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""}/>
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
  <input class="edit" value="${item.contents}" />
</li>`;
    // ❓ 이런 것에 대한 들여쓰기 가이드는 없나?
  };

  const rankedItemTemplate = (item) => {
    return `
<li ${item.isCompleted ? 'class="completed"' : ""} data-id=${item._id}>
  <div class="view">
    <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""}/>
    <label class="label">
      ${
        item.priority == "FIRST"
          ? '<span class="chip primary">1순위</span>'
          : '<span class="chip secondary">2순위</span>'
      }
      "${item.contents}"
    </label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${item.contents}" />
</li>`;
  };

  $target.addEventListener("click", (e) => onClickTodoList(e));
  $target.addEventListener("dblclick", (e) => onDblClickTodoList(e));
  $target.addEventListener("keyup", (e) => onKeyUpTodoList(e));

  const onClickTodoList = (event) => {
    if (event.target.classList.contains("toggle")) {
      const li = event.target.parentNode.parentNode;
      // ❓ 더 좋은 방법 없나?
      onCheckItem(li.getAttribute("data-id"));
    } else if (event.target.classList.contains("destroy")) {
      const li = event.target.parentNode.parentNode;
      onDeleteItem(li.getAttribute("data-id"));
    }
  };

  const onDblClickTodoList = (event) => {
    if (event.target.classList.contains("label")) {
      const li = event.target.parentNode.parentNode;
      li.classList.add("editing");
    }
  };

  const onKeyUpTodoList = (event) => {
    if (!event.target.classList.contains("edit")) return;

    const li = event.target.parentNode;
    const dataId = li.getAttribute("data-id");

    if (event.key === "Enter") {
      onEditItem(dataId, event.target.value);
    } else if (event.key === "Escape") {
      li.classList.remove("editing");
      for (const item of this.state.user.todoList) {
        if (item._id === dataId) {
          event.target.value = item.contents;
          break;
        }
      }
      // content를 가져오는 데에 어려움을 겪음.
      // ❓ 이 방법이 적절한가?
    }
  };
}

export default TodoList;
