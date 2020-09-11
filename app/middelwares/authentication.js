let jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token.startsWith('Bearer')) {
        // Remove Bearer from token string
        token = token.slice(7, token.length);
    }

    if(token){

        jwt.verify(token, req.app.get('secretKey'), {},(error, decoded) => {
            if(error)
                res.json({
                    status: 'error',
                    message: 'The Token is not valid!'
                });
            else
                req.decoded = decoded;
            next();
        });

    }else {
        res.json({
            status: 'error',
            message: 'Authenticate token not supplied!'
        });
    }

}

module.exports = {
    checkToken
}