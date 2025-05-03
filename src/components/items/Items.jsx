import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "../../redux/slices/itemSlice";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const items = useSelector((state) => state.item.items);
  const isLoading = useSelector((state) => state.item.isLoading);
  const isError = useSelector((state) => state.item.isError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p className="mb-0">Something went wrong while fetching the items.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-primary">Item List</h2>

          {items.length > 0 ? (
            <div className="row g-4">
              {items.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-truncate">
                        {item.item_name}
                      </h5>
                      <p className="card-text text-muted mb-2">
                        {item.item_desc}
                      </p>
                      <p className="card-text">
                        <span className="badge bg-primary">
                          ${item.price.toFixed(2)}
                        </span>
                      </p>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            dispatch(deleteItem({ _id: item._id }))
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            navigate(`/dashboard/items/${item._id}/update`)
                          }
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No items have been created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
