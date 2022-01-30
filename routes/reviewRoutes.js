const {
  createReview,
  updateReview,
  deleteReview,
  getAllReview,
  getSingleReview,
} = require("../controllers/reviewController");

const { authenticateUser } = require("../middleware/authentication");

const router = require("express").Router();

router.get("/", getAllReview);
router.post("/", authenticateUser, createReview);
router.get("/:id", getSingleReview);
router.patch("/:id", authenticateUser,  updateReview);
router.delete("/:id", authenticateUser, deleteReview);

module.exports = router;
