const getTokenFromHeader = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    return false;
  } else {
    return token;
  }
};

export default getTokenFromHeader;
