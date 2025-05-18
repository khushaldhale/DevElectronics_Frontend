import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills } from "../../redux/slices/billSlice";
import BillDisplay from "./BillDisplay";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";

const Bills = () => {
  const bills = useSelector((state) => {
    return state?.bill?.bills;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBills()).then((action) => {});
  }, []);

  const isLoading = useSelector((state) => {
    return state.bill.isLoading;
  });

  const isError = useSelector((state) => {
    return state.bill.isError;
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  } else if (isError) {
    return <ErrorDisplay></ErrorDisplay>;
  }
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Bills & Invoices</h2>
          {bills?.length > 0 ? (
            <BillDisplay bills={bills} />
          ) : (
            <div className="alert alert-info" role="alert">
              No bills have been generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;
