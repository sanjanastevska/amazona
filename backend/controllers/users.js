const User = require('../models/userModel');
const { generateToken } = require('../utils');

const fetch = async (_, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            error: false,
            users
        });
    } catch (err) {
        res.status(500).send({
            error: true,
            message: err.message
        });
    }
    await next;
};

const register = async (req, res, next) => {
    try {
        if (!req.body.password || req.body.password !== req.body.confirmation_password) {
            return res.status(400).send({
                error: true,
                message: 'Bad request. Passwords do not match.'
            });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({
                error: true,
                message: 'Bad request. User exists with the provided email.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);

        const createdUser =  await User.create(req.body);

        res.status(201).send({
            error: false,
            message: 'User registered!',
            token: generateToken(createdUser)
        });
    } catch (err) {
        res.status(500).send({
            error: true,
            message: error.message
        });
    }
    await next;
};

const login = async (req, res, next) => {
    try {

    } catch (err) {

    }
    await next;
};

const update = async (req, res, next) => {
    try {

    } catch (err) {

    }
    await next;
}

const del = async (req, res, next) => {
    try {

    } catch (err) {

    }
    await next;
}

module.exports = {
    fetch,
    register,
    login,
    update,
    del
}