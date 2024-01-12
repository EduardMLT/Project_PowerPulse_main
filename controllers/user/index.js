const {updateUser} = require("./updateUser");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  updateUser: ctrlWrapper(updateUser),
};
