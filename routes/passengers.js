const baseRoute = require("./base_router")
const baseController = require("../controllers/base.controller")
const orderController = require("../controllers/passengers.controller")
const router = baseRoute()

// const driverAuthMiddleware = require("../middleware/authSupir.middleware")

router.post("/seat", baseController(req => orderController.check(req)))
router.get("/check/:order_id", baseController(req => orderController.checkPassenger(req)));

module.exports = router