const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// our schema
const RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'name is taken'],
    required: [true, 'please enter a song name'],
    minlength: [3, 'song name must be at least 3 characters']
  },
  album: {
    type: String,
    unique: [true, 'name is taken'],
    required: [true, 'please enter an album name'],
    minlength: [3, 'album name should be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'please enter a description'],
    minlength: [6, 'record description must be at least 6 characters']
  },
  sales: {
    type: Number,
    required: [true, 'enter sales'],
    min: [0, 'sorry, sales need to be greater than 0']
  },
  isOwned: Boolean,
  image: {
    type: String,
  },
  genres: {
    type: mongoose.Schema.Types.Mixed,
    default: ["", "", ""]
  },
  review: {
    type: String,
  },
}, { timestamps: true });

// export and set product  to a model which take the name of the schema and schema itself as args
RecordSchema.plugin(uniqueValidator);
module.exports.Record = mongoose.model("Record", RecordSchema)