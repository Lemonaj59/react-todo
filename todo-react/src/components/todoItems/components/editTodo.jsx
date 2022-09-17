import React from "react";
import blueCheckmark from "./images/blue_checkmark.png";
import { CloseButton } from "react-bootstrap";

class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: "", details: "", time: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    await this.props.options.forEach((option, index) => {
      this.setState({ [option]: this.props.todoItems[index] });
    });
  }

  async editList(item, type, id) {
    let body = { item, type, id };
    await fetch("/lists", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  async handlePick(index) {
    let stateChangeName = this.props.options[index];
    return stateChangeName;
  }

  async handleChange(event) {
    let stateObj = { [event.target.id]: event.target.value };
    this.setState(stateObj);
  }

  render() {
    return this.props.options.map((option, index) => {
      return (
        <td>
          <form>
            <input
              key="new state"
              id={this.props.options[index]}
              value={this.state[this.props.options[index]]}
              onChange={this.handleChange}
            />
            <button
              onClick={() =>
                this.editList(
                  this.state[this.props.options[index]],
                  this.props.options[index],
                  this.props.todoItems[this.props.todoItems.length - 1]
                )
              }
            >
              <img className="image" src={blueCheckmark} alt="change tittle" />
            </button>
            <CloseButton onClick={() => this.props.cancelEdit()} />
          </form>
        </td>
      );
    });
  }
}

export default EditTodo;
