var express = require('express');
var app = express();
var fs = require('fs');
const router = express.Router();
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bodyParser = require('body-parser');

const Db = require('./db.js');
const Beacon = require('./db.js');
const User = require('./user.js');

module.exports = {
    express,
    app,
    fs,
    router,
    Schema,
    bodyParser,
    Db,
    Beacon,
    User

}