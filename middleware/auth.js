const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.getSecret();

let checkUser = async function (req, res, next) {
    if (
        req.headers
        && req.headers.authorization
        && req.headers.authorization.split(' ')[0] === 'JWT'
    ) {
        let token = req.headers.authorization.split(' ')[1].trim();
        try {
            req.user = await verifyToken(token);
            next();
        } catch (e) {
           return res.status(401).send();
        }
    } else {
        req.user = undefined;
        return res.status(401).send();
    }
};

let verifyToken = token => {
   return new Promise((resolve, reject) => {
       jwt.verify(token, secret, (err, decode) => {
          if (err) reject(err);
          resolve(decode);
       });
   });
};


module.exports = {
    checkUser: checkUser,
    verifyToken: verifyToken
};
