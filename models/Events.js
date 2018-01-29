// Headline model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the headlineSchema with our schema class
var eventsSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  eventSummary: {
    type: String,
    required: true
  },
  sourceUrl: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
  }
});

// Create the Events model using the eventsSchema
var Events = mongoose.model("Events", eventsSchema);

// Export the Events model
module.exports = Events;
