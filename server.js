const express = require("express");
require("dotenv").config();
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

// const db = require('./config/database')

// db.sync({
//     forced: true,
//     sync: true
// }).then(() => console.log(`db connected`));

/**
 * Routes
 */
const INDEX = require("./routes/index");
const USER = require("./routes/user");
const ORDER = require("./routes/order");
const BIS = require("./routes/bis");
const SCHEDULE = require("./routes/schedule");
const PAYMENT_TYPE = require("./routes/payment_type");
const WEBHOOK = require("./routes/webhook");
const PLACE = require("./routes/place");
const PASSENGERS = require("./routes/passengers");
const DRIVER = require("./routes/driver_bus");
const STATISTIK = require("./routes/statistik");
const SUKUCADANG = require("./routes/suku_cadang");
const BENGKEL = require("./routes/bengkel");
const STOCKBENGKEL = require("./routes/stock_bengkel");
const REPORTSERVICE = require("./routes/report_service")
const PERMINTAAN = require("./routes/permintaan_suku_cadang");
// const PAY = require("./routes/pay");
// const CHECKOUT = require("./routes/checkout");

const authAdmin = require("./middleware/authAdmin.middleware");

app.use(cors());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(compression());
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/", INDEX);
app.use("/api/v1/user", USER);
app.use("/api/v1/order", ORDER);
app.use("/api/v1/bis", BIS);
app.use("/api/v1/schedule", SCHEDULE);
app.use("/api/v1/payment-type", PAYMENT_TYPE);
app.use("/api/v1/webhook", WEBHOOK);
app.use("/api/v1/place", PLACE);
app.use("/api/v1/passengers", PASSENGERS);
app.use("/api/v1/driver", DRIVER);
app.use("/api/v1/statistik", STATISTIK);
app.use("/api/v1/suku-cadang", authAdmin, SUKUCADANG);
app.use("/api/v1/bengkel", BENGKEL);
app.use("/api/v1/stock-bengkel", STOCKBENGKEL);
app.use("/api/v1/report-service", REPORTSERVICE);
app.use("/api/v1/pemintaan-suku-cadang", PERMINTAAN);
// app.use("/api/v1/pay", PAY);
// app.use("/api/v1/checkout", CHECKOUT);

// const sukuCadangRepository = require("./repositories/suku_cadang.repository")

// app.get("/try", async (req, res) => {
//   try {
//     const sukuCadang = await sukuCadangRepository.getById(3);
//     res.status(200).json({
//       status: 200,
//       message: "success",
//       data : sukuCadang === null
//     })

//   }catch(err) {
//     res.status(500).json({
//       status: 500,
//       message: "Internal Server Error"
//     })
//   }
// });

app.use(
  "/assets/images/driver",
  express.static(path.join(__dirname, "assets/images/driver"))
);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App running on port ${process.env.PORT || 3000}`)
);
