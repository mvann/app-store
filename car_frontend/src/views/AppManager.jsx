import React, { Component } from 'react';
import axios from 'axios';
import AppItem from './AppItem';

class AppManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: [],
      installed: [],
      upgradable: [],
      loading: true
    }

    axios({
      method: 'get',
      url: '/list',
    }).then((res) => {
      if (res.status === 200) {
        console.log('Got list...');
        this.setState({
          available: res.data.available,
          installed: res.data.installed,
          upgradable: res.data.upgradable,
          loading: false
        });
      }
    });

    this.installApp = this.installApp.bind(this);
  }


  installApp(e) {
    console.log('Name: ', e.target.name);
  }

  renderAvailable() {
    let available = this.state.available.map(app =>
      <AppItem key={app.id} app={app} installFunc={this.installApp} />
    );
    return (
      <div>
        {available}
      </div>
    );
  }

  renderInstalled() {
    let installed = this.state.installed.map(app =>
      <AppItem key={app.id} app={app}/>
    );
    return (
      <div>
        {installed}
      </div>
    );
  }

  renderUpgradable() {
    let installed = this.state.installed.map(app =>
      <AppItem key={app.id} app={app}/>
    );
    return (
      <div>
        {installed}
      </div>
    );
  }

  render() {
    let loading = this.state.loading ? <p>Loading...</p> : '';
    return (
      <div>
        {loading}
        <h2>Available:</h2>
        {this.renderAvailable()}
        <h2>Installed:</h2>
        {this.renderInstalled()}
        <h2>Upgradable:</h2>
        {this.renderUpgradable()}
      </div>
    );
  }
}

export default AppManager;
