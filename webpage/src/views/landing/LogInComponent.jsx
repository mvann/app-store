import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LogInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  usernameChange(e) {
    this.setState({username: e.target.value})
  }

  passwordChange(e) {
    this.setState({password: e.target.value})
  }

  handleLogIn(e) {
    console.log(this.state);
    axios({
      method: 'post',
      url: `api/users/${this.state.username}/login`,
      headers: { 'content-type': 'application/json' },
      data: {
        name: this.state.username,
        password: this.state.password
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.status === 200)
      {
        console.log("Successful login...");
        window.localStorage.setItem('name', this.state.username);
        window.localStorage.setItem('token', resp.data.token);
        this.setState({loggedIn: true});
      }
    }).catch(function(error) {
      console.error(error);
    });
  }

  render() {
    let redirect = this.state.loggedIn ? <Redirect to="/dashboard" /> : '';
    return (
      <div>
        {redirect}
        <label>Username:
          <input type="text" default='Enter username' value={this.state.username} onChange={this.usernameChange} />
        </label>
        <label>Password:
          <input type="password" value={this.state.password} onChange={this.passwordChange} />
        </label>
        <button type="button" onClick={this.handleLogIn}>Log In</button>
      </div>
    );
  }
}

export default LogInComponent;
