const express = require('express');

const router = express.Router();

// @route   GET api/supplier/test
// @desc    Test supplier route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'supplier works' }));

module.exports = router;
