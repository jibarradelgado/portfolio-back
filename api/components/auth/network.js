const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const token = await controller.login(req.body.username, req.body.password);
    response.success(req, res, token, 201);
  } catch (error) {
    response.error(req, res, "Invalid info", 400, error);
  }
});

router.get('/', async (req, res) => {
  try {
    const filterUsersByUsername = req.query.name || null;
    const auths = await controller.getAuth(filterUsersByUsername);
    response.success(req, res, auths, 200);
  } catch (error) {
    response.error(req, res, "Error getting Auths", 500, error);
  }
});

module.exports = router;