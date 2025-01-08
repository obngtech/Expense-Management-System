const jwt = require("jsonwebtoken");
const { User } = require("../Models");
const APIresponse = require("../utils/apiResponse");
const { MESSAGES } = require("../utils/constant");
const APIerror = require("../utils/apiError");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new APIerror(MESSAGES.UNAUTHORIZED, 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return next(new APIerror(MESSAGES.USER_NOT_FOUND, 401));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return next(new APIerror(MESSAGES.UNAUTHORIZED, 401));
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(new APIerror(MESSAGES.FORBIDDEN, 403));
    }
    next();
  };
};

module.exports = { authMiddleware, checkRole };
