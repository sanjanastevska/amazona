const Order = require('../models/orderModel.js');
const { isAuth } = require('../utils.js');

const orderAction = ( isAuth, async(req, res, next) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({
            message: 'Cart is empty'
        });
    } else {
        const order = await Order.create({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            PaymentMethod: req.body.PaymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });
        res.status(201).send({
            error: false,
            message: 'New Order Created!',
            order
          });
    }
});

module.exports = {
    orderAction
};