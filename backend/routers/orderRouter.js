const express = require('express');
const controller = require('../controllers/orders');

const orderRouter = express.Router();

orderRouter
    // .get('/', controller.fetch)
    .get('/mine', controller.mineList)
    .post('/', controller.orderAction)
    .get('/:id', controller.fetchOne)
    .put('/:id/pay', controller.update);

module.exports = orderRouter;