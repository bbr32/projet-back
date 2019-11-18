const express = require('express');

const router = express.Router();

var album = require('../controllers/albumsController');

/* GET one album by id. */
router.get('/:id', album.findOneById);

/* GET one album by name. */
router.get('/albumName/:title', album.findOneByTitle);
  
/* PUT new album. */
router.put('/', album.create);
  
/* DELETE album. */
router.delete('/:id', album.delete);
  
/* UPDATE album. */
router.post('/:id', album.update);

module.exports = router;