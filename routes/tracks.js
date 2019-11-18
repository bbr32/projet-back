const express = require('express');

const router = express.Router();
var track = require('../controllers/tracksController');

/* GET track listing. */
router.get('/', track.findAll);

module.exports = router;