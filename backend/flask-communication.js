const request = require('request');
const fs = require('fs');
const streamifier = require('streamifier');

module.exports.uploadFileToRepo = function(file) {
  var formData = {
    file: streamifier.createReadStream(new Uint8Array(file))
  }
  request.post({
    url:'http://localhost:5000',
    formData: formData,
  }, (err, response, body) => {
    console.log("Error:", err);
    console.log("Response:", response);
    console.log("Body:", body);
  });
}
