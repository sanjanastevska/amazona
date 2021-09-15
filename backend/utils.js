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

//authenticate user
const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length); //Bearer XXXXXXX
        //decrypt the token
        jwt.verify(token, config.get('auth').jwt_key, (err, decode) => {
            if(err) {
                res.status(401).send({
                    message: 'Invalid Token'
                });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({
            message: 'No Token'
        });
    }
};

module.exports = {
    generateToken,
    isAuth
};