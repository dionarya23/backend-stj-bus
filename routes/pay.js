const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const payController = require("../controllers/pay.controller");

const router = baseRoute();

router.post(
  "/",
  baseController((req) => payController.bankTransfer(req))
);

module.exports = router;
