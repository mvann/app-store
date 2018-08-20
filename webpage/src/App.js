import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LandingComponent from './views/landing/LandingComponent';
import DashboardComponent from './views/dashboard/DashboardComponent';
import DeveloperComponent from './views/Developer/DeveloperComponent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Switch>
            <Route exact path='/' component={LandingComponent} />
            <Route path='/dashboard' component={DashboardComponent} />
            <Route path='/dev' component={DeveloperComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
