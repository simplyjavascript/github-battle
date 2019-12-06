import React, { Component } from "react";

export default class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "hari"
    };
    this.updateName = this.updateName.bind(this);
  }
  updateName() {
    this.setState((prevState, prevProps) => {
      return {
        name: prevState.name + "!!!!!!"
      };
    });
  }
  render() {
    return (
      <div>
        <p> Name is {this.state.name}</p>
        <button onClick={this.updateName}> Update</button>
      </div>
    );
  }
}
