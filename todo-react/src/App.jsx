import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/listhomepage/listhompage.jsx";
import TodoLists from "./components/todoItems/todoItems.jsx";
import LoginPage from "./components/logInPage/logInPage.jsx";
import NewUser from "./components/createLogin/createLogin.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      logInSucess: false,
      selectedTodoList: null,
      typeOfTodoList: null,
      isLoaded: false,
    };
    this.currentTodoList = this.currentTodoList.bind(this);
    this.changeType = this.changeType.bind(this);
    this.resetState = this.resetState.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.logout = this.logout.bind(this);
  }

  async currentTodoList(data) {
    this.setState({ selectedTodoList: data });
  }

  async changeType(data) {
    this.setState({ typeOfTodoList: data });
  }

  async resetState() {
    this.setState({ selectedTodoList: "", typeOfTodoList: "" });
  }

  async loggedIn(data) {
    this.setState({ userId: data.userId, logInSucess: data.sucess });
  }

  async logout() {
    this.setState({
      userId: null,
      logInSucess: false,
      selectedTodoList: null,
      typeOfTodoList: null,
      isLoaded: false,
    });
  }

  async handleLogout() {
    await fetch("/loggedInStatus", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: null,
    });
  }

  async checkLoginStatus() {
    let response = await fetch("/loggedInStatus");
    response = await response.json();

    if (response.userId) {
      this.loggedIn({ userId: response.userId, sucess: true });
    }
  }

  render() {
    return (
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginPage
                loggedIn={this.loggedIn}
                logInSucess={this.state.logInSucess}
                checkLoginStatus={this.checkLoginStatus}
              />
            }
          />

          <Route
            exact
            path="/homepage"
            element={
              <HomePage
                currentTodoList={this.currentTodoList}
                changeType={this.changeType}
                userId={this.state.userId}
                checkLoginStatus={this.checkLoginStatus}
                handleLogout={this.handleLogout}
                logout={this.logout}
                state={this.state}
                resetState={this.resetState}
              />
            }
          />
          <Route
            exact
            path="homepage/lists"
            element={
              <TodoLists
                selectedTodoList={this.state.selectedTodoList}
                typeOfTodoList={this.state.typeOfTodoList}
                userId={this.state.userId}
                resetState={this.resetState}
              />
            }
          />

          <Route exact path="/newuser" element={<NewUser />} />
          <Route path="*" element={<Navigate to="./homepage" />} />
        </Routes>
      </div>
    );
  }
}

export default App;
