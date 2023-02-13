const sql = require('./db.js');

// constructor
const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

// create a tutorial
Tutorial.create = (newTutorial, result) => {
    sql.query('INSERT INTO tutorials SET ?', newTutorial, (err,res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('created tutorials: ', {
            id: res.insertId, ...newTutorial
        });
        
        result(null, {
            id: res.insertId, ...newTutorial
        });
    });
};

// find a tutorial by a specified id 
Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length){
            console.log('found tutorial: ', res[0]);
            result(null, res[0]);
            return;
        }

        // did not find tutorial with the id specified
        result({kind: 'not_found'}, null);
    });
};

// get all Tutorials
Tutorial.getAll = (title, result) => {
    let query = `SELECT * FROM tutorials`;
    
    if (title) {
        query += ` WHERE title LIKE '%${title}%'`
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error :', err);
            result(null, err);
            return;
        }

        console.log('tutorials: ', res);
        result(null, res);
    });
};

// get all published tutorials
Tutorial.getAllPublished = result => {
    sql.query(`SELECT * FROM tutorials WHERE published=true`, (err, res)=>{
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('tutorials: ', res);
        result(null, res);
    });
}

// update by id
Tutorial.updateById = (id, tutorial, result) => {
    sql.query(
        "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.description, tutorial.published, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }     

            if (res.affectedRows == 0){
                // not found Tutorial with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log('updated tutorials: ', {id: id, ...tutorial});
            result(null, {id: id, ... tutorial});
        }
    );
};

// remove tutorial
Tutorial.remove = (id, result) => {
    sql.query('DELETE FROM tutorials WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // tutorial with specified id is not found
            result({ kind: 'not found'}, null);
            return;
        }

        console.log('deleted tutorial with id: ', id);
        result(null, res);
    });
};

// remove all tutorials
Tutorial


































