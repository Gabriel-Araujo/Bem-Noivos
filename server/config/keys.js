module.exports = (process.env.NODE_ENV === 'production') ? require('./keys_prod') : require('./keys_dev');
/*
module.exports = {
  mongoURI: 'mongodb://bnadmin:bnadmin182@ds217351.mlab.com:17351/bemnoivos',
  secretJWT: 'secret',
};
*/
