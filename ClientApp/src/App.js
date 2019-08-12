import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import { FetchData } from "./components/FetchData";
import Counter from "./components/Counter";
import Login from "./components/Login/Login";
import withAuth from "./components/withAuth";
import Test from "./components/Login/Test";
export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    this.Path.bind(this);
  }
  render() {
    const Path = this.Path;
    return (
      <Layout>
        <Route exact path="/login" component={Login} />
        <Path exact path="/" component={Home} />
        <Path exact path="/test" component={Test} />
        <Path path="/counter" component={Counter} />
        <Path path="/fetch-data" component={FetchData} />
      </Layout>
    );
  }

  Path(props) {
    return (
      <Route exact path={props.path} component={withAuth(props.component)} />
    );
  }
}
