const express = require('express');
const controller = require('../controllers/users');

const userRouter = express.Router();

userRouter
    .get('/', controller.fetch)
    .post('/register', controller.register)
    .post('/login', controller.login)
    .patch('/:id', controller.update)
    .delete('/:id', controller.del)


  
module.exports = userRouter;