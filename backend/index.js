const express = require("express");
const dotenv = require("dotenv");
const cartRoute = require("./routes/cartRoutes.js");
const connectDatabase = require("./config/database.js");
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use("/store", cartRoute);

app.listen(port, () => {
  connectDatabase();
  console.log(`Server connected to http://localhost:${port}`);
});
