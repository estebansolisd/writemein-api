const User = require("../models/User");
const getTokenData = require("../util/token");

const auth = async (req, res, next) => {
  const { token_result, token } = getTokenData(req);
  try {
    const user = await User.findOne({ _id: token_result._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
