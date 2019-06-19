// app.js
// setup express app
var express = require('express');
var app = express();
var routing = require('./server');
var fs = require('fs');


// Routing the user
function renderHTML(path, res) {
    {
        // res.write('index.html'); // Write something on the screen whe you log on localhost:3000
        fs.readFile(path, null, function(error, data) {
            if (error) {
                res.writeHead(404);
                res.write('File not found!'); // Error handling
            } else {
                res.write(data);
            }
            res.end();
        });

    };
};

app.get('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text' });
    renderHTML('./sampleIndex.html', res) //call the rendering
});

app.get('/login', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text' });
    renderHTML('./login.html', res)
})

// If you want to route user to somewhere else, add another app.get here. However,
// it would be best if we make a function getting the GET URL from user input, then
// call that function and pass it to app.get. 

// make app object visible to the rest of program
module.exports = app;