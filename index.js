const express = require('express');
const productCategories = require('./routes/productCategories');
const products = require('./routes/products');
const users = require('./routes/users');
const app = express();
const cors = require('cors');
const PORT = 5001;
const  bodyParser = require("body-parser");
const orders= require('./routes/orders');



app.use(cors());
app.use(bodyParser.json());
app.use('/productCategories', productCategories);
app.use('/products', products);
app.use('/users', users);
app.use('/orders', orders);


const server = app.listen(PORT, ()=> {
    console.log('App is Running on the port - 5001');
}); 