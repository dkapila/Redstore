
/** Task Schema  **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Schema

//role 1 = admin, role 2 = user

var accountSchema = new Schema({
   name    : String,
   password: String,
   role    : Number,
});


module.exports = mongoose.model('account', accountSchema);
