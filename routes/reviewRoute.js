const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { getAllUsers, getSingleUser } = require("../controllers/userController");

const { authenticateUser } = require("../middleware/authentication");

const router = require("express").Router();

router.get("/", getAllUsers);
router.post("/", authenticateUser, createReview);
router.get("/:id", getSingleUser);
router.patch("/:id", authenticateUser,  updateReview);
router.delete("/:id", authenticateUser, deleteReview);

module.exports = router;
