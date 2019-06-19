// db.js
// connect to mongodb
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/testDb1', { useNewUrlParser: true });
mongoose.Promise = global.Promise; // globalize mongoose
mongoose.set('useFindAndModify', false);

var connection = mongoose.connection;

// create db structure by using Schema
const dbSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'] // require user to type name, if not, send back an error to console as message property
    },
    phone: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address field is required']
    },
    webpage: {
        type: String
    },
    picture: {
        type: String
    },
    description: {
        type: String
    },
    openHours: {
        type: String,
    },
    mac: {
        type: String
    },
    note: {
        type: String,
        required: [false]
    },
    status: {
        type: String,
        required: [false]
    }

}, {
    collection: 'dbs'
});

// create db schema to extract beacon database
const dbSchema2 = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'] // require user to type name, if not, send back an error to console as message property
    },
    address: {
        type: String,
        required: [true, 'Address field is required']
    },
    description: {
        type: String
    },
    mac: {
        type: String,
        validate: [macLimit, '{PATH}\'s length of MAC should be 8 characters.']
    },
    status: {
        type: String,
        required: [false]
    }

}, {
    collection: 'beacon'
});

var UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate: [checkAt, 'Email is not correctly typed in.']
    },
    phone: {
        type: String,
        validate: [checkPhone, 'Phone is not correctly typed in.']
    },
    password: String
}, {
    collection: 'user'
});



connection.on('connected', function() {
    console.log('DB connected');
});

const Db = mongoose.model('db', dbSchema); // assign collection of db. When receives a request, save it to 'db'
const Beacon = mongoose.model('beacon', dbSchema2)
const User = mongoose.model('user', UserSchema);


// Validatation section. Put your requirement function here.
function macLimit(val) {
    return val.length = 12
}

function checkAt(val) {
    return (val.includes('@'))
}

function checkPhone(val) {
    return /^\d+$/.test(val); // regex check to make sure it only has numbers
}



module.exports = { Db, Beacon, User };