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
  var reminderDate = new Date();
  reminderDate.setDate(dueDate.getDate() - daysNotice);
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
