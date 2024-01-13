const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: "1",
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    // birthday: {
    //   type: Date,
    //   required: [true, "must be older than 18 years"],
    //   default: "01.01.1989",
    // },
    birthday: {
      type: Date,
      validate: {
        validator: function (birthday) {
          return (
            isBefore(birthday, new Date()) &&
            differenceInYears(new Date(), birthday) >= 18
          );
        },
        message: "The user must be over 18 years old.",
      },
    },
    height: {
      type: Number,
      default: 150,
    },
    currentWeight: {
      type: Number,
      default: 35,
    },
    desiredWeight: {
      type: Number,
      default: 35,
    },
    token: {
      type: String,
      default: null,
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    BMR: {
      type: Number,
      default: 2000,
    },
    dailyRateSports: {
      type: Number,
      default: 110,
    },    
    avatarURL: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
    confirmationOfVerification: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
  blood: Joi.string().valid(1, 2, 3, 4),
  sex: Joi.string().valid("male", "female"),
  birthday: Joi.string(),
  height: Joi.number(),
  currentWeight: Joi.number(),
  desiredWeight: Joi.number(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const userUpdate = Joi.object({
  height: Joi.number().required(),
  weight: Joi.number().required(),
  age: Joi.number().required(),
});

const userUpdateSeven = Joi.object({
  height: Joi.number().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  birthday: Joi.string().required(),
  sex: Joi.string().valid("male", "female"),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5),
  blood: Joi.string().valid(1, 2, 3, 4),
});

const userUpdateSevenKeys = Joi.object()
  .keys({
    height: userUpdateSeven.extract("height").optional(),
    currentWeight: userUpdateSeven.extract("currentWeight").optional(),
    desiredWeight: userUpdateSeven.extract("desiredWeight").optional(),
    birthday: userUpdateSeven.extract("birthday").optional(),
    sex: userUpdateSeven.extract("sex").optional(),
    levelActivity: userUpdateSeven.extract("levelActivity").optional(),
    blood: userUpdateSeven.extract("blood").optional(),
  })
  .or(
    "height",
    "currentWeight",
    "desiredWeight",
    "birthday",
    "sex",
    "levelActivity",
    "blood"
  );

const userSchemas = {
  signinSchema,
  signupSchema,
  userUpdate,
  userUpdateSeven,
  userUpdateSevenKeys,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };