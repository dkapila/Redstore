
/** Task Schema  **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schema

var repositorySchema = new Schema({
   user      : String,
   name      : String,
});

module.exports = mongoose.model('Repository', repositorySchema);
