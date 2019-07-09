const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const dotnv = require('dotenv');

dotnv.config();

const ProductModel = require('../models/product');

module.exports.getIndex = function (req, res) {
	jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
		if (error) {
			res.sendStatus(403);
		} else {

			ProductModel.findAll().then(product => res.status(200).json({
					message: 'OK',
					authData: authData,
					products: product
				}))
				.catch(e => res.json({
					error: true,
					data: [],
					error: e
				}));
		}
	})
}

module.exports.getProduct = function (req, res) {
	console.log('getProduct');

}
//materi
module.exports.postProduct = (req, res) => {
	let values = {
		name: req.body.name,
		price: req.body.price
	}

	Product
		.create(values)
		.then((product) => {
			res.json(product);
		})
		.catch((error) => {
			console.log(error);
		})
}
//materi
module.exports.putProduct = (req, res) => {
	let values = {
		name: req.body.name,
		price: req.body.price
	}

	let conditions = {
		where: {
			id: req.params.id
		}
	}

	Product
		.update(values, conditions)
		.then((product) => {
			res.json(product);
		})
		.catch((error) => {
			console.log(error);
		})
}