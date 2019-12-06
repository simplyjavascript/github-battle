import React, { Component } from "react";
import PropTypes from "prop-types";
import { ThemeConsumer } from "./../contexts/theme";

export default class PlayerInput extends Component {
  state = {
    username: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  };
  handleChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="github username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
                type="submit"
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}
PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
