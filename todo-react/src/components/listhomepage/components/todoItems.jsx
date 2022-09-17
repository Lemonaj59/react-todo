import React from "react";
import { CloseButton } from "react-bootstrap";
import editButton from "./images/blue_edit_pencil.png";
import "../homepage.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todo: this.props.todo, userId: null, loaded: false };
  }

  componentDidMount() {
    this.setState({
      todo: this.props.todo,
      userId: this.props.userId,
      loaded: true,
    });
  }
  async deleteItem(listId) {
    let body = { listId };

    await fetch(`/todo/${this.state.userId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    this.closeDeleteModal();
    this.componentDidMount();
  }
  //this.clickEditButton, this.postList, this.showDeleteModal, dynamicComponent
  render() {
    if (!this.state.loaded) {
      return <div>loading</div>;
    } else {
      return (
        <ul>
          <div key={this.props.dynamicComponent.item}>
            <button
              className="regularButton"
              onClick={() =>
                this.props.postList(
                  this.props.dynamicComponent.item,
                  this.props.dynamicComponent.type
                )
              }
            >
              {this.props.dynamicComponent.item}
            </button>
            <button
              onClick={() =>
                this.props.clickEditButton(
                  this.props.dynamicComponent.item,
                  this.props.dynamicComponent.id
                )
              }
            >
              <img
                className="image"
                src={editButton}
                alt="editcurrenttodo"
              ></img>
            </button>
            <CloseButton
              key={this.props.index}
              onClick={() =>
                this.props.showDeleteModal(this.props.dynamicComponent.item)
              }
            />
          </div>
        </ul>
      );
    }
  }
}

export default TodoItem;
