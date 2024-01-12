require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../models/userPowerPulse");
const { HttpError } = require("../../helpers");

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "72h" });

  await User.findByIdAndUpdate(user._id, { token }).exec();

  if (user.verify !== true) {
    throw HttpError(401, "Your account is not verify");
  }

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      blood: user.blood,
      sex: user.sex,
      birthday: user.birthday,
      height: user.height,
      currentWeight: user.currentWeight,
      desiredWeight: user.desiredWeight,
      levelActivity: user.levelActivity,      
      avatarURL: user.avatarURL,
      BMR: user.BMR,
    },
  });
};

module.exports = signin;