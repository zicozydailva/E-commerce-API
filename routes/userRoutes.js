const { getAllUsers, getSingleUser, showCurrentUser, updateUserPassword, updateUser } = require("../controllers/userController");
const {authenticateUser, authorizePermissions} = require("../middleware/authentication")
const router = require("express").Router()


router.get("/",[authenticateUser, authorizePermissions("admin", "owner")], getAllUsers)
router.get("/showMe", showCurrentUser)
router.patch("/updateUser", updateUser)
router.patch("/updateUserPassword", updateUserPassword)

router.get("/:id", getSingleUser)

module.exports = router;