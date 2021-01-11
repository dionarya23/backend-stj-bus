const baseRoute = require("./base_router");

const baseController = require("../controllers/base.controller");
const reportServieController = require("../controllers/reportService.controller");

const router = baseRoute();

router.post(
  "/",
  baseController((req) => reportServieController.createReport(req))
);

module.exports = router;
