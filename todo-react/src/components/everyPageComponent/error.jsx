import React from "react";

class Error extends React.Component {

  render() {
    return <div> Error; {this.props.error.message} </div>;
  }
}

export default Error;
