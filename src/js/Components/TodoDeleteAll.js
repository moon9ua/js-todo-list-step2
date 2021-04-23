function TodoDeleteAll({ $target, onDeleteAll }) {
  $target.addEventListener("click", (e) => onClickDeleteAll(e));

  const onClickDeleteAll = (event) => {
    onDeleteAll();
  };
}

export default TodoDeleteAll;
