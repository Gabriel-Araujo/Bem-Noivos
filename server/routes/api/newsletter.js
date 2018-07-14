const express = require('express');

const router = express.Router();

// Newsletter model
const Newsletter = require('../../models/Newsletter');

// Validation
const validateNewsletterInput = require('../../validation/newsletter');

// @route   GET api/newsletter/test
// @desc    Tests newsletter route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Newsletter Works' }));

// @route   POST api/newsletter
// @desc    Register e-mail
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateNewsletterInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newEmail = new Newsletter({
    email: req.body.email,
    country: req.body.country,
    region: req.body.region,
    city: req.body.city,
  });

  newEmail.save().then(email => res.json(email));
});

module.exports = router;
