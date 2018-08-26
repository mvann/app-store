const request = require('request');
const fs = require('fs');

module.exports.uploadFileToRepo = function(readstream) {
  readstream.path='./' + readstream.name;
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
    else
      res.send(body);
  });
}
