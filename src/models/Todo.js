const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const todoSchema = Schema({
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  is_completed: {
    type: Boolean,
    required: true,
    default: false
  },
  updated_at: {
    type: Date
  },
  finished_at: Date
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
