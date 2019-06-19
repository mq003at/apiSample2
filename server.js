// server.js. Run this in terminal as 'node server' to build a server.
// listen to app request
var app = require('./app');
// var fs = require('fs'); // File system to import another file to use it here
const router = require('./api');
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use('/api', router); // access to request by adding /api
app.use(function(err, req, res, next) { // middlwares to handle error
    // console.log(err);                         // gather the whole object and present on console
    res.status(400).send({ error: err.message }); // put on a bad request status
})

// http.createServer(onRequest).listen(port);
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
}); // confirmation if the server successfully on

// GET request, the / is the adress we need to be at to handle the request
// moreover, we can go to localhost:3000 website and this will appear on the screen

// routing(); 

module.exports = router;
// module.exports.routing = function() {                            //Rendering
//     app.get('/', function(req, res) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         // res.write('index.html'); // Write something on the screen whe you log on localhost:3000
//         fs.readFile('./sampleIndex.html', null, function(error, data) {
//             if (error) {
//                 res.writeHead(404);
//                 res.write('File not found!'); // Error handling
//             } else {
//                 res.write(data);
//             }
//             res.end();
//         });

//     });
// }