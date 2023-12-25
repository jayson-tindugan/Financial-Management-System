/* EXPORTING FILES FOR ROUTING */

/* ADD GLOBAL FILES TO EXPORT BELOW THIS LINE */

/* Dashboard Module */
import { default as Dashboard } from "./dashboard/dashboard.jsx";
/* Profile Module */
import { default as Profile } from "./profile/profile.jsx";
/* Officer Records Module */
// export { default as OfficerRecords } from "./officer/officerRecords.jsx";

/* ADD LOCAL (modules that can't be use by other module/specific only by one role) MODULES TO EXPORT BELOW THIS LINE */

/* Admin Module */
// export { default as TotalStudents } from "./adminmodule/totalStudents.jsx";
// export { default as Expenses } from "./adminmodule/expenses.jsx";
// export { default as TransactionHistory } from "./adminmodule/transactionHistory.jsx";
/* Treasurer Module */
import { default as Transaction } from "./treasurermodule/transaction.jsx";
/* Auditor Module */
// export { default as Balance } from "./auditormodule/balance.jsx";
/* Other Officer Module */
// export { default as FinancialReport } from "./usermodule/financialReport.jsx";

/* EXPORT ALL IMPORTED PAGES */
export { Dashboard };
export { Transaction };
export { Profile };
