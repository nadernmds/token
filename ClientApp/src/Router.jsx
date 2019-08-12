import React, { Component, Fragment } from "react";
import withAuth from "./components/withAuth";
import {Route} from "react-router";
import Counter from "./components/Counter";
class Router extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Route path='/counter' component={Counter} />
      </Fragment>
    );
  }
}

export default withAuth(Router);
