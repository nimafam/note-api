const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const create = async (req, res, next) => {

    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;

    await UserModel.create( {
        name: name,
        email: email,
        password: password
    }, (error, result) => {
        if(error) {
            res.status(403).json({
                status: 'error',
                message: 'Can not create an user',
                data: error
            });
        } else {
            res.status(403).json({
                status: 'OK',
                message: 'The user successfully registered',
                data: result
            });
        }
    });
}

const authenticate = (req, res, next) => {
    UserModel.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            console.log(error);
            res.status(403).json({
                status: false,
                message: 'User not found!',
                data: error
            });
            next();
        } else {
            if(req.body.password === user.password) {
                let token = jwt.sign(
                    {_id: user._id},
                    req.app.get('secretKey'),
                    { expiresIn: '1h' }
                );

                res.status(200).json({
                    status: true,
                    message: 'Authentication was successful',
                    token: token,
                    data: user
                })
            } else {
                res.status(400).json({
                    status: false,
                    message: 'Email or Password is wrong!'
                })
            }
        }
    })
}

module.exports = {
    create,
    authenticate
}