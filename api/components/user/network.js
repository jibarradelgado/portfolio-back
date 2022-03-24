const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = await controller.addUser(req.body);
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

router.patch('/:id', secure.checkAuth('update'), async (req, res) => {
  try {
  const data = await controller.updateUser(req.params.id, req.body);
  response.success(req, res, data, 200);
  } catch (error) {
    console.error(`[PATCH/user]: ${error}`);
    response.error(req, res, "Server Error", 500, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteUser(req.params.id, req.body);
    response.success(req, res, `User ${req.params.id} removed`, 200);
  } catch (error) {
    response.error(req, res, "Server Error", 500, error);
  }
});

module.exports = router;