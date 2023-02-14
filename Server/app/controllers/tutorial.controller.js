const Tutorial = require('../models/tutorial.model');

// create and save a new tutorial
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    // create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // save Tutorial in the database
    Tutorial.create(tutorial, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 
                    err.message || 'Some error occurred while creating the Tutorial.'
            })
        }
        else res.send(data);
    });
};

// retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    
    Tutorial.getAll(title, (err, data) => {
        if (err) 
            res.status(500).send({
                message: 
                    err.message || 'Some error occurred while retrieving tutorials.' 
            });
        else res.send(data);
    });
};


// find all published tutorial with an id
exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err) 
            res.status(500).send({
                message: 
                    err.message || 'Some error occurred while retrieving tutorials.'
            });
        else res.send(data);
    });
};

// find a single tutorial with an id
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err){
            if (err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Tutorial with id ${req.params.id}.`
                });
            };
        } else res.send(data);
    });
}

// update a tutorial identified by the id int the request
exports.update = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
    }

    console.log(req.body);

    Tutorial.updateById(req.params.id, new Tutorial(req, body), (err, data) => {
        if (err) {
            if(err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            }
            else res.status(500).send({
                message: `Error updating Tutorial with id ${req.params.id}.`
            });
        } else res.send(data);
    });
};

// delete a tutorial identified by the id int the request
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete Tutorial with id ${req.params.id}.`
                });
            }
        } else res.send({
            message: `Tutorial was deleted successfully!`
        });
    });
};

// delete all tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: 
                    err.message || 'Some error occurred while removing all tutorials.'
            });
        } else res.send({
            message: `All tutorials were deleted successfully.`
        });
    });
};