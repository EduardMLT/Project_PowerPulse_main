const addNumbers = (bmrVariableValues) => {
  
  console.log("це функція - ");

  const { birthday, height, currentWeight, levelActivity, sex } =
    bmrVariableValues;  
  
function calculateAge(birthday) {
  
  const currentDate = new Date();  
  const parts = birthday.split(".");
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  const birthdayObj = new Date(year, month - 1, day);  
  const ageDiff = currentDate - birthdayObj;
  
  const userAge = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365));

  return userAge;
}


  function addBmrMale(birthday, height, currentWeight, levelActivity) {
    const userAge = calculateAge(birthday);
    const BMR1 =
      Math.floor(
        88.362 + 13.397 * currentWeight + 4.799 * height - 5.677 * userAge
      ) * levelActivity;

    return BMR1;
  }

  function addBmrFemale(birthday, height, currentWeight, levelActivity) {
    const userAge = calculateAge(birthday);
    const BMR2 =
      Math.floor(
        447.593 + 9.247 * currentWeight + 3.098 * height - 4.33 * userAge
      ) * levelActivity;

    return BMR2;
  }

  function calculateIndicators(
    birthday,
    height,
    currentWeight,
    levelActivity,
    sex
  ) {
    let result = null;
    switch (sex) {
      case "male":
        result = addBmrMale(birthday, height, currentWeight, levelActivity);
        break;

      case "female":
        result = addBmrFemale(birthday, height, currentWeight, levelActivity);
        break;
      default:
        throw new Error("Невідома стать");
    }
    return result;
  }

  const BMR = calculateIndicators(
    birthday,
    height,
    currentWeight,
    levelActivity,
    sex
  );

  console.log("це функція - ", { BMR });

  const results =  BMR ;

  return results;
};

module.exports = addNumbers;