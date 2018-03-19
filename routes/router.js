var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.use('/', require('./boards'));
router.use('/', require('./board_id'));
router.use('/', require('./lists'));
router.use('/', require('./list_id'));
router.use('/', require('./cards'));
router.use('/', require('./card_id'));

module.exports = router;