const request = require('request');
const fs = require('fs');

module.exports.uploadFileToRepo = function(readstream, filename, res) {
  readstream.path='./' + filename;
  let formData = {
    file: readstream
  };
  let url = 'http://localhost:5000';

  request.post({
    url: url,
    formData: formData
  }, (err, response, body) => {
    if (err)
      res.status(500).json(err);
    if (err)
      console.log(err);
    else
      res.send(body);
  });
}
