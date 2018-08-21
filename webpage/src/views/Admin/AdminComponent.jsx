import React, { Component } from 'react';
import PendingComponent from './PendingComponent';
import axios from 'axios';

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: []
    };
    this.loadPackages = this.loadPackages.bind(this);
  }

  loadPackages() {
    axios.get('/api/packages/')
    .then(res => this.setState({packages: res.data}));
  }

  componentDidMount() {
    this.loadPackages();
  }

  listPackages() {
    console.log('listing');
    let packages = this.state.packages.map(aPackage =>
      <PendingComponent key={aPackage._id} aPackage={aPackage} reload={this.loadPackages}/>
    );

    return (
      <div>
        {packages}
      </div>
    )
  }

  render() {
    return (
      <div>
        Admin
      {this.listPackages()}
      </div>
    );
  }
}

export default AdminComponent;
