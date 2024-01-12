const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/userPowerPulse");

const ctrl = require("../../controllers/user");

const jsonParser = express.json();
const router = express.Router();


router.patch(
  "/update",
  jsonParser,
  validateBody(userSchemas.userUpdateSevenKeys),
  ctrl.updateUser
);


module.exports = router;
