require("dotenv").config();

const connectwithDB = require("./config/db");
const app = require("./app");
const cors = require("cors");

app.use(cors());

//connect MongoDB
connectwithDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
