const express = require('express');

const router = express.Router();
var artist = require('../controllers/artistsController');

/* GET artists listing. */
router.get('/', artist.findAll);

module.exports = router;