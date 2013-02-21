
/** Task Schema  **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schema

var projectSchema = new Schema({
   user      : String,
   name      : String,
});

module.exports = mongoose.model('Project', projectSchema);
