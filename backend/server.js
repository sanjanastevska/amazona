require('./db');
const express = require('express');
const productRouter = require('./routers/productRouter');

const app = express();
app.use(express.json());

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000');
});