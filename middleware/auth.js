const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.getSecret();

let checkUser = function (req, res, next) {
    let authorization = req.headers.authorization;
    console.log(authorization);
    if (
        req.headers
        && req.headers.authorization
        && req.headers.authorization.split(' ')[0] === 'JWT'
    ) {
        let token = req.headers.authorization.split(' ')[1];
        console.log(token.trim());
        jwt.verify(token.trim(), secret, function (err, decode) {
            if (err) return res.status(401).send();
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        return res.status(401).send();
    }
};

module.exports = {
    checkUser: checkUser
};
