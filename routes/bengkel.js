const baseRoute = require("./base_router");

const baseController = require("../controllers/base.controller");

const bengkelController = require("../controllers/bengkel.controller");

const router = baseRoute();

router.get(
  "/",
  baseController(() => bengkelController.getAll())
);

router.get(
  "/:id_bengkel",
  baseController((req) => bengkelController.getBengkelById(req))
);

router.post(
  "/",
  baseController((req) => bengkelController.insertBengkel(req))
);

router.put(
  "/:id_bengkel",
  baseController((req) => bengkelController.updateBengkel(req))
);

router.delete(
  "/:id_bengkel",
  baseController((req) => bengkelController.deleteBengkel(req))
);

module.exports = router;
