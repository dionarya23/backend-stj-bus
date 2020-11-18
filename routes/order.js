const baseRoute = require("./base_router")
const baseController = require("../controllers/base.controller")
const orderController = require("../controllers/order.controller")
const router = baseRoute()

router.post("/create", baseController(req => orderController.creaetOrder(req)))

module.exports = router