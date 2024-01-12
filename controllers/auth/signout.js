const { User } = require("../../models/userPowerPulse");

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }).exec();

  res.status(204).json({
    message: "Not authorized",
  });
};

module.exports = signout;