require('./db');
const express = require('express');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');


const app = express();
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000');
});