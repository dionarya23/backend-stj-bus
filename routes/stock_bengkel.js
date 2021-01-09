const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");

const stockBengkelController = require("../controllers/stockBengkel.controller");

const router = baseRoute();

router.post("/", baseController(req => stockBengkelController.createStock(req)));

module.exports = router