const { updateUser } = require("./updateUser");
const {productsAll} = require("./productsAll");
const { productsRecommended } = require("./productsRecommended");
const { productsNotRecommended } = require("./productsNotRecommended");

const { ctrlWrapper } = require("../../helpers");

module.exports = {
  updateUser: ctrlWrapper(updateUser),
  productsAll: ctrlWrapper(productsAll),
  productsRecommended: ctrlWrapper(productsRecommended),
  productsNotRecommended: ctrlWrapper(productsNotRecommended),
};


