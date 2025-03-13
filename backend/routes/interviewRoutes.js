const express = require('express');
const { createInterview } = require('../controllers/interviewController');

const router = express.Router();

// POST route for creating an interview session
router.post('/api/interviews', createInterview);

module.exports = router;