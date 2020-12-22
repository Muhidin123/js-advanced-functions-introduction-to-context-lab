// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map((e) => createEmployeeRecord(e));
}

function createTimeInEvent(record, time) {
  let [date, hour] = time.split(" ");
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return record;
}

function createTimeOutEvent(record, time) {
  let [date, hour] = time.split(" ");

  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return record;
}

function hoursWorkedOnDate(record, time) {
  let inHour = record.timeInEvents.find((e) => e.date === time);
  let outHour = record.timeOutEvents.find((e) => e.date === time);

  return (outHour.hour - inHour.hour) / 100;
}

const wagesEarnedOnDate = (record, time) => {
  let inHour = record.timeInEvents.find((e) => e.date === time).hour;
  let outHour = record.timeOutEvents.find((e) => e.date === time).hour;
  let hours = (outHour - inHour) / 100;
  let payPerHour = record.payPerHour;

  let wage = parseFloat(hours * payPerHour);

  return wage;
};

const allWagesFor = (record) => {
  let wages = 0;
  record.timeInEvents.forEach((element) => {
    wages += wagesEarnedOnDate(record, element.date);
  });
  return wages;
};

const calculatePayroll = (employeeRecords) => {
  let wages = 0;
  employeeRecords.forEach((e) => {
    wages += allWagesFor(e);
  });

  return wages;
};

const findEmployeeByFirstName = (arr, name) => {
  let employee = "";
  employee = arr.find((e) => e.firstName === name);
  return employee;
};
