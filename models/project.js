
/** Task Schema  **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schema

var projectSchema = new Schema({
   name      : String,
   owner     : String,
});

module.exports = mongoose.model('Project', projectSchema);
