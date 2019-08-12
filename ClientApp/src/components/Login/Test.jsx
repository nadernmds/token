import React, { Component } from "react";
import Api from "../Api";

class Test extends Component {
  state = {};
  render() {
    return <div>pep</div>;
  }
  componentDidMount() {
    new Api()
      .get("api/token")
      .then(c => c.json())
      .then(c => {
        console.log(c);
      });
  }
}

export default Test;
