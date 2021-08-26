// dateO is being refered as a object with numbers
// date is being refered as a object with numbers as strings

function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var revString = reverseString(str);
  return str === revString;
}

function datetoString(dateO) {
  var dateStr = { day: "", month: "", year: "" };

  if (dateO.day < 10) {
    dateStr.day = "0" + dateO.day;
  } else {
    dateStr.day = dateO.day.toString();
  }

  if (dateO.month < 10) {
    dateStr.month = "0" + dateO.month;
  } else {
    dateStr.month = dateO.month.toString();
  }

  dateStr.year = dateO.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(dateO) {
  var day = dateO.day + 1;
  var month = dateO.month;
  var year = dateO.year;

  var daysMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysMonthList[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function checkPalindromeForAll(date) {
  var dateFormats = getAllDateFormats(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormats.length; i++) {
    var result = isPalindrome(dateFormats[i]);
    palindromeList.push(result);
  }

  return palindromeList;
}

// console.log(checkPalindromeForAll(datetoString(date)));

function getNextPalindromeDate(dateO) {
  var nextdate = getNextDate(dateO);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = datetoString(nextdate);
    var resultList = checkPalindromeForAll(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextdate];
      }
    }
    nextdate = getNextDate(nextdate);
  }
}

//for previous date
function getPreviousDate(dateO) {
  var day = dateO.day - 1;
  var month = dateO.month;
  var year = dateO.year;

  var daysMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      day = 31;
      month = 12;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysMonthList[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getPreviousPalindromeDate(dateO) {
  var previousdate = getPreviousDate(dateO);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = datetoString(previousdate);
    var resultList = checkPalindromeForAll(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousdate];
      }
    }
    previousdate = getPreviousDate(previousdate);
  }
}

const main = (data) => {
  if (data !== "") {
    var date = data.split("-");
    var yy = date[0];
    var mm = date[1];
    var dd = date[2];
  }

  var date = {
    day: Number(dd),
    month: Number(mm),
    year: Number(yy)
  };

  var datestr = datetoString(date);
  var resultList = checkPalindromeForAll(datestr);
  var palindrome = false;

  for (var i = 0; i < resultList.length; i++) {
    if (resultList[i]) {
      palindrome = true;
      break;
    }
  }

  if (!palindrome) {
    const [ctr1, nextDate] = getNextPalindromeDate(date);
    const [ctr2, previousDate] = getPreviousPalindromeDate(date);

    if (ctr1 > ctr2) {
      return `Sorry Your Birthday is not a palindrome. The Nearest date which is a palindrome is ${previousDate.month}-${previousDate.day}-${previousDate.year} and you missed it by ${ctr2}`;
    } else {
      return `Sorry Your Birthday is not a palindrome. The Nearest date which is a palindrome is ${nextDate.month}-${nextDate.day}-${nextDate.year} and you missed it by ${ctr1}`;
    }
  } else {
    return "YAY! Your Birthday Is A Palindrome";
  }
};

const PalindromeFinder = (data) => {
  const result = main(data);
  return result;
};

export default PalindromeFinder;
