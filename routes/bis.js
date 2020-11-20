const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")
const bisController = require("../controllers/bis.controller")
const router = baseRoute()


router.post("/new", baseController(req => baseController.createNewBis(req)))
router.put("/update/:id", baseController(req => bisController.updateBis(req)))

module.exports = router