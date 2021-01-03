const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const statistikController = require("../controllers/statistik.controller");
const router = baseRoute();
const authAdminMiddleware = require("../middleware/authAdmin.middleware");

router.get("/bulan/:bulan/:tahun", authAdminMiddleware, baseController(req => statistikController.getStatistikBulan(req)));

module.exports = router;