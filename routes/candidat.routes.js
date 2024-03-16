const router = require("express").Router();
const candidatController = require("../controllers/candidat");
const upload = require('../middlewares/upload');

router.get("/", candidatController.getAll);
router.post("/", upload, candidatController.create);

router.get("/:id", candidatController.getById);
router.put("/:id", upload, candidatController.update);
router.delete("/:id", candidatController.destroy);

module.exports = router;