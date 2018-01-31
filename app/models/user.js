// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email        : {type: String, required: true, unique: true},
        password     : {type: String, required: true}
    },
    profile : {
        firstName   : {type: String, default: 'Your', required: false},
        lastName    : {type: String, default: 'Name', required: false},
        userName    : {type: String, default: 'No-Username-Selected', required: false},
        urlProfilePic: {type: String, default: 'https://image.freepik.com/free-icon/profile-user-with-question-mark_318-41366.jpg', required: false}
        }
// schema below saved for future use
    // ,
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     name         : String,
    //     email        : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
