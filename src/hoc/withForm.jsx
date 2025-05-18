import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const withForm = (OldComponent, initialValues, thunk, url, validateUrl) => {
  return (props) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //  login form validation
    function loginValidate(name, value) {
      switch (name) {
        case "email":
          if (!value) return "Email is required";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Invalid email address";
          return "";

        case "password":
          if (!value) return "Password is required";
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!passwordRegex.test(value))
            return "Password must be at least 8 characters long, including 1 uppercase, 1 lowercase, 1 digit, and 1 special character";
          return "";

        default:
          return "";
      }
    }

    // Brand form validation
    function brandValidate(name, value) {
      switch (name) {
        case "category_id":
          if (!value) return "Category is required";
          return "";

        case "company_name":
          if (!value) return "Brand name is required";
          if (value.length < 3)
            return "Brand name must be at least 3 characters long";
          const brandNameRegex = /^[A-Za-z0-9\s]+$/;
          if (!brandNameRegex.test(value))
            return "Brand name can only contain letters, numbers, and spaces";
          return "";

        default:
          return "";
      }
    }

    // category form validation
    function categoryValidate(name, value) {
      switch (name) {
        case "category_name":
          if (!value) return "Category is required";
          return "";

        case "HSN":
          if (!value) return "HSN is required";
          return "";

        default:
          return "";
      }
    }
    // Item form validation
    function itemValidator(name, value) {
      switch (name) {
        case "item_name":
          if (!value) return "Item name is required";
          if (value.length < 3)
            return "Item name must be at least 3 characters";
          return "";
        case "item_desc":
          if (!value) return "Description is required";
          if (value.length < 10)
            return "Description must be at least 10 characters";
          return "";
        case "item_price":
          if (!value) return "Price is required";
          if (isNaN(value) || value <= 0)
            return "Price must be a positive number";
          return "";
        case "category_id":
          if (!value) return "Category is required";
          return "";
        case "company_id":
          if (!value) return "Company is required";
          return "";
        default:
          return "";
      }
    }

    function changeHandler(event) {
      const { name, type, value, checked } = event.target;
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        };
      });
      //  validate field here and update the errors if  any
      let validate;
      if (validateUrl === "login") {
        validate = loginValidate;
      } else if (validateUrl === "brand") {
        validate = brandValidate;
      } else if (validateUrl === "category") {
        validate = categoryValidate;
      } else if (validateUrl === "items") {
        validate = itemValidator;
      }
      let error = validate(name, value);
      setErrors((prevData) => {
        return {
          ...prevData,
          [name]: error,
        };
      });
    }

    function imageHandler(event) {
      const { name, type, value, files } = event.target;
      //  image validation
      if (typeof files[0] !== "object") {
        setErrors((prevData) => {
          return {
            ...prevData,
            [name]: "Image is required",
          };
        });
      } else {
        setErrors((prevData) => {
          return {
            ...prevData,
            [name]: "",
          };
        });
      }
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

      //  check whether the form should be submitted or not
      let action = Object.values(errors).every((error) => {
        return error === "";
      });

      if (action) {
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
      } else {
        toast.error("Please fix the errors before submitting");
      }
    }

    return (
      <OldComponent
        {...props}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        formData={formData}
        setFormData={setFormData}
        imageHandler={imageHandler}
        errors={errors}
      ></OldComponent>
    );
  };
};

export default withForm;
