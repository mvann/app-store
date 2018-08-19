const request = require('request');
const fs = require('fs');

module.exports.uploadFileToRepo = function(filePath) {
  var formData = {
    file: fs.createReadStream(filePath)
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
