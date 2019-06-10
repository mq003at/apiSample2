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
    name:  {
        type: String,
        required: [true, 'Name field is required'] // require user to type name, if not, send back an error to console as message property
    },
    store: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        required: [false]
    },
    status: {
        type: String,
        required: [false]
    }
    
});


connection.on('connected', function () {
    console.log('DB connected');
});

const Db = mongoose.model('db', dbSchema);        // assign collection of db. When receives a request, save it to 'db'

module.exports = Db;

