// models/track.js

const mongoose = require("mongoose")

const trackSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
})

// models/track.js
const Track = mongoose.model("Track", trackSchema)
// models/track.js

module.exports = Track
