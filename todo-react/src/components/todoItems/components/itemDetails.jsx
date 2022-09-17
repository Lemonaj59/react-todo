import React from "react";
import { Table, CloseButton } from "react-bootstrap";
import "./table.css";
import editButton from "./images/blue_edit_pencil.png";
import EditTodo from "./editTodo";
import plusButton from "./images/plus_symbol.png";
import blueCheckmark from "./images/blue_checkmark.png";
const editOptions = {
  timed: ["todos", "details", "time"],
  "not timed": ["todos", "details"],
  "not timed no description": ["todos"],
  "timed only": ["todos", "time"],
};

class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: null,
      item: null,
      options: editOptions[this.props.type],
      isLoaded: false,
      addingItem: false,
      todos: "",
      details: "",
      time: "",
      done: "",
    };
    this.cancelEdit = this.cancelEdit.bind(this);
    this.AddingInfoChange = this.AddingInfoChange.bind(this);
    this.getBody = this.getBody.bind(this);
  }
  async componentDidMount() {
    this.setState({ options: editOptions[this.props.type], isLoaded: true });
  }

  async getBody() {
    let body = {};
    this.state.options.forEach((item) => {
      body[item] = this.state[item];
    });
    body["done"] = this.state.done;
    body["todoId"] = this.props.todoId;
    await this.setState({ todos: "", details: "", time: "", done: "" });
    await this.cancelEdit();
    return body;
  }

  async toggleEdit(dynamicComponent) {
    this.setState(await { edit: true, item: dynamicComponent });
  }

  async cancelEdit() {
    this.setState({ item: null, isLoaded: false });
    this.props.reload();
  }

  async AddingInfoChange(event) {
    let stateObj = { [event.target.id]: event.target.value };
    this.setState(stateObj);
  }

  render() {
    if (!this.state.isLoaded) {
      return <div> loading </div>;
    } else {
      return (
        <div>
          <Table className="greenTable" striped bordered hover size="sm">
            <thead>
              <tr>
                {this.props.todoOptions.map((option) => {
                  if (option !== "id") {
                    return <th key={option}>{option}</th>;
                  }
                })}
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todoItems.map((dynamicComponent, index) => {
                if (
                  dynamicComponent[dynamicComponent.length - 1] ===
                  this.state.item
                ) {
                  return (
                    <tr>
                      <EditTodo
                        todoItems={dynamicComponent}
                        options={this.state.options}
                        item={this.state.item}
                        cancelEdit={this.cancelEdit}
                      />
                      <td>
                        {dynamicComponent[
                          dynamicComponent.length - 2
                        ].toString()}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <>
                      <tr key={index}>
                        {dynamicComponent.map((option, index) => {
                          if (!option) {
                            return <td>false</td>;
                          } else if (
                            index ===
                            this.props.todoOptions.length - 1
                          ) {
                            //do nothing and skip.
                          } else {
                            return <td>{option}</td>;
                          }
                        })}
                        <td>
                          <button
                            key="edit"
                            onClick={() =>
                              this.toggleEdit(
                                dynamicComponent[dynamicComponent.length - 1]
                              )
                            }
                          >
                            <img
                              className="image"
                              src={editButton}
                              alt="editcurrenttodo"
                            />
                          </button>
                          <CloseButton
                            onClick={() =>
                              this.props.deleteItem(
                                dynamicComponent[dynamicComponent.length - 1]
                              )
                            }
                          />
                        </td>
                      </tr>
                    </>
                  );
                }
              })}
              <tr>
                {this.props.todoOptions.map((option, index) => {
                  if (!this.props.addingItem) {
                    return (
                      <td>
                        <button onClick={() => this.props.addItem()}>
                          <img
                            className="image"
                            src={plusButton}
                            alt="addTodo"
                          />
                        </button>
                      </td>
                    );
                  } else if (this.props.addingItem) {
                    if (index < this.props.todoOptions.length - 1) {
                      return (
                        <td>
                          <form>
                            <input
                              key={option}
                              id={option}
                              value={this.state[option]}
                              onChange={this.AddingInfoChange}
                            />
                          </form>
                        </td>
                      );
                    } else {
                      return (
                        <td>
                          <button
                            onClick={() => this.props.putItem(this.getBody())}
                          >
                            <img
                              className="image"
                              src={blueCheckmark}
                              alt="confirm"
                            />
                          </button>
                          <CloseButton
                            onClick={() => this.props.handleExit()}
                          />
                        </td>
                      );
                    }
                  }
                })}
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default ItemDetails;
