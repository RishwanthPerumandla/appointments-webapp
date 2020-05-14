const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  person: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  responses: {
    type: Boolean,
    default: undefined,
  },
});

const FormData = mongoose.model("FormData", FormSchema);
module.exports = FormData;
