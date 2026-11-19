import React from "react";

const ExpenseTable = ({ expenses, deleteExpense, editExpense }) => {
  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="mb-4">Expense List</h3>

          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Sr. No.</th>

                  <th>Expense Title</th>

                  <th>Category</th>
                  <th>Amount</th>

                  <th>Date</th>

                  <th>Payment Method</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((expense, index) => (
                    <tr key={expense._id}>
                      <td>{index + 1}</td>

                      <td>{expense.title}</td>

                      <td>
                        <span className="badge bg-primary">
                          {expense.category}
                        </span>
                      </td>
                      <td>₹{expense.amount.toLocaleString("en-IN")}</td>

                      <td>{expense.date}</td>

                      <td>{expense.paymentMethod}</td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editExpense(expense)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteExpense(expense._id)}
                        >           
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;
