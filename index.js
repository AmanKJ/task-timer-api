const app = require("express")();
const { PORT } = require("./config/keys");

require("./loaders/db")();
require("./loaders/routes")(app);

const port = PORT || 5000;

app.listen(port, () => console.log(`Server listening at port:${port}`));
