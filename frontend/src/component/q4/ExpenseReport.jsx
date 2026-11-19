import React from "react";

const ExpenseReport = ({
  expenses,
  reportMonth,
  setReportMonth,
  reportYear,
  setReportYear,
}) => {
  // Get expenses for selected month and year
  const monthlyExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return month === Number(reportMonth) && year === Number(reportYear);
  });

  // Total Expense
  const total = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  // Highest Expense
  let highest = 0;

  if (monthlyExpenses.length > 0) {
    highest = Math.max(...monthlyExpenses.map((expense) => expense.amount));
  }

  // Lowest Expense
  let lowest = 0;

  if (monthlyExpenses.length > 0) {
    lowest = Math.min(...monthlyExpenses.map((expense) => expense.amount));
  }

  // Average Expense
  let average = 0;

  if (monthlyExpenses.length > 0) {
    average = total / monthlyExpenses.length;
  }

  // Number of Transactions
  const transactions = monthlyExpenses.length;

  // Category-wise Report
  const categoryReport = monthlyExpenses.reduce((result, expense) => {
    if (!result[expense.category]) {
      result[expense.category] = 0;
    }

    result[expense.category] += expense.amount;

    return result;
  }, {});

  return (
    <div className="mt-4">
      {/* =========================
          MONTHLY REPORT
      ========================== */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="text-dark mb-4">Monthly Report</h2>

          {/* MONTH + YEAR */}

          <div className="row g-3">
            {/* MONTH */}

            <div className="col-md-3">
              <label className="form-label">Select Month</label>

              <select
                className="form-select"
                value={reportMonth}
                onChange={(e) => setReportMonth(e.target.value)}
              >
                <option value="">Select Month</option>

                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            {/* YEAR */}

            <div className="col-md-3">
              <label className="form-label">Enter Year</label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter year"
                value={reportYear}
                onChange={(e) => setReportYear(e.target.value)}
              />
            </div>
          </div>

          {/* SHOW REPORT ONLY AFTER MONTH + YEAR */}

          {reportMonth !== "" && reportYear !== "" && (
            <div className="row g-3 mt-3">
              {/* TOTAL */}

              <div className="col-md-4">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h6>Total Expenses</h6>

                    <h4>₹{total.toLocaleString("en-IN")}</h4>
                  </div>
                </div>
              </div>

              {/* HIGHEST */}

              <div className="col-md-4">
                <div className="card bg-danger text-white">
                  <div className="card-body">
                    <h6>Highest Expense</h6>

                    <h4>₹{highest.toLocaleString("en-IN")}</h4>
                  </div>
                </div>
              </div>

              {/* LOWEST */}

              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h6>Lowest Expense</h6>

                    <h4>₹{lowest.toLocaleString("en-IN")}</h4>
                  </div>
                </div>
              </div>

              {/* AVERAGE */}

              <div className="col-md-4">
                <div className="card bg-warning">
                  <div className="card-body">
                    <h6>Average Expense</h6>

                    <h4>₹{average.toFixed(2)}</h4>
                  </div>
                </div>
              </div>

              {/* TRANSACTIONS */}

              <div className="col-md-4">
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h6>Number of Transactions</h6>

                    <h4>{transactions}</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          CATEGORY-WISE REPORT
      ========================== */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="mb-4">Category-wise Report</h3>

          {/* NO MONTH/YEAR */}

          {reportMonth === "" || reportYear === "" ? (
            <p className="text-muted">
              Select month and enter year to see category-wise spending.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Category</th>

                    <th>Total Spending</th>
                  </tr>
                </thead>

                <tbody>
                  {/* NO EXPENSE */}

                  {Object.keys(categoryReport).length === 0 ? (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No expenses found.
                      </td>
                    </tr>
                  ) : (
                    /* CATEGORY DATA */

                    Object.entries(categoryReport).map(([category, total]) => (
                      <tr key={category}>
                        <td>{category}</td>

                        <td>₹{total.toLocaleString("en-IN")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;
