// GitHub Link: https://github.com/ShinyMyst/UD-staff-reminders

// Sheet Information
const SHEET_ID = "1V6KGcz1HH57MlndOk4W3vRaTdV6lhGkUAoDiKCB5_Uc"
const PAGE_NAME = "Tasks"

// Relevant Headers
const headers = {
    task: "Task",
    dueDate: "Date",
    daysNotice: "Notice"
};

const due = {
  soon: "Due Soon",
  today: "Due Today",
  late: "Overdue"
};

const status = ['✔️', '🚧' , '⏳', '🦺', '❌', '✖️']
const NO_REMINDER = ['✔️', '🚧', '⏳', '✖️']

const emailDict = {
  "Andrew C.": "sgodby1@udayton.edu"
};

