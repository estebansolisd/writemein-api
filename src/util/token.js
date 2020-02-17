const jwt = require("jsonwebtoken");

function getTokenData(req) {
  const token = req.header("Authorization").replace("Bearer ", "");
  return { token_result: jwt.verify(token, process.env.JWT_KEY), token };
}

module.exports = getTokenData;
