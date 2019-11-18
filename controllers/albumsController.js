const Album = require('../models/albumsModel.js');

//Create and save a new album
exports.create = (req, res) => {
    //Validation request
    if(!req.body.title){
        return res.status(400).send({
            message: 'Title cannot be empty'
        });
    }
    //Create a new album
    const album= new Album({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        tracks: req.body.tracks
    });

    //Save album in the database
    album.save().then(data =>{
        // we wait for insertion to be complete and we send the newly album integrated
        res.send(data);
    }).catch(err =>{
        // In case of error during insertion of a new album in database we send an
        // appropriate message
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the album.'
        });
    });
};

// Retrieve and return all albums from the database.
exports.findAll = (req, res) => {
    Album.find().then(albums => {
        res.send(albums);
    }).catch(err => {
        res.status(500).send({message: err.message || 'Some error occurred while retrieving albums.'
        });
    });
};

//Find a single album with an album ID
exports.findOneById = (req,res) =>{
    Album.findById(req.params.id)
        .then(album =>{
            if(!album){
                return res.status(404).send({
                    message: 'album not found with id' + req.params.id
                });
            }
            res.send(album);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                  message: 'album not found with id ' + req.params.id
                });
              }
              return res.status(500).send({
                message: 'Error retrieving album with id ' + req.params.id
              });
        });
};

//Find a single album with an album name
exports.findOneByTitle = (req,res) =>{
    Album.findOne(req.params.title)
        .then(album =>{
            if(!album){
                return res.status(404).send({
                    message: 'album not found with title' + req.params.title
                });
            }
            res.send(album);
        }).catch(err => {
              return res.status(500).send({
                message: 'Error retrieving album with title ' + req.params.title
              });
        });
};

// Update a album identified by the Id in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body.title){
        return res.status(400).send({
            message: 'Title cannot be empty'
        });
    }

    //Find album and update it with the request body
    Album.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            year: req.body.year,
            genre: req.body.genre,
            tracks: req.body.tracks
        }, 
        {new: true}
    ).then(album => {
        if(!album){
            return res.status(404).send({
                message: 'album not found with id ' + req.params.id
            });
        }
        res.send(album);
    })
    .catch(err =>{
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'album not found with id ' + req.params.id
            });
          }
          return res.status(500).send({
            message: 'Error updating album with id ' + req.params.id
          });
        });
};

// Delete a album with the specified album Id in the request
exports.delete = (req, res) => {
    Album.findByIdAndRemove(req.params.id)
    .then(album =>{
        if(!album){
            return res.status(404).send({
                message: 'album not found with id ' + req.params.id
              });
        }
        res.send({message:'album deleted successfully!' });
    })
    .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'album not found with id ' + req.params.id
            });
          }
          return res.status(500).send({
            message: 'Could not delete album with id ' + req.params.id
          });
    });
};
    