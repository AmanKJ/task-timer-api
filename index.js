const app = require("express")();
const { PORT } = require("./config/keys");

require("./loaders/db")();
require("./loaders/routes")(app);

const port = app.listen(port, () => console.log(`Server listening at port:${port}`));
