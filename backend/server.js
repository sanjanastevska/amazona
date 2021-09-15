require('./db');
const express = require('express');
const cors = require('cors');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000');
});