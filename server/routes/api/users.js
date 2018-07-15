const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

// @route   POST api/users/register
// @desc    Register route
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email já registrado';
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      region: req.body.region,
      city: req.body.city,
      role: 'REGULAR',
      avatar,
    });

    bcrypt.genSalt(10, (errGenSalt, salt) => {
      bcrypt.hash(newUser.password, salt, (errHash, hash) => {
        if (errHash) throw errHash;

        newUser.password = hash;
        newUser
          .save()
          .then(userSaved => res.json(userSaved))
          .catch(errNewUser => console.log(errNewUser));
      });
    });
  });
});

// @route   POST api/users/login
// @desc    Login User | Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  // Find User by email
  User.findOne({ email }).then(user => {
    // Check User
    if (user) {
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Match
          const { id, name, avatar, country, region, city, role } = user;
          const payload = { id, name, avatar, country, region, city, role }; // Create JWT Payload
          // Sign Token
          jwt.sign(
            payload,
            keys.secretJWT,
            { expiresIn: 10800 },
            (err, token) => {
              res.json({ success: true, token: `Bearer ${token}` });
            },
          );
        } else {
          errors.password = 'Senha incorreta';
          return res.status(400).json(errors);
        }
      });
    } else {
      errors.email = 'Usuário não encontrado';
      return res.status(404).json(errors);
    }
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  },
);

module.exports = router;
