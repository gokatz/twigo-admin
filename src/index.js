import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import BlockedContent from "./components/blocked-content";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.fetchContent();
  }

  state = {
    contentList: {},
    usersList: {},
    loading: true
  };

  fetchContent = () => {
    window.fetch("https://gokatzme.firebaseio.com/twigo/blocks.json").then(
      response => {
        if (response.ok) {
          response.json().then(json => {
            let { blockedusers, blockedcontent } = json;
            this.setState({
              contentList: blockedcontent,
              usersList: blockedusers
            });
          });
        }

        this.setState({
          loading: false
        });
      },
      ({ error } = {}) => {
        console.log(error);
        this.setState({
          loading: false
        });
      }
    );
  };

  refresh = () => {
    this.setState({
      loading: true
    });
    this.fetchContent();
  };

  render() {
    let { contentList, usersList, loading } = this.state || {};
    return (
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <h1>@emberjstweet Admin:</h1>
            <BlockedContent
              list={contentList}
              valueKey="text"
              header="Blocked Content:"
              apiKey="blockedcontent"
              refresh={this.refresh}
            />
            <hr />
            <BlockedContent
              list={usersList}
              valueKey="name"
              header="Blocked Users:"
              apiKey="blockedusers"
              refresh={this.refresh}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
