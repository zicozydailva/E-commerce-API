const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.status(403).json("Invalid Authentication");
  }
  try {
    const payload = isTokenValid({ token });
    req.user = {name: payload.name, userId: payload.userId, role: payload.role}
    console.log(payload);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  authenticateUser,
};
