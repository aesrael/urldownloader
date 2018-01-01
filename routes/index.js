var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req,res,next) => res.send('urldownloader post to <strong>api </strong> with a "source and "destination"'))

module.exports = router;
