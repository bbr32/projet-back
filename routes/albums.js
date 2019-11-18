const express = require('express');

const router = express.Router();
var album = require('../controllers/albumsController');

/* GET album listing. */
router.get('/', album.findAll);

module.exports = router;