/**
 * Created by michealin on 2/22/2017.
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true}
});
module.exports = mongoose.model('User', UserSchema);