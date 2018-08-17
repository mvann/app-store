import React, { Component } from 'react';
import axios from 'axios';

class DeveloperComponent extends Component {
  onUpload(e) {
    let data = new FormData();
    // data.append('name', window.localStorage.getItem('username'));
    // data.append('token', window.localStorage.getItem('token'));
    data.append('file', e.target.files[0]);
    axios({
      method: 'post',
      url: 'api/users/upload',
      body: data
    }).then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onUpload}/>
      </div>
    );
  }
}

export default DeveloperComponent;
