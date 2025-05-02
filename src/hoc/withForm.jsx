import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    function submitHandler(event) {
      event.preventDefault();
      console.log("data : ", formData);
      dispatch(thunk(formData)).then((action) => {
        console.log("response is : ", action.payload);
        if (action?.payload?.success) {
          if (url) {
            navigate(url);
          }
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
      ></OldComponent>
    );
  };
};

export default withForm;
