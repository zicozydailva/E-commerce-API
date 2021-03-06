const Review = require("../models/Reviews")
const Product = require("../models/Product")
const { checkPermissions } = require("../utils");


const createReview = async (req, res) => {
  const {product: productId} = req.body;

  const isValidProduct = await Product.findOne({_id: productId})

  if(!isValidProduct) {
    res.status(404).json("No product found")
  }

  const alreadySumitted = await Review.findOne({
    product: productId,
    user: req.user.userId
  })

  if(alreadySumitted) {
    res.status(401).json("Bad Request..Already submiited review for this product")
  }

  req.body.user = req.user.userId
  const review = await Review.create(req.body)

  res.status(200).json(review)
};

const getAllReview = async (req, res) => {
  const reviews = await Review.find({})
  res.status(200).json({count: reviews.length, reviews})
};

const getSingleReview =  async (req, res) => {
  const review = await Review.findOne({_id: req.params.id})
  !review && res.status(404).json(`review id: ${id} not found`)
  res.status(200).json(review)
};

const updateReview = async (req, res) => {
  const {rating, title, comment} = req.body;
  const review = await Review.findOne({_id: req.params.id})
  !review && res.status(404).json(`Review id: ${req.params.id} not found`)

  checkPermissions(req.user, review.user)
  review.rating = rating
  review.title = title
  review.comment = comment

  await review.save();

  res.status(200).json(review)

};

const deleteReview = async (req, res) => {
  const review = await Review.findOne({_id: req.params.id})
  !review && res.status(404).json(`Review id: ${req.params.id} not found`)

  checkPermissions(req.user, review.user)
  await review.remove()

  res.status(200).json(`Successfully deleted review: ${req.params.id}`)
};

module.exports = {
  getAllReview,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
