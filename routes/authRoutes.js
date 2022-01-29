const { register, login, logout } = require("../controllers/AuthContoller")

const router = require("express").Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router;