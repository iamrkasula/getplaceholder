var express = require("express");
var controller = require("../controllers/users");
var validator = require("../validators/users");
var router = express.Router();

router.get("/", controller.users_list_get);
router.get("/:id", controller.user_detail_post);
router.post(
	"/",
	validator.validate("user_create_post"),
	controller.user_create_post
);
router.patch("/:id", controller.user_update_patch);
router.delete("/:id", controller.user_drop_delete);

module.exports = router;
