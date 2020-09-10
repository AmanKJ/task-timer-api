const app = require("express")();
const { PORT } = require("./config/keys");

require("./loaders/db")();
require("./loaders/routes")(app);

app.listen(PORT, () => console.log(`Server listening at port:${PORT}`));
