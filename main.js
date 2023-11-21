function main(){
    var rowIndex = 2 // Header is skipped
    for (const rowData of DATA) {
      // Gather Variables
      task = getCellData(rowData, headers.task)
      dueDate = getCellData(rowData, headers.dueDate)
      daysNotice = getCellData(rowData, headers.daysNotice)
  
      reminder = reminderRequired(task ,dueDate, daysNotice)
      if (reminderRequired(task, dueDate, daysNotice)){
        //logTaskReminders(rowData, task);
        postTaskReminders(rowData, task);
      }
      rowIndex ++ 
    }
  }
  
  
  function reminderRequired(task, dueDate, daysNotice) {
    // Check that a reminder timeframe is possible.
    if (task === "" || daysNotice === "") {
      return false;
    }
    if (!(dueDate instanceof Date) || isNaN(daysNotice)) {
      return false;
    }
  
    // Set the relevant dates
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var dueDate = new Date(dueDate);
    dueDate.setHours(0, 0, 0, 0)
    var reminderDate = new Date();
    reminderDate.setDate(dueDate.getDate() - daysNotice);
    reminderDate.setHours(0, 0, 0, 0)

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
    }
  };
  

  function logTaskReminders(rowData, task){
    // Post reminders to console
    rowData.slice(3).forEach((status, index) => {
      if (!NO_REMINDER.includes(status.trim())) {
        var originalIndex = index +3
        console.log("REMINDER", getEmployee(originalIndex), task, status)
      }
    });
  };
  
 

  function sendReminders(rowData, task){

  };
  
  function getEmployee(columnIndex){
    // The current iteration of cells in a row should match the header indices.
    // Therefore, the employee name can be found by taking the index of all headers.
    return HEADERROW[columnIndex]
  };
