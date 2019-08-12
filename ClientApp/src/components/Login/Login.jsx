import React, { Component } from "react";
import AuthService from "../AuthService";

class Login extends Component {
  state = {};
  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="username"
            onChange={this.onChange}
            id="username"
          />
          <input
            type="text"
            name="password"
            onChange={this.onChange}
            id="password"
          />
          <button>send</button>
        </form>
      </div>
    );
  }
  onSubmit = e => {
    e.preventDefault();
    new AuthService()
      .login(this.state.username, this.state.password)
      .then(c => {
        this.props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });
  };
  componentWillMount() {
    if (new AuthService().loggedIn()) {
      this.props.history.replace("/");
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export default Login;
