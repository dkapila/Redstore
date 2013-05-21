
/** Task Schema  **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schema

var serviceSchema = new Schema({
   user      : String,
   name      : String,
   description : String,
   enabled : Boolean
});

module.exports = mongoose.model('Service', serviceSchema);
