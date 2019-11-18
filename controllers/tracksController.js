const Track = require('../models/tracksModel.js');

//Create and save a new Track
exports.create = (req, res) => {
    //Validation request
    if(!req.body.title){
        return res.status(400).send({
            message: 'Title cannot be empty'
        });
    }
    //Create a new track
    const track= new Track({
        title: req.body.title,
        duration: req.body.duration,
        listenings: req.body.listenings,
        likes: req.body.likes,
        featuring: req.body.featuring
    });

    //Save track in the database
    track.save().then(data =>{
        // we wait for insertion to be complete and we send the newly track integrated
        res.send(data);
    }).catch(err =>{
        // In case of error during insertion of a new track in database we send an
        // appropriate message
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the track.'
        });
    });
};

// Retrieve and return all tracks from the database.
exports.findAll = (req, res) => {
    Track.find().then(tracks => {
        res.send(tracks);
    }).catch(err => {
        res.status(500).send({message: err.message || 'Some error occurred while retrieving tracks.'
        });
    });
};

//Find a single track with an track ID
exports.findOneById = (req,res) =>{
    Track.findById(req.params.id)
        .then(track =>{
            if(!track){
                return res.status(404).send({
                    message: 'track not found with id' + req.params.id
                });
            }
            res.send(track);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                  message: 'track not found with id ' + req.params.id
                });
              }
              return res.status(500).send({
                message: 'Error retrieving track with id ' + req.params.id
              });
        });
};

//Find a single track with an track name
exports.findOneByTitle = (req,res) =>{
    Track.findOne(req.params.title)
        .then(track =>{
            if(!track){
                return res.status(404).send({
                    message: 'track not found with title' + req.params.title
                });
            }
            res.send(track);
        }).catch(err => {
              return res.status(500).send({
                message: 'Error retrieving track with title ' + req.params.title
              });
        });
};

// Update a track identified by the Id in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body.title){
        return res.status(400).send({
            message: 'Title cannot be empty'
        });
    }

    //Find track and update it with the request body
    Track.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            duration: req.body.duration,
            listenings: req.body.listenings,
            likes: req.body.likes,
            featuring: req.body.featuring
        }, 
        {new: true}
    ).then(track => {
        if(!track){
            return res.status(404).send({
                message: 'track not found with id ' + req.params.id
            });
        }
        res.send(track);
    })
    .catch(err =>{
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'track not found with id ' + req.params.id
            });
          }
          return res.status(500).send({
            message: 'Error updating track with id ' + req.params.id
          });
        });
};

// Delete a track with the specified track Id in the request
exports.delete = (req, res) => {
    Track.findByIdAndRemove(req.params.id)
    .then(track =>{
        if(!track){
            return res.status(404).send({
                message: 'track not found with id ' + req.params.id
              });
        }
        res.send({message:'track deleted successfully!' });
    })
    .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'track not found with id ' + req.params.id
            });
          }
          return res.status(500).send({
            message: 'Could not delete track with id ' + req.params.id
          });
    });
};
    