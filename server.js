const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const service = require('./routes/api/service');
const supplier = require('./routes/api/supplier');
const category = require('./routes/api/category');

const app = express();

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
app.use('/api/service', service);
app.use('/api/supplier', supplier);
app.use('/api/category', category);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Bem-Noivos listening on port ${port}!`);
});
