import React, { Component } from "react";
import { battle } from "./../utils/api";
import Winner from "./winner";
import Loser from "./loser";
import "../index.css";
import Loading from "./loading";
import queryString from "query-string";
import { Link } from "react-router-dom";
export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    //const { playerOne, playerTwo } = this.props;
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );
    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;
    if (loading) {
      return <Loading text="Battling" />;
    }
    if (error) {
      return <p className="center-text error"> {error} </p>;
    }
    return (
      <React.Fragment>
        <div className="grid space-around">
          <Winner winner={winner} loser={loser} />
          <Loser winner={winner} loser={loser} />
        </div>
        <Link to="/battle" className="btn dark-btn btn-space">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}
