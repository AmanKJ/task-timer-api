const mongoose = require("mongoose");
const joi = require("joi");

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  task_description: {
    type: String,
    minlength: 5,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expireAt: {
    type: Date,
  },
});

taskSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const task = mongoose.model("Task", taskSchema);

const validateTask = (task) => {
  const schema = joi.object({
    task_name: joi.string().min(5).max(50).required(),
    task_description: joi.string().min(5).max(50).required(),
    creator: joi.string().min(5).max(50).required(),
    duration: joi.number().required(),
    createdAt: joi.date(),
  });

  return schema.validate(task);
};

module.exports = {
  Task: task,
  validate: validateTask,
};
