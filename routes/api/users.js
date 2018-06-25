const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');

const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

// @route   POST api/users/register
// @desc    Register route
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email já registrado' });
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

    return null;
  });
});

// @route   POST api/users/login
// @desc    Login User | Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find User by email
  User.findOne({ email }).then(user => {
    // Check User
    if (user) {
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Match
          const { id, name, avatar } = user;
          const payload = { id, name, avatar }; // Create JWT Payload
          // Sign Token
          jwt.sign(
            payload,
            keys.secretJWT,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({ success: true, token: `Bearer ${token}` });
            },
          );
        }

        return res.status(400).json({ password: 'Senha incorreta' });
      });
    }

    return res.status(404).json({ email: 'Usuário não encontrado' });
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
