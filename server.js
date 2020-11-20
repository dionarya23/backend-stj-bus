const express = require("express");
require("dotenv").config();

const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const cors = require("cors");

// const db = require('./config/database')

// db.sync({
//     forced: true,
//     sync: true
// }).then(() => console.log(`db connected`));

/**
 * Routes
 */
const INDEX = require("./routes/index");
const CHECKOUT = require("./routes/checkout");
const USER = require("./routes/user");
const ORDER = require("./routes/order");
const BIS = require("./routes/bis");

app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/", INDEX);
app.use("/api/v1/user", USER);
app.use("/api/v1/checkout", CHECKOUT);
app.use("/api/v1/order", ORDER);
app.use("/api/v1/bis", BIS);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App running on port ${process.env.PORT || 3000}`)
);
