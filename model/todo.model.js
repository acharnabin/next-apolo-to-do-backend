const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  scheduleAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  index: {
    type: Number,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "deleted", "completed", "overdue"],
  },
  priority: {
    type: String,
    default: "low",
    enum: ["low", "medium", "high"],
  },
});

const todoModel = model("todo", todoSchema);
module.exports = todoModel;
