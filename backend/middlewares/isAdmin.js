import User from "../models/User.js";

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req?.userAuthId);
  if (user?.role !== "admin") {
    res?.status(400)?.send({ message: "Access denied. Admin only." });
    return;
  }
  return next();
};

export default isAdmin;
