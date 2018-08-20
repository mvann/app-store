const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const repoConnection = require('./flask-communication');

const port = 5001;

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// repoConnection.uploadFileToRepo(__dirname + '/test.deb');
