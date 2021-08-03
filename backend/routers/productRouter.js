const express = require('express');
const controller = require('../controllers/products')

const productRouter = express.Router();

productRouter
    .get('/', controller.fetch)
    .get('/:id', controller.fetchOne)
    .post('/', controller.create)
    // .patch('/:id', controller.update)
    // .delete('/:id', controller.del)

  
module.exports = productRouter;