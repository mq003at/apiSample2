// we can use robo3T to have a visual view of our database, easy ID management

const express = require('express');
const router = express.Router();
const { Db, Beacon, User } = require('./db.js');


// get a list of beacon from db 
router.get('/data/:mac', function(req, res, next) {
    Db.findOne({ mac: (req.params.mac).toUpperCase() }).then(function(db) { // get the mac from request to find the specific database
        res.send(db);
    });
});

// add something to db
router.post('/data/', function(req, res, next) {
    // var db = new Db(req.body); // create an instance using schema and user request
    // db.save();                  // save it to db
    Db.create(req.body).then(function(db) { //save db then create an obj base on what user sent
        // res.send({                                      // When send back to the user, we send as a request as well

        //     type: 'POST',
        //     name: req.body.name,
        //     store: req.body.store
        db["note"] = 'Please remember your ID.'; // since db is an object, we can add properties here. This doesnt affect our database
        res.send(db);
    }).catch(next);

}); // Please remember there is semicolon here. Stupid VS code

// update something in the db
router.put('/data/:id', function(req, res, next) {
    Db.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(dbo) { // this is the update syntax
        Db.findOne({ _id: req.params.id }).then(function(dbu) { // this is our api retrieving the updated data to show them to user
            dbu["note"] = 'This item has been updated from the database.';
            dbu["status"] = 'updated';
            dbo["status"] = 'outdated'
            res.json(dbu + ";\n" + dbo);
        });
    });
});

// delete something from the db
router.delete('/data/:id', function(req, res, next) {
    Db.findByIdAndDelete({ _id: req.params.id }).then(function(db) {
        db["note"] = 'This item has been deleted from the database.';
        res.send(db);
    });

});

// routing for the beacon collection
router.get('/beacon', function(req, res, next) {
    Beacon.find({}, function(err, beacon) {
        if (err) {
            res.send('Something is very wrong here. Contact the devs for more infos.')
            next();
        }
        res.json(beacon);
    })
})

// routing for user collection
router.get('/user/:name', function(req, res, next) {
    User.findOne({ name: req.params.name }).then(function(user) { // get the mac from request to find the specific database
        res.send(user);
    });
});

// making router as global var
module.exports = router;