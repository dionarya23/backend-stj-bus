const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const statistikController = require("../controllers/statistik.controller");
const router = baseRoute();

router.get("/bulan/:bulan/:tahun", baseController(req => statistikController.getStatistikBulan(req)));

module.exports = router;