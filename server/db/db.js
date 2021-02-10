const mongoose = require('mongoose');
import { MONGO_URI } from '../config/secrets';

mongoose.connect( MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( () => {
  console.log('Database connected...');
}).catch( () => {
  console.log('Could not connect with database...');
});
