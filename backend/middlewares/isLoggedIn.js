import { getTokenFromHeader, verifyToken } from "../utils/index.js";

const isLoggedIn = (req, res, next) => {
  // get token from the header of req
  const token = getTokenFromHeader(req);
  //   verify token
  const decoded = verifyToken(token);
  //return verified user id
  if (!decoded) {
    res.status(400).send({
      error: "Expired/invalid token. Please login again.",
    });
    return;
  } else {
    req.userAuthId = decoded.id;
  }
  next();
};

export default isLoggedIn;
