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

  // for fetching existing item if we're updating
  useEffect(() => {
    if (requiredPath === "update") {
      dispatch(particularItem({ _id: params.id })).then((action) => {
        if (action.payload.success) {
          setFormData(action.payload.data);
        }
      });
    }
  }, [requiredPath]);

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="item_name"
        placeholder="Enter the Item name"
        onChange={changeHandler}
        value={formData.item_name}
      />
      <br />
      <input
        type="text"
        name="item_desc"
        placeholder="Enter the Item desc"
        onChange={changeHandler}
        value={formData.item_desc}
      />
      <br />
      <input
        type="number"
        name="price"
        placeholder="Enter the item  price"
        onChange={changeHandler}
        value={formData.price}
      />
      <br />
      <button type="submit">
        {requiredPath === "update" ? "Update" : "Add"} Item
      </button>
    </form>
  );
};

// 👇 Wrapper component to choose thunk dynamically and apply HOC

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
