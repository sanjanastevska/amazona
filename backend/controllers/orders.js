const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js');
const { isAuth } = require('../utils.js');

const orderAction = (isAuth, async (req, res) => {
    try {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({
                message: 'Cart is empty'
            });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });
            const createdOrder = await order.save();
            console.log("BACKEND ORDER0", createdOrder)
            res.status(201).send({
                error: false,
                message: 'New Order Created!',
                order: createdOrder
            });
        }
    } catch (err) {
        res.status(500).send({
            error: true,
            message: "Error Creating Order",
            exception: err.message
        });
    }
});

module.exports = {
    orderAction
};