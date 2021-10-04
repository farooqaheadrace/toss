const UsersRepo = require('../repos/usersRepo')
const Constants = require('../constants')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: __dirname + '/config/.env' })

module.exports = function (router) {
    router.post(Constants.ROUTE_POST_ADDUSER, async function (req, res) {
        try {
            const user = await UsersRepo.addUser(req.body);
            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    });

    router.post(Constants.ROUTE_POST_EDITUSER, async function (req, res) {
        try {
            const user = await UsersRepo.editUser(req.params.userId, req.body);
            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    });

    router.get(Constants.ROUTE_GET_USERS, async function (req, res) {
        try {
            const users = await UsersRepo.getUsers();
            res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    });

    router.post(Constants.ROUTE_POST_LOGINUSER, async function (req, res) {
        try {
            const user = await UsersRepo.loginUser(req.body);
            let token = await jwt.sign(user, process.env.TOKEN_SECRETKEY);
            res.header('auth-token', token);
            res.status(200).json(token);
        } catch (error) {
            return res.status(500).json(error);
        }
    });
}