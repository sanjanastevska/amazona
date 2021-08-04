const Product = require('../models/productModel');

const fetch = async (_, res, next) => {
    try {
        const products = await Product.find({});

        res.status(200).send({
            error: false,
            products
        });
    } catch(err) {
        res.status(500).send({
            error: true,
            message: err.message
        });
    }
  await next;
};

const fetchOne = async (req, res, next) => {
    try {
        const product = await Product.findById({ _id: req.params.id});

        res.status(200).send({
            error: false,
            product
        });
    } catch(err) {
        res.status(500).send({
            error: true,
            message: 'Product Not Found'
        });
    }
  await next;
};

const create = async( req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).send({
            error: false,
            message: 'New Product Created!',
            product
          });
    } catch(err) {
        res.status(500).send({
            error: true,
            message: "Error Creating Product",
            exception: err.message
        });
    }
    await next;
};

const update = async( req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate({_id : req.params.id}, req.body);
        res.status(200).send({
            error: false,
            message: `Product with Id ${req.params.id} is Updated!`,
            product
          });
    } catch(err) {
        res.status(500).send({
            error: true,
            message: "Error Updating Product",
            exception: err.message
        });
    }
    await next;
};

const del = async( req, res, next) => {
    try {
        await Product.deleteOne({_id : req.params.id});
        res.status(200).send({
            error: false,
            message: `Product with Id ${req.params.id} is Removed!`
          });
    } catch(err) {
        res.status(500).send({
            error: true,
            message: "Error Deleting Product",
            exception: err.message
        });
    }
    await next;
};

module.exports = {
    fetch,
    fetchOne,
    create,
    update,
    del
};