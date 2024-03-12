const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const upload = require('../middlewares/upload');

router.get("/", usersController.getAll);
router.post("/", upload, usersController.create);
router.post("/authentification", usersController.login);

router.get("/:id", usersController.getById);
router.put("/:id", upload, usersController.update);
router.delete("/:id", usersController.destroy);

router.post("/authentification/google", usersController.loginWidthGoogle);

router.patch("/modif-password/:id", usersController.updatePassword);
router.patch("/modif-photo-profile/:id", upload, usersController.modifPhotoProfile);


module.exports = router;