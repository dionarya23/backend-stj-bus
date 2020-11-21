const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")
const scheduleController = require("../controllers/schedule.controller")

const router = baseRoute()

router.get("/search", baseController(req => scheduleController.searchSchedule(req)))

module.exports = router