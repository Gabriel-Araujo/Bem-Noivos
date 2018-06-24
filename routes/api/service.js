const express = require('express');

const router = express.Router();

// @route   GET api/service/test
// @desc    Test service route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'service works' }));

module.exports = router;
