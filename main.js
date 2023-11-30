function main(){
    var rowIndex = 2 // Header is skipped
    for (const rowData of DATA) {
      var reminderType = getReminderType(rowData);
      if (reminderType){
        logTaskReminders(rowData, reminderType);
      }
      rowIndex ++ 
    }
  }
  

function getReminderType(rowData){
  // Get Data
  task = getCellData(rowData, headers.task)
  dueDate = getCellData(rowData, headers.dueDate)
  daysNotice = getCellData(rowData, headers.daysNotice)

  // Determine if valid reminder is possible
  if (task === "" || daysNotice === "") {
    return false;
  };
  if (!(dueDate instanceof Date) || isNaN(daysNotice)) {
    return false;
  };

  // Set the relevant dates
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  var dueDate = new Date(dueDate);
  dueDate.setHours(0, 0, 0, 0);
  reminderDate = subtractDays(dueDate, daysNotice)
  reminderDate.setHours(0, 0, 0, 0);
  // Return Statement
  switch (true) {
    case dueDate < currentDate:
        return "Overdue";
    case dueDate.getTime() === currentDate.getTime():
        return "Due Today";
    case currentDate.getTime() === reminderDate.getTime():
        return "Due Soon";
    default:
        return false;
  };
};

// https://www.reddit.com/r/GoogleAppsScript/comments/wka0n7/subtracting_days_from_todays_date_in_apps_scripts/
function subtractDays(date, days){
  const unix = new Date(date).getTime()
  const minusUnix = unix - (1000 * 60 * 60 * 24 * days)
  return new Date(minusUnix)
}

function logTaskReminders(rowData, reminderType){
  // Get Data
  task = getCellData(rowData, headers.task)
  dueDate = getCellData(rowData, headers.dueDate)
  const sheetURL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;


  rowData.slice(3).forEach((status, index) => {
    if (!NO_REMINDER.includes(status.trim())) {
      var employee = _getEmployee(index+3, status)
      //var email = emailDict[employee]
      console.log("TARGET", employee)
      console.log("TITLE", task, reminderType)
      console.log(`BODY ${task} is due on ${removeTime(dueDate)}. Please make sure to get this completed. Link: ${sheetURL}`);    };
  });
};


function _getEmployee(columnIndex){
// The current iteration of cells in a row should match the header indices.
// Therefore, the employee name can be found by taking the index of all headers.
return HEADERROW[columnIndex]
};



// ToDo - don't hardcode the due messages. 
// ToDo - tweak message body based on when it's due.
// TODO - Tweak when message sent based on type
// TODO - when sending list of overdue - denote if its been commented
// for example - [NO COMMENT] OVERDUE - TASK - NAME
