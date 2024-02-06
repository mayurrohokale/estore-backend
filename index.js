const express = require('express');
const productCategories = require('./routes/productCategories');
const products = require('./routes/products');
const app = express();
const cors = require('cors');
const PORT = 5001;

app.use(cors());
app.use('/productCategories', productCategories);
app.use('/products', products);


const server = app.listen(PORT, ()=> {
    console.log('App is Running on the port - 5001');
}); 