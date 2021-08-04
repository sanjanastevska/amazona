const jwt = require('jsonwebtoken');
const config = require('./config/index.js');

const generateToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email
    },
        config.get('auth').jwt_key,
        { expiresIn: '30d' }
    );
};

module.exports = {
    generateToken
};