var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var UserSchema = new Schema({
  userHandle: {timestamp: true, type: String, unique: true, required: true},
  // **SHOULD BE REMOVED WHEN USER AUTH ENABLED** placeholder for password info
  userPassword: {type: String, trim: true, required: true},

  userFirstName: {type: String, required: true},
  userLastName: {type: String, required: true},
  userBirthday: {type: Date, default: null},
  userGender: {type: String, enum: ["Male", "Female", "Transgender", "Non-Conforming", "Prefer not to Answer"], default: "Prefer not to Answer"},

// Eventually want to create an array for emails
  userEmailH: {type: String},
  userEmailW: {type: String},
// Eventually want to create an array for phone #s
  userPhoneH: {type: String},
  userPhoneM: {type: String},
  userPhoneW: {type: String},
// Eventually want to create an array for addresses
  userAddressH: {type: String},
  userAddressW: {type: String},
  userTwitter: {type: String},
  userURL: {type: String},
  userFacebook: {type: String},
  userHideProfile: {type: Boolean, default: true},
  userIsConsumer: {type: Boolean, default: true},
  userIsCreator: {type: Boolean, default: false},
  userIsCurator: {type: Boolean, default: false},
  userBetaInterest: {type: Boolean, default: false},
  userNotes: {type: String},
  userFaves: {type: String},
  userInterests: {type: String},
// url links for now, eventually want to consolidate into array of objects that hold images
  userProfilePicURL: {type: String},
  userGalleryPicURL1: {type: String},
  userGalleryPicURL2: {type: String},
  userGalleryPicURL3: {type: String},
  userGalleryPicURL4: {type: String},

  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the User with any associated Notes
  notes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Note"
    }
  ]
}, { timestamps: { createdAt: 'created_at' }});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
