const router = require('express').Router();
const getSessionsDetails = require('../controllers/userSession/getSessionsDetails');

router.post('/getSessionsDetails', getSessionsDetails);

module.exports = router;
