import React, { Component } from 'react';

class PendingComponent extends Component {
  constructor(props) {
    super(props);

    this.aPackage = this.props.aPackage;
    this.download = this.download.bind(this);
  }

  download() {
    var a = window.document.createElement('a');
    console.log(this.aPackage.fileBuffer.data);
    a.href = window.URL.createObjectURL(new File(
        [new Uint8Array(this.aPackage.fileBuffer.data)],
        this.aPackage.fileName));
    a.download = this.aPackage.fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  render() {
    console.log(this.props.aPackage);
    return (
      <div style={{border: "1px solid black"}}>
        <h3>Name: {this.aPackage.name}</h3>
        <p>Filename: {this.aPackage.fileName}</p>
        <p>Status: {this.aPackage.status}</p>
        <button onClick={this.download}>Download</button>
        <p>{this.aPackage.status === 'pending' ? 'yo' : 'sup'}</p>
      </div>
    );
  }
}

export default PendingComponent;
