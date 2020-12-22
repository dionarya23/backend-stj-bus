const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")

const placeController = require("../controllers/place.controller")

const router = baseRoute()

router.get("/", baseController(() => placeController.getListPlace()));
router.post("/", baseController(req => placeController.creaetPlace(req)));

module.exports = router;