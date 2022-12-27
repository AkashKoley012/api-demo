const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB)
    .then(()=>console.log('DB connection established'))
    .catch((err)=>console.log(err.message));

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({error: {message: error.message}});
});

app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}/`);
});