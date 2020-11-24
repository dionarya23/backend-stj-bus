const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const paymentTypeController = require("../controllers/payment_type.controller");

const router = baseRoute();

router.get("/", baseController(() => paymentTypeController.getListPaymentType()))

module.exports = router