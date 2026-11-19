import React from "react";

const MonthlyBarChart = ({ expenses, reportYear }) => {
  // 12 months
  let monthlyExpenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Calculate expenses for selected year
  for (let i = 0; i < expenses.length; i++) {
    const date = new Date(expenses[i].date);

    const month = date.getMonth();

    const year = date.getFullYear();

    // Only selected year
    if (year === Number(reportYear)) {
      monthlyExpenses[month] += expenses[i].amount;
    }
  }

  // Find highest monthly expense
  let highest = Math.max(...monthlyExpenses);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h3 className="mb-4">Monthly Expense Comparison (Bar Chart)</h3>

        {reportYear === "" ? (
          <p className="text-center text-danger">
            Enter a year in the monthly expense chart.
          </p>
        ) : (
          <div>
            <h5 className="mb-4">Year: {reportYear}</h5>

            <div className="row">
              {monthlyExpenses.map((amount, index) => {
                let height = 0;

                if (highest > 0) {
                  height = (amount / highest) * 100;
                }

                return (
                  <div className="col" key={index}>
                    <div
                      className="d-flex flex-column justify-content-end align-items-center"
                      style={{
                        height: "300px",
                      }}
                    >
                      {/* Amount */}

                      <div className="mb-2">
                        ₹{amount.toLocaleString("en-IN")}
                      </div>

                      {/* BAR */}

                      <div
                        className="bg-primary rounded-top"
                        style={{
                          height: height + "%",
                          width: "40px",
                        }}
                      ></div>

                      {/* MONTH */}

                      <div className="mt-2">{months[index]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyBarChart;
