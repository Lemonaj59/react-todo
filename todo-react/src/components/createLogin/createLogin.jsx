import React from "react";
import { useNavigate } from "react-router-dom";
import "./createLogin.css";
class CreateNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: [],
      password: [],
      passwordConfirm: [],
      passwordMatch: null,
      isLoaded: false,
      error: null,
      userTaken: null,
    };
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
    this.handleNewUserChange = this.handleNewUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  handleNewUserChange(event) {
    this.setState({ newUser: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  handleClick() {
    if (
      this.state.password !== this.state.passwordConfirm ||
      this.state.password.length < 6
    ) {
      this.setState({ passwordMatch: false });
    } else {
      this.checkIfUserTaken();
    }
  }

  async checkIfUserTaken() {
    let username = this.state.newUser;

    const body = { username };

    const response = await fetch("/createUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    if (response.userTaken) {
      this.setState({ userTaken: true });
    } else {
      await this.addNewUser().then(this.props.navigation("/"));
    }
  }

  async addNewUser() {
    let username = this.state.newUser;
    let password = this.state.password;
    const body = { username, password };

    await fetch("createUser", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  render() {
    if (this.state.error) {
      return <div>Error : {this.state.error}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.passwordMatch === null) {

      if (this.state.userTaken === true) {
        return (
        <div className="App">
          <h1 className="warningText">Username taken, please pick another. </h1>
          <h1 className="text"> Create User</h1>
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

          <button className="regularButton" onClick={() => this.handleClick()}>
            create user
          </button>
        </div>
      );

      } else {
      return (

        
        <div className="App">
          <h1 className="text"> Create User</h1>
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

          <button className="regularButton" onClick={() => this.handleClick()}>
            create user
          </button>
        </div>
      )}} else if (!this.state.passwordMatch) {

      return (
        <div className="App">
          <h1 className="text"> Create User</h1>
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
          <h1 className="warningText"> password did not match</h1>
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

          <button className="regularButton" onClick={() => this.handleClick()}>
            create user
          </button>
        </div>
      );
    } else {
      <div className="App">
        <h1 className="text"> Create User</h1>
        <form>
          <h1 className="warningText">please select a different username</h1>
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

        <button className="regularButton" onClick={() => this.handleClick()}>
          create user
        </button>
      </div>;
    }
  }
}

export default function NewUser(props) {
  const navigation = useNavigate();

  return <CreateNewUser {...props} navigation={navigation} />;
}
