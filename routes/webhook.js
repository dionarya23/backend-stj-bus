const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const webhookController = require("../controllers/webhook.controller");

const router = baseRoute();

router.post(
  "/",
  baseController((req) => webhookController.postResponse(req))
);

module.exports = router;
