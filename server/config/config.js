const { MONGO_URI } = require('../config/secrets');

// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3030;

// ============================
// Env
// ============================

const environment = process.env.NODE_ENV || 'development';

// ============================
// DB
// ============================

if ( environment === 'development') {
  var urlDB = MONGO_URI; 
} else {
  var urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;