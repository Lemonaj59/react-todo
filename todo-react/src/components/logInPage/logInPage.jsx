import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/usernameForm";
import "./loginpage.css";
import Error from "../everyPageComponent/error";
import Loading from "../everyPageComponent/loadingScreen";

class LoginPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      userID: null,
    };
    this.redirect = this.redirect.bind(this);
  }

  async componentDidMount() {
    await this.props.checkLoginStatus();
    let sucess = await this.props.logInSucess;
    if (sucess) {
      await this.redirect(true);
    } else {
      this.setState({ isLoaded: true });
    }
  }

  async componentWillUnmount() {}

  async redirect(sucess, userId) {
    await this.props.loggedIn(userId, sucess);
    if (sucess) {
      this.props.navigation("homepage");
    }
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return (
        <div>
          <Error error={error} />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1 className="text">welcome to the todolist website!</h1>
          <h1 className="text"> please log in!</h1>
          <LoginForm redirect={this.redirect} />

          <button
            className="regularButton"
            onClick={() => this.props.navigation("/newuser")}
          >
            {" "}
            create new user{" "}
          </button>
        </div>
      );
    }
  }
}

export default function LoginPage(props) {
  const navigation = useNavigate();

  return <LoginPageComponent {...props} navigation={navigation} />;
}
