const express = require('express');

const router = express.Router();

var artist = require('../controllers/artistsController');

/* GET one artist by id. */
router.get('/:id', artist.findOneById);

/* GET one artist by name. */
router.get('/artistName/:name', artist.findOneByName);
  
/* PUT new artist. */
router.put('/', artist.create);
  
/* DELETE artist. */
router.delete('/:id', artist.delete);
  
/* UPDATE artist. */
router.post('/:id', artist.update);

module.exports = router;