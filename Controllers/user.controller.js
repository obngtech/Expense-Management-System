const { registerSchema, loginSchema } = require("../Validations/userSchema");
const APIerror = require("../utils/apiError");
const { MESSAGES } = require("../utils/constant");
const APIresponse = require("../utils/apiResponse");
const { User } = require("../Models");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(new APIerror(error.message, 400));
  }

  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return next(new APIerror(MESSAGES.USER_EXIST, 409));
    }

    const newUser = new User(req.body);
    await newUser.save();

    return APIresponse(res, 201, MESSAGES.SIGNUP_SUCCESSFUL);
  } catch (error) {
    console.log("singup error: ", error);
    next(new APIerror(MESSAGES.SIGNUP_ERROR));
  }
};

const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new APIerror(error.message, 400));
  }

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(new APIerror(MESSAGES.INVALID_USERNAME, 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new APIerror(MESSAGES.INVALID_PASSWORD, 401));
    }

    const payload = user.toObject();
    delete payload.password;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return APIresponse(res, 200, MESSAGES.LOGIN_SUCCESSFUL, {
      token,
      user: payload,
    });
  } catch (error) {
    console.log("Login Error: ", error);
    return next(new APIerror(MESSAGES.LOGIN_ERROR));
  }
};

const getProfile = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.user._id.toString()).lean();
    const { password, ...user } = existingUser;
    return APIresponse(res, 200, MESSAGES.PROFILE_FETCH_SUCCESSFULLY, user);
  } catch (error) {
    console.log("Profile Fetching Error: ", error);
    return next(new APIerror(MESSAGES.PROFILE_FETCHING_ERROR));
  }
};

module.exports = { register, login, getProfile };
