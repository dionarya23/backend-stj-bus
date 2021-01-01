const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const DriverController = require("../controllers/driver.controller");
const router = baseRoute();

router.post(
  "/upload-photo",
  baseController((req) => DriverController.uploadPhoto(req))
);

module.exports = router;
