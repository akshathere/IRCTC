const express = require('express');
const { addTrain, getTrains } = require('../controllers/train.controller');
const { authenticateAdminKey } = require('../middleware/admin.middleware');
const router = express.Router();

router.post('/trains', authenticateAdminKey, addTrain);
router.get('/trains', getTrains);

module.exports = router;
