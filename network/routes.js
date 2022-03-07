const express = require('express');
const asset = require('../components/asset/network');
const user = require('../components/user/network');

const routes = function(server) {
  server.use('/asset', asset);
  server.use('/user', user);
}

module.exports = routes;