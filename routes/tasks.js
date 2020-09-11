const express = require("express");
const router = express.Router();
const { Task, validate } = require("../models/task");
const path = require("path");

if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.resolve("app/client/build")));

  router.get("*", (req, res) => {
    res.sendFile(path.resolve("app/client/build/index.html"));
  });
}

router.get("/data", (req, res) => {
  res.send({ data: "Hello world" });
});

router.post("/add", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const { task_name, task_description, creator, duration } = req.body;

  const task = new Task({
    task_name,
    task_description,
    creator,
    duration,
    expireAt: new Date() + duration,
  });

  await task.save();

  res.send("done");
});

router.get("/list", async (req, res) => {
  const data = await Task.find().select("-expireAt");
  if (data.length < 1) res.status(404).send("Data not found!");

  res.send(data);
});

module.exports = router;
