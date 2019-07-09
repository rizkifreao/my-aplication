const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class User extends Sequelize.Model {}

User.init({
    username: Sequelize.STRING,
    email: Sequelize.INTEGER,
    password: Sequelize.INTEGER,
    roles: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;