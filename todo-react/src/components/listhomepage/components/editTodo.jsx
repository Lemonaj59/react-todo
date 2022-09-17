import React from "react";
import "../homepage.css";
import blueCheckmark from "./images/blue_checkmark.png";
import { CloseButton } from "react-bootstrap";

class EditItemName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div key={this.props.dynamicComponent.item}>
        <h1 className="warningText">Editing Name</h1>
        <form>
          <input
            key="edit name"
            value={this.props.editedItem}
            onChange={this.props.handleEditItemChange}
          />
          <button
            className="addingButton"
            onClick={() =>
              this.props.changeItem(
                this.props.dynamicComponent.id,
                this.props.editedItem
              )
            }
          >
            <img className="image" src={blueCheckmark} alt="accept" />
          </button>
          <CloseButton onClick={() => this.props.cancelEdit()} />
        </form>
      </div>
    );
  }
}

export default EditItemName;
