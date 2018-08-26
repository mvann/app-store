import React, { Component } from 'react';

class AppItem extends Component {
  render() {
    let app = this.props.app;
    let downloadLink = !!this.props.installFunc ? <button name={app.name} onClick={this.props.installFunc}>Install... not actually implemented yet but check console</button> : '' ;
    return (
      <div style={{border: "1px solid black"}}>
        <h3>{app.name}&nbsp;&nbsp;&nbsp;<img style={{display: 'inline'}}src={`data:image/jpeg;base64, ${app.icon}`} /></h3>
        <p>Id: {app.id}</p>
        <p>Author: {app.maintainer}</p>
        <p>Version: {app.version}</p>
        <p>Description: {app.description}</p>
        {downloadLink}
      </div>
    );
  }
}

export default AppItem;
