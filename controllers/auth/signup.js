require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/userPowerPulse");
const { HttpError } = require("../../helpers");
const sendEmail = require("../../utils/sendEmail");
const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const verificationEmail = {
    to: email,
    subject: "Verification email",
    html: `<b>To confirm your registration please click on the <a href="${BASE_URL}/api/auth/verify/${verificationToken} ">link</a>`,
    text: `<b>To confirm your registration please open the link https://localhost:PORT/api/auth/verify/${verificationToken} `,
  };

  await sendEmail(verificationEmail);

  const newUser = await User.create({
    ...req.body,
    verificationToken,
    avatarURL,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "72h" });
  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      blood: newUser.blood,
      sex: newUser.sex,
      birthday: newUser.birthday,
      height: newUser.height,
      currentWeight: newUser.currentWeight,
      desiredWeight: newUser.desiredWeight,
      levelActivity: newUser.levelActivity,      
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = signup;