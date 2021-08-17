const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
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
        const user = await User.findOne({ email: req.body.email });

        if(!user) {
            return res.status(400).send({
                error: true,
                message: 'No user with the provided email'
            })
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({
                error: true,
                message: 'Incorrect password'
              });
        }

        res.status(201).send({
            error: false,
            message: 'You are logged in. JWT successfully generated',
            token: generateToken(user),
            user
        });
    } catch (err) {
        res.status(500).send({
            error: true,
            message: err.message
        });
    }
    await next;
};

const update = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id}, req.body);

        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        
        res.status(200).send({
            error: false,
            message: 'User is updated!',
            user
        });
    } catch (err) {
        res.status(500).send({
            error: true,
            message:err.message
        });
    }
    await next;
}

const del = async (req, res, next) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id});
        res.status(200).send({
            error: false,
            message: 'User Deleted!',
            user
        });
    } catch(err) {
        res.status(404).send({ 
            message: 'User Not Found' 
        });
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