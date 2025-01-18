function compareDate(inputDate) {
  var inputDateArray = inputDate.split("-");
  var inputYear = parseInt(inputDateArray[0]);
  var inputMonth = parseInt(inputDateArray[1]) - 1;
  var inputDay = parseInt(inputDateArray[2]);

  var inputDateObj = new Date(inputYear, inputMonth, inputDay);

  var today = new Date();

  if (inputDateObj < today) {
    return false;
  } else if (inputDateObj.toDateString() === today.toDateString()) {
    return false;
  } else {
    return true;
  }
}

export default compareDate;
// var inputDate = "2024-04-26";
// console.log(compareDate(inputDate));
