const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getIndexUser);

router.post('/registrasi', userController.postUserRegister); //materi
router.post('/login', userController.postUserLogin); //materi

module.exports = router;