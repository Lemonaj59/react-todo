import React from "react";

class CreateLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: "",
      password: "",
      passwordConfirm: "",
      passwordMatch: null,
    };
  }

  async handleNewUserChange(event) {
    this.setState({ newUser: event.target.value });
  }

  async handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleConfirmPasswordChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.passwordMatch === null) {
      return (
        <div>
          <form>
            <label>
              Username:
              <input
                value={this.state.newUser}
                onChange={this.handleNewUserChange}
              />
            </label>
          </form>
          <form>
            <label>
              {" "}
              Password:
              <input
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </label>
          </form>
          <form>
            <label>
              {" "}
              Confirm password:
              <input
                value={this.state.passwordConfirm}
                onChange={this.handleConfirmPasswordChange}
              />
            </label>
          </form>

          <button onClick={() => this.handleClick()}>create user</button>
        </div>
      );
    } else {
      return (
        <div>
          <form>
            <label>
              new userName:
              <input
                value={this.state.newUser}
                onChange={this.handleNewUserChange}
              />
            </label>
          </form>
          <form>
            <label>
              {" "}
              password:
              <input
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </label>
          </form>
          <h1> password did not match</h1>
          <form>
            <label>
              {" "}
              confirm password:
              <input
                value={this.state.passwordConfirm}
                onChange={this.handleConfirmPasswordChange}
              />
            </label>
          </form>

          <button onClick={() => this.handleClick()}>create user</button>
        </div>
      );
    }
  }
}
