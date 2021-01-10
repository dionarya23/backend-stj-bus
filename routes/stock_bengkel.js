const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");

const stockBengkelController = require("../controllers/stockBengkel.controller");

const router = baseRoute();
const adminMiddleware = require("../middleware/authAdmin.middleware");
const mekanikMiddleware = require("../middleware/authMekanik.middleware");

router.post(
  "/",
  adminMiddleware,
  baseController((req) => stockBengkelController.createStock(req))
);
router.put(
  "/",
  adminMiddleware,
  baseController((req) => stockBengkelController.updateStockSukuCadang(req))
);
router.get(
  "/bengkel/:id_bengkel",
  mekanikMiddleware,
  baseController((req) => stockBengkelController.getStockByIdBengkel(req))
);

module.exports = router;
