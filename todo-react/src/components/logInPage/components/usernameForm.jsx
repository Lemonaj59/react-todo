import React from "react";
import "../loginpage.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "", sucess: null, userId: null };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  async handleClick() {
    let username = this.state.userName;
    let password = this.state.password;

    const body = { username, password };

    const response = await fetch("/user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    let sucess = response.sucess;
    let userId = response.userId;

    this.setState(await { sucess: sucess, userID: userId });
    await this.props.redirect(sucess, userId);
  }

  async handleUserChange(event) {
    this.setState({ userName: event.target.value });
  }

  async handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    if (this.state.sucess === null) {
      return (
        <div>
          <form>
            <label>
              {" "}
              UserName:
              <input
                value={this.state.userName}
                onChange={this.handleUserChange}
              />
            </label>
          </form>
          <form>
            <label>
              Password:
              <input
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </label>
          </form>
          <button className="regularButton" onClick={() => this.handleClick()}>
            login
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <form>
            <h1 className="warningText">
              {" "}
              please enter valid username/password
            </h1>
            <label>
              {" "}
              UserName:
              <input
                value={this.state.userName}
                onChange={this.handleUserChange}
              />
            </label>
          </form>
          <form>
            <label>
              Password:
              <input
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </label>
          </form>
          <button className="regularButton" onClick={() => this.handleClick()}>
            login
          </button>
        </div>
      );
    }
  }
}

export default LoginForm;
