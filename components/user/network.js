const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = await controller.addUser(req.body.name);
    response.success(req, res, body, 201);
  } catch (error) {
    console.error(`[POST/user]: ${error}`);
    response.error(req, res, "Server Error", 500, error);
  }
});

router.get('/', async (req, res) => {
  try {
    const filterUsersByName = req.query.name || null;
    const allUsers = await controller.getUsers(filterUsersByName);
    response.success(req, res, allUsers, 200);
  } catch (error) {
    response.error(req, res, "Error getting Users", 500, error);
  }
});

module.exports = router;