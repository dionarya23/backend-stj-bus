const baseRoute = require("./base_router");

const baseController = require("../controllers/base.controller");
const reportServieController = require("../controllers/reportService.controller");

const router = baseRoute();

const authMechanic = require("../middleware/authMekanik.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

router.get(
  "/bengkel/:id_bengkel",
  authMechanic,
  baseController((req) =>
    reportServieController.getReportServiceByBengkelId(req)
  )
);

router.get(
  "/:id_report_service",
  authMechanic,
  baseController((req) => reportServieController.getOneReport(req))
);

router.post(
  "/",
  authMechanic,
  baseController((req) => reportServieController.createReport(req))
);

router.put(
  "/:id_report_service",
  authMechanic,
  baseController((req) => reportServieController.updateReport(req))
);

router.delete(
  "/:id_report_service",
  authMechanic,
  baseController((req) => reportServieController.deleteReport(req))
);

router.get(
  "/",
  authAdmin,
  baseController((req) => reportServieController.getAllReport())
);

module.exports = router;
