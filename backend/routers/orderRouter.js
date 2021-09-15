const express = require('express');
const controller = require('../controllers/orders');

const orderRouter = express.Router();

orderRouter.post('/', controller.orderAction);

module.exports = orderRouter;