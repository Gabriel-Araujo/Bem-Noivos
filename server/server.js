const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');

const users = require('./routes/api/users');
const services = require('./routes/api/services');
const supplier = require('./routes/api/supplier');
const categories = require('./routes/api/categories');
const newsletter = require('./routes/api/newsletter');

const app = express();

// Middleware Logger Morgan
app.use(morgan('short'));

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware passport
app.use(passport.initialize());
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', users);
app.use('/api/services', services);
app.use('/api/supplier', supplier);
app.use('/api/categories', categories);
app.use('/api/newsletter', newsletter);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Bem-Noivos listening on port ${port}!`);
});
