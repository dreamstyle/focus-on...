import React from "react";

class List extends React.Component {
  inputRef = React.createRef();
  componentClassName = `day ${this.props.mode}`;

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    const [day, i] = event.currentTarget.name.split("-");
    const target = event.currentTarget;

    // 1. Create a copy of current todo
    const todo = { ...this.props.day[i] };
    if (target.type === "checkbox") todo.isFinish = !todo.isFinish;
    if (target.type === "text") todo.title = target.value;
    this.props.editTodo(day, i, todo);
  };

  handleDelete = (event) => {
    const i = event.currentTarget.dataset.index;
    this.props.deleteTodo(this.props.index, i);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const taskTitle = this.inputRef.current.value;
    if (!taskTitle) return;
    const todo = {
      title: this.inputRef.current.value,
      isFinish: false,
    };
    this.props.addTodo(this.props.index, todo);
    event.currentTarget.reset();
  };

  renderTodo = (todo, i) => {
    // Prevent removed task cause the error that getting title of undefined
    if (!todo) return;
    const key = `${this.props.index}-${i}`;
    todo.isFinish = Boolean(todo.isFinish);
    return (
      <li className="task" key={key}>
        <input
          type="checkbox"
          className="checkbox"
          id={key}
          name={key}
          value={todo.isFinish}
          checked={todo.isFinish}
          onChange={this.handleChange}
        />
        <label htmlFor={key} className="label"></label>
        <input
          type="text"
          className="task-title"
          name={key}
          value={todo.title}
          onChange={this.handleChange}
        />
        <button
          className="btn-remove-task"
          data-index={i}
          onClick={this.handleDelete}
        >
          &times;
        </button>
      </li>
    );
  };

  render() {
    const weekend = ["sat", "sun"].includes(this.props.index);
    return weekend ? null : (
      <section className={this.componentClassName}>
        <h1>
          {this.props.mode === "week"
            ? this.props.index.toUpperCase()
            : "TODAY"}
        </h1>
        <ul>
          {this.props.day.map(this.renderTodo)}
          <li className="task">
            <form className="add-task-form" onSubmit={this.handleSubmit}>
              <input type="text" className="task-title" ref={this.inputRef} />
              <button type="submit" className="btn-add-task">
                +NEW
              </button>
            </form>
          </li>
        </ul>
      </section>
    );
  }
}

export default List;
