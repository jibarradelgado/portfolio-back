const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const router = require('./network/routes');

db('mongodb+srv://db_user_portfolio:ygQZIvAVBSLQFwQl@cluster0.n227s.mongodb.net/portfolioDB?retryWrites=true&w=majority');

var app = express();
app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('The app is listening in http://localhost:3000');