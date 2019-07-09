const express = require('express');
const bodyParser = require('body-parser'); //materi

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json()); //materi

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

const sequelize = require('./configs/sequelize');

const Product = require('./models/product');
const User = require('./models/User');

app.use(homeRouter);
app.use('/product', productRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('server started');
    // sequelize.sync();
})