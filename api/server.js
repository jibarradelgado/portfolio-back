const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config');
const swaggerUI = require('swagger-ui-express');
const errors = require('../network/errors');

const cors = require('cors');
const db = require('../db');
const router = require('../network/routes');

db(config.dbUrl);
app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');
app.use(cors());

router(app);

app.use(config.publicRoute, express.static('public'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errors);

app.listen(config.port);
console.log('The app is listening in '+ config.host + ':' + config.port);