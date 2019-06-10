// we can use robo3T to have a visual view of our database, easy ID management

const express = require('express');
const router = express.Router();
const Db = require('./db.js');
let result;


// get a list of beacon from db
router.get('/beacon/:id', function(req, res, next) {
    Db.findOne({ _id: req.params.id }).then(function(db) { // get the id from request to find the specific database
        res.send(db);
        result = db;
    });
});

// add something to db
router.post('/beacon', function(req, res, next) {
    // var db = new Db(req.body); // create an instance using schema and user request
    // db.save();                  // save it to db
    Db.create(req.body).then(function(db) { //save db then create an obj base on what user sent
        // res.send({                                      // When send back to the user, we send as a request as well

        //     type: 'POST',
        //     name: req.body.name,
        //     store: req.body.store
        db["note"] = 'Please remember your ID.'; // since db is an object, we can add properties here. This doesnt affect our database
        res.send(db);
        result = db;
    }).catch(next);

}); // Please remember there is semicolon here. Stupid VS code

// update something in the db
router.put('/beacon/:id', function(req, res, next) {
    Db.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(dbo) {
        Db.findOne({ _id: req.params.id }).then(function(dbu) {
            dbu["note"] = 'This item has been updated from the database.';
            dbu["status"] = 'updated';
            dbo["status"] = 'outdated'
            res.send(dbu + ";\n" + dbo);
            result = dbu;

        });
    });
});

// delete something from the db
router.delete('/beacon/:id', function(req, res, next) {
    Db.findByIdAndDelete({ _id: req.params.id }).then(function(db) {
        db["note"] = 'This item has been deleted from the database.';
        res.send(db);
        result = db;
    });

});

// making router as global var
module.exports = router; // why we cant .exports.router = router ???
module.exports.result = result;