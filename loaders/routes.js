const express = require("express");
const bodyParser = require("body-parser");
const Tasks = require("../routes/tasks");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/", Tasks);
};
