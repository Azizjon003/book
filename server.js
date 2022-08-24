const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cli = require("cli-color");
const app = require("./middleware/app");

const PORT = process.env.PORT || 8000;
require("./model");
app.listen(PORT, () => {
  console.log(cli.blue(`port litening ${PORT}`));
});
