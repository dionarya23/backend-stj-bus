const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")
const authController = require("../controllers/auth.controller")

const router = baseRoute()

router.post("/login", baseController(req => authController.login(req)))
router.post("/register", baseController(req => authController.register(req)))
router.post("/check-email", baseController(req => authController(req)))

module.exports = router