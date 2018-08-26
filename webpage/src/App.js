import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LandingComponent from './views/landing/LandingComponent';
import DashboardComponent from './views/dashboard/DashboardComponent';
import DeveloperComponent from './views/Developer/DeveloperComponent';
import AdminComponent from './views/Admin/AdminComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossOrigin="anonymous" />
          <header className="App-header">
            <h1 className="App-title"><i className="fas fa-car"></i> AutoNet</h1>
          </header>
          <Switch>
            <Route exact path='/' component={LandingComponent} />
            <Route path='/dashboard' component={DashboardComponent} />
            <Route path='/dev' component={DeveloperComponent} />
            <Route path='/admin' component={AdminComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
