const mongoose = require("mongoose");
const { DB_NAME, DB_PASS } = require("../config/keys");

const url = `mongodb+srv://root:${DB_PASS}@cluster0-3uyjw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected"))
    .catch((ex) => console.log(ex));
};
