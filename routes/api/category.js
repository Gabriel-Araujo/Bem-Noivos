const express = require('express');

const router = express.Router();

// @route   GET api/category/test
// @desc    Test category route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'category works' }));

module.exports = router;
