const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotnv = require('dotenv');
dotnv.config();

const User = require('../models/User');

module.exports.getIndexUser = (req, res) => {
    console.log('index user');

}

module.exports.postUserLogin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                res.status(400).send('Email not found');
            }

            bcrypt.compare(req.body.password, user.get('password'), function (err, isMatch) {
                if (err) {
                    res.status(400).send('Password Error');
                };

                if (isMatch) {
                    jwt.sign({
                            id: user.get('id'),
                            role: user.get('roles')
                        },
                        process.env.SECRETKEY, (error, token) => {
                            res.json({
                                token: token,
                                user: user
                            });
                        })
                } else {
                    res.status(400).send('Wrong Password')
                }
            })
        })
        .catch((e) => {
            res.json(e)
        });
}

module.exports.postUserRegister = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    User.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                username: req.body.username,
                email: req.body.email,
                email: req.body.email,
                password: hash,
                roles: req.body.roles
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((e) => {
            res.json(e);
        })
}
//materi