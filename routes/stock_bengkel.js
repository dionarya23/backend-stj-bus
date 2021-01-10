const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");

const stockBengkelController = require("../controllers/stockBengkel.controller");

const router = baseRoute();

router.post("/", baseController(req => stockBengkelController.createStock(req)));
router.put("/", baseController(req => stockBengkelController.updateStockSukuCadang(req)));
router.get("/bengkel/:id_bengkel", baseController(req => stockBengkelController.getStockByIdBengkel(req)));

module.exports = router