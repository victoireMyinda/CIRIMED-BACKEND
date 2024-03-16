const router = require("express").Router();
const formationController = require("../controllers/formation");
const upload = require('../middlewares/upload');

router.get("/", formationController.getAll);
router.post("/", upload, formationController.create);

router.get("/:id", formationController.getById);
router.put("/:id", upload, formationController.update);
router.delete("/:id", formationController.destroy);

module.exports = router;