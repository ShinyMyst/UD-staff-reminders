function main(){
  var rowIndex = 2 // Header is skipped
  for (const row of DATA) {
    // Gather Data
    task = getCellData(row, headers.task)
    dueDate = getCellData(row, headers.dueDate)
    daysNotice = getCellData(row, headers.daysNotice)

    if (reminderRequired(task, dueDate, daysNotice)){
      sendTaskReminders(row, task);
      postReminderComment(cell);
    }
    rowIndex ++
  }
}


function postReminderComment(cell){
  var currentComment = sheet.getRange()
}


function reminderRequired(task, dueDate, daysNotice) {
  // Check that a reminder timeframe is possible.
  if (task === "" || daysNotice === "") {
    return false;
  }
  if (!(dueDate instanceof Date) || isNaN(daysNotice)) {
    return false;
  }

  // Determine if we fall within the reminder time frame
  var currentDate = new Date();
  var dueDateObj = new Date(dueDate);
  var reminderDate = new Date();
  reminderDate.setDate(currentDate.getDate() - daysNotice);

  return reminderDate <= currentDate && dueDateObj <= currentDate;
};

function sendTaskReminders(row, task){
  row.slice(3).forEach((status, index) => {
    if (!noReminder.includes(status.trim())) {
      var originalIndex = index +3
      console.log("REMINDER", getEmployee(originalIndex), task, status)
    }
  });
};

function postComment(){

}

function getEmployee(index){
  // The current iteration of cells in a row should match the header indices.
  // Therefore, the employee name can be found by taking the index of all headers.
  return HEADERROW[index]
};