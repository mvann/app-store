import React, { Component } from 'react';
import axios from 'axios';

class DeveloperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: '--',
      file: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(e) {
  //   this.setState({[e.target.name]: e.target.value});
  // }

  handleFileChange(e) {
    console.log(e.target.files[0]);
    this.setState({
      packageName: e.target.files[0].name.split('_')[0],
      file: e.target.files[0]});
  }

  handleSubmit(e) {
    let data = new FormData();
    data.append('name', window.localStorage.getItem('username'));
    data.append('token', window.localStorage.getItem('token'));
    data.append('packageName', this.state.packageName);
    data.append('file', this.state.file);
    axios.post('api/packages/upload', data)
    .then(res => {
    });
  }

  render() {
    return (
      <div>
        <h3>Package Name: {this.state.packageName}</h3>
        <br/>File:
        <input type='file' onChange={this.handleFileChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default DeveloperComponent;
