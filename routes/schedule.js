const baseRoute = require("./base_router")

const baseController = require("../controllers/base.controller")
const scheduleController = require("../controllers/schedule.controller")

const driverMidlleware = require("../middleware/authSupir.middleware")

const router = baseRoute()

router.get("/search", baseController(req => scheduleController.searchSchedule(req)))

router.get("/list", baseController(() => scheduleController.listSchedule()))

router.post("/accept", driverMidlleware, baseController((req) => scheduleController.acceptSchedule(req)));

module.exports = router