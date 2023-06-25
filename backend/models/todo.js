// const mongoose = require("mongoose");
import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
  },
});

mongoose.model("Todo", todoSchema);

export default mongoose.model('Todo', todoSchema);