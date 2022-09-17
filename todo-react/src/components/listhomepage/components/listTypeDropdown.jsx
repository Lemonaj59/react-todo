import React from "react";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import "../homepage.css";

class TodoOptionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "please select one",
      titleOptions: [
        "basic list",
        "timed only",
        "description only",
        "description and timed",
      ],
    };
  }

  async changeTitle(event) {
    this.setState(await { title: event });
    await this.props.handletype(event);
  }

  render() {
    return (
      <div key="newType dropdown">
        <Dropdown as={ButtonGroup} title={this.state.title}>
          <Button variant="info" className="regularButton">
            {this.state.title}
          </Button>
          <Dropdown.Toggle split variant="sucess" id="dropdown-custom-2" />
          <Dropdown.Menu>
            {this.state.titleOptions.map((option) => {
              return (
                <Dropdown.Item
                  className="regularButton"
                  key={option}
                  onClick={() => this.changeTitle(option)}
                >
                  {" "}
                  {option}{" "}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default TodoOptionDropdown;
