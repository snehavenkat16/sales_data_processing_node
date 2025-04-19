const express = require('express');
const refreshRouter = express.Router();
const { refreshData } = require('../controllers/refreshController');

refreshRouter.post('/refresh', refreshData);

module.exports = refreshRouter;
