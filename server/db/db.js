const mongoose = require('mongoose');
require('../config/config');

mongoose.connect( process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( () => {
  console.log('Database connected...');
}).catch( () => {
  console.log('Could not connect with database...');
});
