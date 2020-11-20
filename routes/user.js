const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")
const authController = require("../controllers/auth.controller")

const router = baseRoute()

router.post("/login", baseController(req => authController.login(req)))
router.post("/register", baseController(req => authController.register(req)))
router.post("/check-email", baseController(req => authController.checkEmail(req)))
router.post("/resend-code-verif", baseController(req => authController.resendCodeVerif(req)))
router.post("/verif-account", baseController(req => authController.verifAccount(req)))
router.post("/reset-password", baseController(req => authController.resetPassword(req)))
router.post("/change-password", baseController(req => authController.changePassword(req)))
router.post("/auth-google", baseController(req => authController.authWithGoogle(req)))

module.exports = router