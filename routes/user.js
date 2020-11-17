const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")
const authController = require("../controllers/auth.controller")

const router = baseRoute()

router.post("/login", baseController(req => authController.login(req)))
router.post("/register", baseController(req => authController.register(req)))
router.post("/check-email", baseController(req => authController(req)))
router.post("/resend-code-verif", baseController(req => authController.resendCodeVerif(req)))
router.post("/verif-account", baseController(req => authController.verifAccount(req)))

module.exports = router