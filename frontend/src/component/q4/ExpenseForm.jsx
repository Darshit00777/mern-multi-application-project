import React  from "react";

const ExpenseForm = ({
  formData,
  setFormData,
  addExpense,
  updateExpense,
  editId,
  setEditId,
}) => {

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // Submit
  
const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim().length < 3) {
        alert("Expense Title must be at least 3 characters.");
        return;
    }

    if (formData.amount === "" || Number(formData.amount) <= 0) {
        alert("Amount must be greater than zero.");
        return;
    }

    if (formData.category === "") {
        alert("Category is required.");
        return;
    }

    if (formData.date === "") {
        alert("Date cannot be empty.");
        return;
    }

    if (formData.paymentMethod === "") {
        alert("Payment Method is required.");
        return;
    }

            if (editId !== null) {
            await updateExpense(formData);
            alert("Expense updated successfully.");
        } else {
            await addExpense(formData);
            alert("Expense added successfully.");
        }
    
};


  // Cancel
  const cancelEdit = () => {
    setEditId(null);

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      paymentMethod: "",
      description: "",
    });
  };

  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="mb-4">
            {editId !== null ? "Edit Expense" : "Add Expense"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* TITLE */}

              <div className="col-md-6">
                <label className="form-label">Expense Title *</label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />
              </div>

              {/* AMOUNT */}

              <div className="col-md-6">
                <label className="form-label">Amount *</label>

                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                />
              </div>

              {/* CATEGORY */}

              <div className="col-md-6">
                <label className="form-label">Category *</label>

                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  <option>Food</option>

                  <option>Shopping</option>

                  <option>Transport</option>

                  <option>Entertainment</option>

                  <option>Medical</option>

                  <option>Education</option>

                  <option>Bills</option>

                  <option>Others</option>
                </select>
              </div>

              {/* DATE */}

              <div className="col-md-6">
                <label className="form-label">Date *</label>

                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              {/* PAYMENT */}

              <div className="col-md-6">
                <label className="form-label">Payment Method *</label>

                <select
                  name="paymentMethod"
                  className="form-select"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Select Payment Method</option>

                  <option>Cash</option>

                  <option>UPI</option>

                  <option>Credit Card</option>

                  <option>Debit Card</option>

                  <option>Net Banking</option>
                </select>
              </div>

              {/* DESCRIPTION */}

              <div className="col-md-6">
                <label className="form-label">Description</label>

                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {editId !== null ? "Update Expense" : "Add Expense"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
