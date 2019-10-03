import React, { useState } from "react";
import "../styles.css";

export default function BlockedContent(props = {}) {
  let { list = {}, valueKey = "", header = "" } = props;
  let [userInput, setUserInput] = useState("");

  let markup = [];
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      const content = list[key];
      markup.push(
        <li key={key} className="list-item">
          {content[valueKey]} &nbsp; &nbsp;
          <small>
            <a onClick={() => deleteContent(key, props)}>[Delete]</a>
          </small>
        </li>
      );
    }
  }

  return (
    <div>
      <h3> {header} </h3>
      <div className="control">
        <input
          value={userInput}
          placeholder="Enter Content"
          onChange={event => {
            setUserInput(event.target.value);
          }}
        />
        <button onClick={() => addContent(userInput, props)}> ADD </button>
      </div>
      {markup}
    </div>
  );
}

function deleteContent(key, props) {
  let { apiKey, refresh } = props || {};
  if (!window.confirm("Sure?")) {
    return;
  }

  let resourceUrl = `https://gokatzme.firebaseio.com/twigo/blocks/${apiKey}/${key}.json`;
  window
    .fetch(resourceUrl, {
      method: "DELETE"
    })
    .then(() => {
      refresh();
    })
    .catch(err => {
      alert(err);
    });
}

function addContent(userInput, props) {
  if (!userInput) {
    return;
  }

  let { apiKey, refresh, valueKey } = props || {};
  let data = {};
  data[valueKey] = userInput;

  let resourceUrl = `https://gokatzme.firebaseio.com/twigo/blocks/${apiKey}.json`;
  window
    .fetch(resourceUrl, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(() => {
      refresh();
    })
    .catch(err => {
      alert(err);
    });
}
