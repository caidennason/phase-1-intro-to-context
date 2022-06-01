// Your code here

let employeeDetails = {}

function createEmployeeRecord(arr){
employeeDetails = {
    firstName: arr[0], 
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
}
return employeeDetails
}

function createEmployeeRecords(nestedArr){
    let employeeRecords = []
    for (let i = 0; i<nestedArr.length; i++){
        let employeeArray = nestedArr[i]
        const obj = createEmployeeRecord(employeeArray) // obj stores the returned result of createEmployeeRecord function
        employeeRecords.push(obj)
    }
return employeeRecords
}

function createTimeInEvent(employeeInfo, dateStamp){
    let hours = parseInt(dateStamp.slice(11, 15))
    let dates = dateStamp.slice(0, 10)
    const timeObj = {
        type: "TimeIn",
        hour: hours,
        date: dates
    }
    employeeInfo.timeInEvents.push(timeObj)
    return employeeInfo
}

function createTimeOutEvent(employeeInfo, dateStamp){
    let hours = parseInt(dateStamp.slice(11, 15))
    let dates = dateStamp.slice(0, 10)
    const timeObj = {
        type: "TimeOut",
        hour: hours,
        date: dates
    }
    employeeInfo.timeOutEvents.push(timeObj)
    return employeeInfo
}

function hoursWorkedOnDate(employeeInfo, dateStamp){
    let startingTimes = employeeInfo.timeInEvents
    let startingHours = startingTimes.find((startInfo) => (startInfo.date === dateStamp))
    let endingTimes = employeeInfo.timeOutEvents
    let endingHours = endingTimes.find((endingInfo) => endingInfo.date === dateStamp)
    let totalHoursWorked = parseInt(endingHours.hour - startingHours.hour)
    return totalHoursWorked / 100
}

function wagesEarnedOnDate(employeeInfo, dateStamp){
    let rate = employeeInfo.payPerHour
    let hoursWorked = hoursWorkedOnDate(employeeInfo, dateStamp)
    let totalPay = parseInt(hoursWorked * rate)
    return totalPay
}

function allWagesFor(employeeInfo){
    let times = employeeInfo.timeInEvents
    let availableDates = times.map(function(item){
        return item.date
    })
    let allDates = availableDates.map(function(date){
        return wagesEarnedOnDate(employeeInfo, date)
    })
    let overallTotal = allDates.reduce(function(accumulator, n){
        return (accumulator + n)
    })
    return overallTotal
}


function calculatePayroll(employeeRecords){
    function findObj(arr){
        for (let i = 0; i < arr.length; i++){
        return arr[i]
        }
    }


    let allRecords = employeeRecords.map(function(record){
        return allWagesFor(record)
    })

    console.log(allRecords)
    
    let totalPayForEveryonePlsGodLetThisWork = allRecords.reduce(function(accumulator, n){
        return (accumulator + n)
    })

    return totalPayForEveryonePlsGodLetThisWork
  

    // console.log('time in   ', timeInDates)
    // console.log('time out   ', timeOutDates)
    // console.log(timeInDates)
    // datesArr.push(timeInDates)
    // console.log(datesArr[0])
    


}