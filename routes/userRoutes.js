const { getAllUsers, getSingleUser, showCurrentUser, updateUserPassword, updateUser } = require("../controllers/userController");

const router = require("express").Router()

router.get("/", getAllUsers)
router.get("/showMe", showCurrentUser)
router.patch("/updateUser", updateUser)
router.patch("/updateUserPassword", updateUserPassword)

router.get("/:id", getSingleUser)

module.exports = router;