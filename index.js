// Your code here
const createEmployeeRecord = (recordArray) => {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = (obj, dateStamp) => {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    let type = "TimeIn";
    obj.timeInEvents.push({ type, hour, date });
    return obj;
}

const createTimeOutEvent = (obj, dateStamp) => {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    let type = "TimeOut";
    obj.timeOutEvents.push({ type, hour, date });
    return obj;
}

 const hoursWorkedOnDate = (obj, dateWorked) => {
     let inTime = obj.timeInEvents
     .filter((element) => element.date === dateWorked)
     .map((element) => element.hour);

     let outTime = obj.timeOutEvents
     .filter((element) => element.date === dateWorked)
     .map((element) => element.hour);

     return (outTime - inTime) /100;
 }

 const wagesEarnedOnDate = (obj, date) => {
     return obj.payPerHour * hoursWorkedOnDate(obj, date);
 }

 const allWagesFor = (obj) => {
    let newArray = [];
    const allDates = obj.timeInEvents.map((element) => (element = element.date));
    for (let element of allDates) {
        newArray.push(wagesEarnedOnDate(obj, element));
    }
    return newArray.reduce((a, b) => a + b, 0);
 }

 const calculatePayroll = (array) => {
     return array.map(obj => allWagesFor(obj))
     .reduce((a, b) => (a = a +b), 0);
 }