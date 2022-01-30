const Product = require("../models/Product");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(200).json(product);
};

const getAllProduct = async (req, res) => {
  const product = await Product.find({});
  res.status(200).json({ count: product.length, product });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  !product &&
    res.status(404).json(` product with ID: ${req.params.id} not found`);

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );
  !product &&
    res.status(404).json(` product with ID: ${req.params.id} not found`);

  res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  !product &&
    res.status(404).json(` product with ID: ${req.params.id} not found`);

    await product.remove()
    res.status(200).json("Successfully deleted product");
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
