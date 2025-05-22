import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBill } from "../../redux/slices/billSlice";
import BillDisplay from "./BillDisplay";

const SearchBill = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
  });

  const [showNoFound, setShowNoFound] = useState(false);

  const searchedBills = useSelector((state) => state.bill.searchedBills);

  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(searchBill({ customer_name: formData.customer_name })).then(
      (action) => {
        if (action?.payload?.success) {
          setShowNoFound(false);
        } else {
          setShowNoFound(true);
        }
      }
    );

    setFormData({ customer_name: "" });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Search Bill</h5>
          <form onSubmit={submitHandler} className="row g-3">
            <div className="col-md-8">
              <input
                type="text"
                name="customer_name"
                id="customer_name"
                className="form-control"
                placeholder="Enter the customer name"
                onChange={changeHandler}
                value={formData.customer_name}
                required
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-primary w-100">
                Search Bill
              </button>
            </div>
          </form>

          {showNoFound && (
            <div className="alert alert-warning mt-3" role="alert">
              No bills found for this customer.
            </div>
          )}
        </div>
      </div>

      {searchedBills.length > 0 && (
        <div className="mt-4">
          <BillDisplay bills={searchedBills} />
        </div>
      )}
    </div>
  );
};

export default SearchBill;
