const express = require('express');
const { depositBalance } = require('../controllers/balanceController');
const { getProfile } = require('../middleware/getProfile');

const router = express.Router();

router.post('/deposit/:userId', getProfile, depositBalance);

module.exports = router;
