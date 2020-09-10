const mongoose = require("mongoose");
const config = require("config");

const db_name = config.get("Secrets.db_name") || process.env.DB_NAME;
const db_pass = config.get("Secrets.db_pass") || process.env.DB_PASS;
const url = `mongodb+srv://root:${db_pass}@cluster0-3uyjw.mongodb.net/${db_name}?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected"))
    .catch((ex) => console.log(ex));
};
