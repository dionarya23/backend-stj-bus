const baseRoute = require("./base_router");

const baseController = require("../controllers/base.controller");
const PermintaanSukuCadangController = require("../controllers/permintaan_suku_cadang.controller")
const router = baseRoute();

const mekanikAuth = require("../middleware/authMekanik.middleware");

router.post("/create", mekanikAuth, baseController(req => PermintaanSukuCadangController.createPermintaan(req)));
router.put("/konfirmasi/:/:id_permintaan_suku_cadang", baseController(req => PermintaanSukuCadangController.updatePermintaan(req)));

module.exports = router