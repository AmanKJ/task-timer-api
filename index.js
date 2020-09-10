const app = require("express")();
const config = require("config");

require("./loaders/db")();
require("./loaders/routes")(app);

const port = config.get("PORT") || 3000;
app.listen(port, () => console.log(`Server listening at port:${port}`));
