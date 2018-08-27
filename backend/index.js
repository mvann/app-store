const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const repoConnection = require('./flask-communication');

const port = 5001;

app.use('/api', apiRouter);
app.get('/', (req, res) => res.send('Welcome to our Express backend!'));

app.listen(port, () => console.log(`Listening on port ${port}!`));

// repoConnection.uploadFileToRepo(__dirname + '/test.deb');
