const express = require('express');
const { getLogsController, ingestLogsController, searchLogsController } = require('../controllers/logsController/logsController');
const validate = require('../utils/middleware/logsValidate');
const { logSchema } = require('../utils/validators/logValidator');
const { registerSSE } = require('../events');
const router = express.Router();

router.post('/logs', validate(logSchema), ingestLogsController);  
router.get('/logs', registerSSE);      
router.get('/logs/search', searchLogsController); 

module.exports = router;