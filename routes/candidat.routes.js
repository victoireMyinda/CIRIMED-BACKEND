const router = require("express").Router();
const candidatController = require("../controllers/candidat");
const upload = require('../middlewares/upload');

router.post("/", upload, candidatController.create);
router.post("/delete", candidatController.destroy);

module.exports = router;