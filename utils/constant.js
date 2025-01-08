const MESSAGES = {
  USER_EXIST: "User already exists",
  SIGNUP_SUCCESSFUL: "Signup successfuly",
  SIGNUP_ERROR: "Signup error",
  USER_NOT_FOUND: "User not found",

  LOGIN_SUCCESSFUL: "Login successfuly",
  LOGIN_ERROR: "Login error",
  INVALID_USERNAME: "Invalid username",
  INVALID_PASSWORD: "Invalid password",

  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",

  PROFILE_FETCHING_ERROR: "Error Fetching Profile",
  PROFILE_FETCH_SUCCESSFULLY: "Profile Fetched Successfully",

  ERROR_ADDING_EXPENSE: "Error adding Expense",
  ERROR_FETCHING_EXPENSE: "Error fetching Expense",
  EXPENSE_ADDED: "Expense added successfully",
};

const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
};

module.exports = {
  MESSAGES,
  USER_ROLE,
};
