const { Product } = require("../../models/productsModel");

const productsAll = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - productsAll",
    req.user._id,
    req.user.name,
    "blood- ",
    req.user.blood
  );  

  const dataUser = await Product.find().exec();
  
  const numberProductsBase = dataUser.length;  

  console.log("1.2 -  - listUser", {numberProductsBase});

  res.status(200).json({numberProductsBase,dataUser});

  console.log("це contact Controller - listUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {
  productsAll,
};
