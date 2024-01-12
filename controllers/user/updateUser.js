const { User } = require("../../models/userPowerPulse");
const bmrCalculator = require("../../helpers/bmrCalculator");

const updateUser = async (req, res) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers["authorization"];
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const dataUser = await User.find(task[0]._id).exec();

  const dataUserCurrent = { ...dataUser };

  const renewedUserId = dataUserCurrent[0]._id;

  console.log("1.1 - це contact Controller - updateUser - ", {
    renewedUserId,
  });

  const bmrVariableValues = {
    birthday: dataUserCurrent[0].birthday,
    height: dataUserCurrent[0].height,
    currentWeight: dataUserCurrent[0].currentWeight,
    levelActivity: dataUserCurrent[0].levelActivity,
    sex: dataUserCurrent[0].sex,
    BMR: dataUserCurrent[0].BMR,
  };

  console.log({ bmrVariableValues });

  const renewedTask = req.body;

  function replaceFields(bmrVariableValues, renewedTask) {
    for (const field in renewedTask) {
      bmrVariableValues[field] = renewedTask[field];
    }
    return bmrVariableValues;
  }

    const mergedObject = replaceFields(bmrVariableValues, renewedTask);
    console.log({ mergedObject });

//   await User.findByIdAndUpdate(renewedUserId, renewedTask, {
//     new: true,
//   });

    const resultsBmr = await bmrCalculator(mergedObject);
    console.log({ resultsBmr });
    
    mergedObject.BMR = resultsBmr;
    console.log({ mergedObject });

  await User.findByIdAndUpdate(renewedUserId, mergedObject, {
    new: true,
  });

  console.log({ resultsBmr }); // виводимо результати

  console.log("1.3 - це contact Controller - updateUser - оновлено", {
    renewedUserId,
  });

  res.status(200).json(mergedObject);
};

module.exports = {
  updateUser,
};
