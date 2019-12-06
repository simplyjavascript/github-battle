import React, { Component } from "react";
import { fetchPopularRepos } from "../utils/api";
import ReposGrid from "./reposGrid";
import Loading from "./loading";

export default class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      languages: ["All", "Javascript", "Ruby", "Java", "CSS", "Python"],
      repos: {},
      error: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }
  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    });
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => {
            return {
              repos: {
                ...repos,
                [selectedLanguage]: data
              }
            };
          });
        })
        .catch(err => {
          this.setState({
            error: "Error fetching repos"
          });
        });
    }
  }
  render() {
    const { languages, selectedLanguage, repos } = this.state;
    return (
      <React.Fragment>
        <ul className="flex-center">
          {languages.map(lang => (
            <li
              className={selectedLanguage === lang ? "selected" : ""}
              key={lang}
            >
              <button
                onClick={() => this.updateLanguage(lang)}
                className="btn-clear nav-link"
              >
                {lang}
              </button>
            </li>
          ))}
        </ul>
        {this.isLoading() && <Loading />}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
