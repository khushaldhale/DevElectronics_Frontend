import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const withForm = (OldComponent, initialValues, thunk, url) => {
  return (props) => {
    const [formData, setFormData] = useState(initialValues);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeHandler(event) {
      const { name, type, value, checked } = event.target;
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }

    function imageHandler(event) {
      const { name, type, value, files } = event.target;
      // file is set up here
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: files[0],
        };
      });
    }
    function submitHandler(event) {
      event.preventDefault();
      let data = formData;

      if ("item_img" in formData && typeof formData.item_img !== "string") {
        let formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        data = formData;
      }

      dispatch(thunk(data)).then((action) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
          if (url) {
            navigate(url);
          }
        } else {
          toast.error(action?.payload?.message);
        }
      });
    }

    return (
      <OldComponent
        {...props}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        formData={formData}
        setFormData={setFormData}
        imageHandler={imageHandler}
      ></OldComponent>
    );
  };
};

export default withForm;
