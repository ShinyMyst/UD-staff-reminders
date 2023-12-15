function main(){
  for (const rowData of DATA) {
    // console.log(rowData)
    var reminderType = getReminderType(rowData);
    if (reminderType){
      processTaskReminders(rowData, reminderType, null);
    }
  }
  console.log(allReminders)
  let body = allReminders.join('\n');
  sendEmail(AC, "[AUTO] RA Reminder Summary", body)
}

var allReminders = []

function getReminderType(rowData){
  // Get Data
  task = getCellData(rowData, headers.task)
  dueDate = getCellData(rowData, headers.dueDate)
  daysNotice = getCellData(rowData, headers.daysNotice)

  // Determine if valid reminder is possible
  if (!(dueDate instanceof Date) || isNaN(daysNotice)) {
    return false;
  };

  // Set the relevant dates
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  var dueDate = new Date(dueDate);
  dueDate.setHours(0, 0, 0, 0);
  reminderDate = _subtractDays(dueDate, daysNotice)
  reminderDate.setHours(0, 0, 0, 0);

  // Return Statement
  switch (true) {
    case dueDate < currentDate:
      console.log(DUE['late'])
      return DUE["late"];
    case dueDate.getTime() === currentDate.getTime():
      console.log(DUE['today'])
      return DUE["today"];
    case currentDate.getTime() === reminderDate.getTime():
      console.log(DUE['soon'])
      return DUE["soon"];
    default:
      console.log(false)
      return false;
  };
};


// Posts sample messages for debugging
function processTaskReminders(rowData, reminderType, sendEmail=false){
  // Get data for this task
  task = getCellData(rowData, headers.task)
  dueDate = formatDate(getCellData(rowData, headers.dueDate))
  allReminders.push(`TASK: ${task}, ${dueDate}`)

  // Iterate through all statuses
  rowData.slice(3).forEach((status, index) => {
    // Only process those that require a reminder
    if (!NO_REMINDER.includes(status.trim())) {
      // Get employee data associated with status
      var employee = _getEmployee(index + 3, status);
      var email = emailDict[employee];
      allReminders.push(`${employee}`)
      // Functions
      _logTaskReminder(employee, task, reminderType, email);
      if (sendEmail){
        _emailTaskReminder(employee, task, reminderType, email);
      }
    }
  });
};


/* =============
Helper Functions
============= */ 
// Helper that logs task reminder in log
function _logTaskReminder(employee, task, reminderType, email){
  console.log("TARGET", employee, "@", email)
  console.log("TITLE", task, reminderType)
  switch (true) {
    case dueDate == DUE["late"]:
      console.log(`BODY ${task} was due on ${dueDate}. Please make sure to get this completed. Link: ${SHEET_URL}`);     
    case dueDate == DUE["today"]:
      console.log(`BODY ${task} is due on ${dueDate}. Please make sure to get this completed. Link: ${SHEET_URL}`);    
    case dueDate == DUE["soon"]:
      console.log(`BODY ${task} is due on ${dueDate}. Please make sure to get this completed. Link: ${SHEET_URL}`);    
    default:
      console.log(`BODY ${task} is due on ${dueDate}. Please make sure to get this completed. Link: ${SHEET_URL}`);  
  }
};


// Email messages in live version of script
function _emailTaskReminder(employee, task, reminderType, email){
  recipient = email
  subject = `[RA_TASK] ${employee} ${task} ${reminderType}`
  switch (true) {
  case dueDate == DUE["late"]:
    var body = `${task} was due on ${dueDate}. Please make sure to get this completed. \n Link: ${SHEET_URL}`;     
  case dueDate == DUE["today"]:
    var body = `${task} is due on ${dueDate}. Please make sure to get this completed. \n Link: ${SHEET_URL}`;    
  case dueDate == DUE["soon"]:
    var body = `${task} is due on ${dueDate}. Please make sure to get this completed. \n Link: ${SHEET_URL}`;    
  default:
    var body = `${task} is due on ${dueDate}. Please make sure to get this completed. \n Link: ${SHEET_URL}`;  
  }
  sendEmail(recipient, subject, body, AC)
}


// https://www.reddit.com/r/GoogleAppsScript/comments/wka0n7/subtracting_days_from_todays_date_in_apps_scripts/
function _subtractDays(date, days){
  const unix = new Date(date).getTime()
  const minusUnix = unix - (1000 * 60 * 60 * 24 * days)
  return new Date(minusUnix)
}


function _getEmployee(columnIndex){
// The current iteration of cells in a row should match the header indices.
// Therefore, the employee name can be found by taking the index of all headers.
return HEADERROW[columnIndex]
};
