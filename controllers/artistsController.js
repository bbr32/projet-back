const Artist = require('../models/artistsModel.js');

//Create and save a new Artist
exports.create = (req, res) => {
    //Validation request
    if(!req.body.name){
        return res.status(400).send({
            message: 'Name cannot be empty'
        });
    }
    //Create a new artist
    const artist= new Artist({
        name: req.body.name,
        birth: req.body.birth,
        followers: req.body.followers,
        albums: req.body.albums
    });

    //Save artist in the database
    artist.save().then(data =>{
        // we wait for insertion to be complete and we send the newly artist integrated
        res.send(data);
    }).catch(err =>{
        // In case of error during insertion of a new artist in database we send an
        // appropriate message
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Artist.'
        });
    });
};

// Retrieve and return all Artists from the database.
exports.findAll = (req, res) => {
    Artist.find().then(artists => {
        res.send(artists);
    }).catch(err => {
        res.status(500).send({message: err.message || 'Some error occurred while retrieving artists.'
        });
    });
};

//Find a single Artist with an Artist ID
exports.findOneById = (req,res) =>{
    Artist.findById(req.params.id)
        .then(artist =>{
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found with id' + req.params.id
                });
            }
            res.send(artist);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                  message: 'Artist not found with id ' + req.params.id
                });
              }
              return res.status(500).send({
                message: 'Error retrieving artist with id ' + req.params.id
              });
        });
};

//Find a single Artist with an Artist name
exports.findOneByName = (req,res) =>{
    Artist.findOne(req.params.name)
        .then(artist =>{
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found with name' + req.params.name
                });
            }
            res.send(artist);
        }).catch(err => {
              return res.status(500).send({
                message: 'Error retrieving artist with name ' + req.params.name
              });
        });
};

// Update a artist identified by the Id in the request
exports.update = (req, res) => {
    //Validate Request
    if(!req.body.name){
        return res.status(400).send({
            message: 'Name cannot be empty'
        });
    }

    //Find artist and update it with the request body
    Artist.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            birth: req.body.birth,
            followers: req.body.followers,
            albums: req.body.albums
        }, 
        {new: true}
    ).then(artist => {
        if(!artist){
            return res.status(404).send({
                message: 'Artist not found with id ' + req.params.id
            });
        }
        res.send(artist);
    })
    .catch(err =>{
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
              message: 'Artist not found with id ' + req.params.id
            });
          }
          return res.status(500).send({
            message: 'Error updating artist with id ' + req.params.id
          });
        });
};

// Delete a Artist with the specified Artist Id in the request
exports.delete = (req, res) => {
    Artist.findByIdAndRemove(req.params.id)
    .then(artist =>{
        if(!artist){
            return res.status(404).send({
                message: 'Artist not found with id ' + req.params.id
              });
        }
        res.send({message:'Artist deleted successfully!' });
    })
    .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
              message: 'Artist not found with id ' + req.params.id
            });
          }
          return res.status(500).send({
            message: 'Could not delete artist with id ' + req.params.id
          });
    });
};
    