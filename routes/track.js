const express = require('express');

const router = express.Router();

var track = require('../controllers/tracksController');

/* GET one track by id. */
router.get('/:id', track.findOneById);

/* GET one track by name. */
router.get('/trackName/:title', track.findOneByTitle);
  
/* PUT new track. */
router.put('/', track.create);
  
/* DELETE track. */
router.delete('/:id', track.delete);
  
/* UPDATE track. */
router.post('/:id', track.update);

module.exports = router;