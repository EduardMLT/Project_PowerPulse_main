const { Product } = require("../../models/productsModel");

const productsNotRecommended = async (req, res, next) => {
  console.log(
    "1.1 - це contact Controller - productsNotRecommended",
    req.user._id,
    req.user.name,
    "blood- ",
    req.user.blood
  );

  const userBlood = req.user.blood;

  switch (userBlood) {
    case 1:
      groupBlood = "groupBloodNotAllowed.1";
      break;
    case 2:
      groupBlood = "groupBloodNotAllowed.2";
      break;
    case 3:
      groupBlood = "groupBloodNotAllowed.3";
      break;
    case 4:
      groupBlood = "groupBloodNotAllowed.4";
      break;
    default:
      groupBlood = "groupBloodNotAllowed.1";
  }

  const query = { [groupBlood]: { $ne: true } };

  const dataUser = await Product.find(query).exec();

  const numberProductsRecommended = dataUser.length;

  console.log("1.2 -  - listUser", { numberProductsRecommended });

  res.status(200).json({ numberProductsRecommended, dataUser });

  console.log("це contact Controller - listUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

module.exports = {
  productsNotRecommended,
};
