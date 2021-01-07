const baseRoute = require("./base_router");
const baseController = require("../controllers/base.controller");
const sukuCadangController = require("../controllers/suku_cadang.controller");
const router = baseRoute()

router.get("/", baseController(() => sukuCadangController.getAllSukuCadang()));
router.get("/:id_suku_cadang", baseController(req => sukuCadangController.getBySukuCadangById(req)));
router.post("/", baseController(req => sukuCadangController.insertSukuCadang(req)));
router.put("/:id_suku_cadang", baseController(req => sukuCadangController.updateSukuCadang(req)));
router.delete("/:id_suku_cadang", baseController(req => sukuCadangController.deleteSukuCadang(req)));

module.exports = router