const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');

const cors = require('cors');
const db = require('./db');
const router = require('./network/routes');

db(config.dbUrl);


app.use(bodyParser.json());

router(app);

app.use(config.publicRoute, express.static('public'));
app.use(cors());

app.listen(config.port);
console.log('The app is listening in '+ config.host + ':' + config.port);