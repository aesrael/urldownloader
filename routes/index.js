var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (eq,res,next) => res.send('urldownloader post to <strong>api/file</strong> with a "source and "destination"'))

module.exports = router;
