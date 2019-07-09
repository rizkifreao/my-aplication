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

//materi
module.exports.postProduct = (req, res) => {
	let values = {
		name: req.body.name,
		price: req.body.price
	}

	jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
		if (error) {
			res.sendStatus(403);
		} else {
			if (authData.role !== 'admin') {
				res.json({
					message: 'Maaf hanya untuk admin',
					authData: authData
				});
			} else {
				res.send('fungsi add product');
			}
			// ProductModel.findAll().then(product => res.status(200).json({
			// 		message: 'OK',
			// 		authData: authData,
			// 		products: product
			// 	}))
			// 	.catch(e => res.json({
			// 		error: true,
			// 		data: [],
			// 		error: e
			// 	}));
		}
	})

	// Product
	// 	.create(values)
	// 	.then((product) => {
	// 		res.json(product);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	})
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