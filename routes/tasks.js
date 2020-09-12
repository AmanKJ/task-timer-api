const express = require("express");
const router = express.Router();
const { Task, validate } = require("../models/task");
const path = require("path");

let cronJobs = [];

if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.resolve("client/build")));

  router.get("/", (req, res) => {
    res.sendFile(path.resolve("client/build/index.html"));
  });
}

router.post("/add", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const { task_name, task_description, creator, duration } = req.body;

  const task = new Task({
    task_name,
    task_description,
    creator,
    duration,
  });

  await task.save();

  try {
    res.send("Done.");
    scheduleCron(duration, task._doc._id);
  } catch (ex) {
    console.log(ex);
  }
});

const scheduleCron = (duration, _id) => {
  cronJobs.push({ _id, duration });

  const interval = setInterval(() => {
    if (cronJobs.length > 0) {
      const index = cronJobs.findIndex((v) => v._id === _id);
      try {
        if (cronJobs[index].duration > 0) {
          cronJobs[index].duration = cronJobs[index].duration - 1;
        } else {
          cronJobs = cronJobs.filter((v) => v._id != _id);
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    console.log(cronJobs);
  }, 950);

  setTimeout(async () => {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) console.log("Failed");
    console.log("Deleted!");
    clearInterval(interval);
  }, duration * 1050);
};

router.get("/timer", async (req, res) => {
  res.send(cronJobs);
});

router.get("/list", async (req, res) => {
  const data = await Task.find();
  data.length === 0 ? res.status(404).send([]) : res.send(data);
});

module.exports = router;
