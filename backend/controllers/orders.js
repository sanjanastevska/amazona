const Order = require('../models/orderModel.js');
const { isAuth } = require('../utils.js');

// const fetch = (isAuth, async(req, res) => {
//     const orders = await Order.find({}).populate({user: req.user._id});
//     res.send(orders);
// });

const mineList = (isAuth, async(req, res) => {
    try {
        const orders = await Order.find({})
        res.send(orders);
    } catch (err) {
        res.status(404).send({
            message: 'Orders Are Not Found',
            exception: err.message
        });
    }
});

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
                user: req.body.user
            });
            const createdOrder = await order.save();
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

const fetchOne = (isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({
            message: 'Order Not Found'
        })
    }
});

const update = (isAuth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            };
            const updatedOrder = await order.save();
            res.send({
                message: 'Order Paid',
                order: updatedOrder
            });
        }
    } catch (err) {
        res.status(404).send({
            message: 'Order Not Found',
            exception: err.message
        });
    }
});


module.exports = {
    // fetch,
    mineList,
    fetchOne,
    orderAction,
    update
};