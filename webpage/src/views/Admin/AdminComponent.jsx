import React, { Component } from 'react';
import PendingComponent from './PendingComponent';
import axios from 'axios';

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: []
    };
  }

  componentDidMount() {
    axios.get('/api/packages/')
    .then(res => this.setState({packages: res.data}));
  }

  listPackages() {
    let packages = this.state.packages.map(aPackage => <PendingComponent key={aPackage._id} aPackage={aPackage} />)

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
