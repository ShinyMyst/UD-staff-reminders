// GitHub Link: https://github.com/ShinyMyst/UD-staff-reminders

// Sheet Information
const SHEET_ID = "1V6KGcz1HH57MlndOk4W3vRaTdV6lhGkUAoDiKCB5_Uc"
const PAGE_NAME = "Tasks"
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;

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
  ".": ".@udayton.edu"
};

