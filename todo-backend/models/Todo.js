const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
// This code defines a Mongoose schema and model for a 
// Todo item. The TodoSchema has a single field, 'text', 
// which is a required string. The model is then exported for use in other parts of the application.
// The schema also includes timestamps, which automatically adds 'createdAt' and 'updatedAt' fields to the documents.