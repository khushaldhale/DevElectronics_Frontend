import { useLocation, useParams } from "react-router-dom";
import withForm from "../../hoc/withForm";
import {
  createItem,
  particularItem,
  updateItem,
} from "../../redux/slices/itemSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AddItem = ({ changeHandler, submitHandler, formData, setFormData }) => {
  const location = useLocation();
  const arrayPath = location.pathname.split("/");
  const requiredPath = arrayPath[arrayPath.length - 1];
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (requiredPath === "update") {
      dispatch(particularItem({ _id: params.id })).then((action) => {
        if (action.payload.success) {
          setFormData(action.payload.data);
        }
      });
    }
  }, [requiredPath, dispatch, params.id, setFormData]);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                {requiredPath === "update" ? "Update" : "Add New"} Item
              </h2>

              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="item_name" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="item_name"
                    name="item_name"
                    placeholder="Enter the item name"
                    onChange={changeHandler}
                    value={formData.item_name}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="item_desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="item_desc"
                    name="item_desc"
                    placeholder="Enter the item description"
                    onChange={changeHandler}
                    value={formData.item_desc}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Enter the item price"
                      onChange={changeHandler}
                      value={formData.price}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {requiredPath === "update" ? "Update" : "Add"} Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddItemWrapper = (props) => {
  const location = useLocation();
  const isUpdate = location.pathname.endsWith("update");
  const DynamicForm = withForm(
    AddItem,
    {
      item_name: "",
      item_desc: "",
      price: "",
    },
    isUpdate ? updateItem : createItem,
    "/dashboard/items"
  );
  return <DynamicForm {...props} />;
};

export default AddItemWrapper;
