const { User } = require("../Models");
const { USER_ROLE } = require("../utils/constant");

const seedAdmin = async () => {
  try {
    let admin = await User.findOne({ role: USER_ROLE.ADMIN });
    if (admin) {
      console.log("Admin exists...");
      return;
    }

    admin = new User({
      firstName: "admin",
      email: "admin@gmail.com",
      password: "Admin@3221",
      role: USER_ROLE.ADMIN,
    });

    await admin.save();
    console.log("Admin created...");
  } catch (error) {
    console.log("Error in admin seed...");
  }
};

module.exports = seedAdmin;
