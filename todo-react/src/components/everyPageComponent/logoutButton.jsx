import React from "react";
import "./logoutButton.css";

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="logout">
        <button
          className="logoutButton"
          key="logout"
          onClick={() => this.props.handleLogouts()}
        >
          logout
        </button>
      </div>
    );
  }
}

export default Logout;
