const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/private/test
// @desc    Test private route
// @access  Private
router.get('/test', auth, (req, res) => {
  res.json({ msg: 'Private route accessed successfully' });
});

module.exports = router;