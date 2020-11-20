const baseRoute = require("./base_router");

const baseController = require("../controllers/base.controller");
const bisController = require("../controllers/bis.controller");
const router = baseRoute();
const authAdminMiddleware = require("../middleware/authAdmin.middleware");

router.post(
  "/new",
  authAdminMiddleware,
  baseController((req) => bisController.createNewBis(req))
);
router.put(
  "/update/:bis_id",
  authAdminMiddleware,
  baseController((req) => bisController.updateBis(req))
);
router.delete(
  "/delete/:bis_id",
  authAdminMiddleware,
  baseController((req) => bisController.deleteBis(req))
);
router.get(
  "/id/:bis_id",
  authAdminMiddleware,
  baseController((req) => bisController.getOneBis(req))
);
router.get(
  "/",
  authAdminMiddleware,
  baseController(() => bisController.getAllBis())
);

module.exports = router;
