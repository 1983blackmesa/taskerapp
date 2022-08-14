const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    // email
    // id
    user: { type: mongoose.SchemaTypes.ObjectId },
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

// Model
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
