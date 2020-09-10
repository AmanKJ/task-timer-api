const bodyParser = require("body-parser");
const Tasks = require("../routes/tasks");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use("/", Tasks);
};
