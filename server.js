const express = require('express');
const bodyParser = require('body-parser');

const router = require('./network/routes');

var app = express();
app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('The app is listening in http://localhost:3000');