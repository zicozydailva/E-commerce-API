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

const authorizePermissions = (...role) => {
    // if(req.user.role !== "admin") {
    //     res.status(403).json("FORBIDDEN.. You're not authorized to access this route")
    // }
    // next()
    return (req, res, next) => {
        if(!role.includes(req.user.role)) {
             res.status(403).json("FORBIDDEN.. You're not authorized to access this route")
        }
        next()
    }
}

module.exports = {
  authenticateUser,
  authorizePermissions
};
