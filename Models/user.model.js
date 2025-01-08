const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_ROLE } = require("../utils/constant");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  role: {
    type: String,
    default: USER_ROLE.USER,
    enum: Object.values(USER_ROLE),
  },
  password: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
