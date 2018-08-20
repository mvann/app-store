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
        this.aPackage.fileBuffer.data,
        this.aPackage.fileName));
    a.download = this.aPackage.fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  render() {
    console.log(this.props.aPackage);
    return (
      <div>
        Pending: {this.aPackage.mimetype}
        <button onClick={this.download}>Download</button>
      </div>
    );
  }
}

export default PendingComponent;
