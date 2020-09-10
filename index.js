const app = require("express")();
const config = require("config");

require("./loaders/db")();
require("./loaders/routes")(app);

const port = config.get("PORT") || process.env.PORT;
app.listen(port, () => console.log(`Server listening at port:${port}`));
