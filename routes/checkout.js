const baseRoute = require("./base_router")
const baseController = require("../controllers/base.controller")

const checkoutController = require("../controllers/checkout.controller")

const router = baseRoute()

router.post("/test", baseController(req => checkoutController.test(req)))

module.exports = router