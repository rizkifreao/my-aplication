const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const auth = require('../configs/auth');

router.get('/', auth.verivyToken, productController.getIndex);

router.post('/add', auth.verivyToken, productController.postProduct); //materi

router.put('/:id', productController.putProduct); //materi

module.exports = router;