const router = require("express").Router();
const { userUpdateValidator } = require("../middlewares/validation");
const { getUserInfo, updateUserInfo } = require("../controllers/users");

router.get("/me", getUserInfo);
router.patch("/me", userUpdateValidator, updateUserInfo);

module.exports = router;
