const User = require("../models/User");
const { createTokenuser, attachCookiesToRes } = require("../utils");

const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password");
  // NOTE: the "select()" mongoose method was used to remove the password in this case
  res.status(200).json(user);
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  !user && res.status(404).json(`No user with Id: ${req.params.id}`);

  res.status(200).json(user);
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    res.status(401).json("name and email fields are required");
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );
  !user && res.status(404).json("User not found");

  const tokenUser = createTokenuser(user);
  attachCookiesToRes({ res, user: tokenUser });
  res.status(200).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    res.status(401).json("Please Provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  !isPasswordCorrect &&
    res.status(403).json("Invalid Login Credentails...wrong password");

  user.password = newPassword;

  await user.save();
  res.status(200).json({ msg: "password updated successfully!!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  showCurrentUser,
  updateUserPassword,
};
