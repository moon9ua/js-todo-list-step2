function TodoItem(contents, id) {
  this._id = id;
  this.contents = contents;
  this.isCompleted = false;
  this.priority = false;
  this.editing = false;

  // 쓸 일이 있나?

  // this.getId = () => {
  //   return Id;
  // };

  // this.getContents = () => {
  //   return Contents;
  // };

  // this.setContents = (contents) => {
  //   Contents = contents;
  // };

  // this.getCompleted = () => {
  //   return Completed;
  // };

  // this.switchCompleted = () => {
  //   Completed = !Completed;
  // };

  // this.getEditing = () => {
  //   return Editing;
  // };

  // this.switchEditing = () => {
  //   Editing = !Editing;
  // };
}

export default TodoItem;
