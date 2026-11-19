import React from "react";

const ExpenseFilter = ({
  search,
  setSearch,

  categoryFilter,
  setCategoryFilter,

  paymentFilter,
  setPaymentFilter,

  monthFilter,
  setMonthFilter,

  yearFilter,
  setYearFilter,

  sortBy,
  setSortBy,

  resetFilters,
}) => {
  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="mb-4">Search & Filter</h3>

          <div className="row g-3">
            {/* SEARCH */}

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search Title or Category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* CATEGORY */}

            <div className="col-md-2">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>

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
            {/* PAYMENT */}

            <div className="col-md-2">
              <select
                className="form-select"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="">All Payments</option>

                <option>Cash</option>

                <option>UPI</option>

                <option>Credit Card</option>

                <option>Debit Card</option>

                <option>Net Banking</option>
              </select>
            </div>

            {/* MONTH */}

            <div className="col-md-2">
              <select
                className="form-select"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="">All Months</option>

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

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              />
            </div>

            {/* SORT */}

            <div className="col-md-4">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort Expenses</option>

                <option value="newest">Date - Newest First</option>

                <option value="oldest">Date - Oldest First</option>

                <option value="amountAsc">Amount - Ascending</option>

                <option value="amountDesc">Amount - Descending</option>
              </select>
            </div>
          </div>

          <button className="btn btn-secondary mt-3" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
