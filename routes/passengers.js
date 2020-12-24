const baseRoute = require("./base_router")
const baseController = require("../controllers/base.controller")
const orderController = require("../controllers/passengers.controller")
const router = baseRoute()

router.post("/seat", baseController(req => orderController.check(req)))

module.exports = router