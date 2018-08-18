const express = require('express');
const app = express();
const apiRouter = require('./api/api');

const port = 5001;

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
