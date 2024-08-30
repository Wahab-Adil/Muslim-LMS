import User from "../models/User.js";

const isAdmin = async (req) => {
  const user = await User.findById(req.userAuthId);
  if (user?.role !== "admin") {
    return true;
  }
  return false;
};

export default isAdmin;
