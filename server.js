// server.js. Run this in terminal as 'node server' to build a server.
// listen to app request
var app = require('./app');
const router = require('./api');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/api', router); // access to request by adding /api
app.use(function(err, req, res, next) { // middlwares to handle error
    // console.log(err);                         // gather the whole object and present on console
    res.status(400).send({ error: err.message }); // put on a bad request status
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

// GET request, the / is the adress we need to be at to handle the request
// moreover, we can go to localhost:3000 website and this will appear on the screen
app.get('/', function(req, res) {
    console.log('GET request');
    res.send({ name: 'Yoshi' });
});


module.exports = router;