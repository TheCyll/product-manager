const express = require('express');
const product = require('./routes/product');
const cors = require('cors');

require('./config/config');
require('./db/db');

const app = express();
app.use(cors());

app.use('/product', product);

app.listen( process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});



