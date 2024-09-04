const express = require('express');
const { getUnpaidJobs, payJob, depositBalance } = require('../controllers/jobController');
const { getProfile } = require('../middleware/getProfile');

const router = express.Router();

router.get('/unpaid', getProfile, getUnpaidJobs);
router.post('/:job_id/pay', getProfile, payJob);
router.post('/deposit/:userId', getProfile, depositBalance);

module.exports = router;
