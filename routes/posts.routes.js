const router = require("express").Router();
const postController = require("../controllers/posts.controller");
const upload = require('../middlewares/upload');

router.get("/", postController.getAll);
router.post("/", upload, postController.create);

router.get("/:id", postController.getById);
router.put("/:id", upload, postController.update);
router.delete("/:id", postController.destroy);

module.exports = router;