const router = require("express").Router();
const { getAllProduct, getSingleProduct, createProduct, deleteProduct, updateProduct, uploadImage } = require("../controllers/productController");
const {authenticateUser, authorizePermissions} = require("../middleware/authentication")

router.get("/", getAllProduct)

router.post("/", [authenticateUser, authorizePermissions("admin")], createProduct)

router.post("/uploadImage", [authenticateUser, authorizePermissions("admin")], uploadImage)

router.patch("/:id",[authenticateUser, authorizePermissions("admin")], updateProduct)

router.delete("/:id",[authenticateUser, authorizePermissions('admin')], deleteProduct)

router.get("/:id", getSingleProduct)

module.exports = router;