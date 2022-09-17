import React from "react";
import { CloseButton } from "react-bootstrap";
import TodoOptionDropdown from "./listTypeDropdown";
import plusSymbol from "./images/plus_symbol.png";
import blueCheckmark from "./images/blue_checkmark.png";
import "../homepage.css";
class NewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItemInput: "",
      newListType: null,
      loaded: false,
      createNewList: null,
      failed: false,
    };
  }
  async componentDidMount() {
    this.setState(
      await { loaded: true, createNewList: this.props.createNewList }
    );
  }

  async handleAddingTodo() {
    let title = this.props.newItemInput;
    let type = this.props.newListType;
    const body = { title, type };

    if (!type || title === "") {
      this.setState({ createNewList: true, failed: true });
    } else {
      await fetch(`/todo/${this.props.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await this.setState({ createNewList: false, failed: false });
    }
  }

  async addingItemClick() {
    await this.setState({ createNewList: true });
  }

  async cancelAdding() {
    await this.setState({ createNewList: false });
  }

  render() {
    if (!this.state.createNewList) {
      return (
        <button className="addingButton" onClick={() => this.addingItemClick()}>
          <img className="image" src={plusSymbol} alt="plus" />
        </button>
      );
    }
    if (!this.state.failed) {
      return (
        <div key="new item">
          <form>
            <label className="dropDownText">
              {" "}
              list name:
              <input
                key="new state"
                value={this.props.newItemInput}
                onChange={this.props.handleNewItemChange}
              />
              <button onClick={() => this.handleAddingTodo()}>
                <img className="image" src={blueCheckmark} alt="add new todo" />
              </button>
              <CloseButton onClick={() => this.cancelAdding()} />
            </label>
            <TodoOptionDropdown handletype={this.props.handletype} />
          </form>
        </div>
      );
    } else {
      return (
        <div key="new item">
          <h1 className="warningText">
            please select an option, and name the list.
          </h1>
          <form>
            <label className="dropDownText">
              {" "}
              list name:
              <input
                key="new state"
                value={this.props.newItemInput}
                onChange={this.props.handleNewItemChange}
              />
              <button onClick={() => this.handleAddingTodo()}>
                <img className="image" src={blueCheckmark} alt="add new todo" />
              </button>
              <CloseButton onClick={() => this.cancelAdding()} />
            </label>
            <TodoOptionDropdown handletype={this.props.handletype} />
          </form>
        </div>
      );
    }
  }
}

export default NewItem;
