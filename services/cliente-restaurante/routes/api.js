const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');

module.exports = (db) => {
    const authController = new AuthController(db);
    const userController = new UserController(db);
    
    router.post('/register/cliente', authController.registerClient.bind(authController));
    router.post('/register/restaurante', authController.registerRestaurant.bind(authController));
    router.post('/register/entregador', authController.registerEntregador.bind(authController));
    router.post('/login', authController.login.bind(authController));

    router.get('/usuarios/:id', userController.getUser.bind(userController));

    return router;
};