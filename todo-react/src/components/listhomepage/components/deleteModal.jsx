import React from "react";
import { Modal, Button } from "react-bootstrap";

class CloseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: null, loaded: false, listName: null };
  }

  async componentDidMount() {
    this.setState(
      await {
        loaded: true,
        selectedItem: this.props.selectedEditedItem,
        listName: this.props.selectedEditedItem,
      }
    );
  }

  render() {
    if (!this.state.loaded) {
      <div> ...loading </div>;
    }

    return (
      <div>
        <Modal
          key="delete selected"
          show={this.props.deleteModalDisplay}
          onHide={this.props.closeDeleteModal}
        >
          <Modal.Header>
            <Modal.Title> WARNING ABOUT TO DELETE LIST</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {" "}
              Are you sure you want to delete the list '
              {this.props.selectedEditedItem}'?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secpmdaru" onClick={this.props.closeDeleteModal}>
              close
            </Button>

            <Button
              variant="primary"
              onClick={() => this.props.deleteItem(this.props.id)}
            >
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CloseModal;
