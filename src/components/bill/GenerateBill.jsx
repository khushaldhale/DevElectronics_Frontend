import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "../../redux/slices/shopSlice";
import { getAllItems, getItemsByCompany } from "../../redux/slices/itemSlice";
import { createBill } from "../../redux/slices/billSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { getAllCompanies } from "../../redux/slices/companySlice";
import { toast } from "react-toastify";

const GenerateBill = () => {
  const [formData, setFormData] = useState({
    shop_details: "",
    customer_name: "",
    customer_location: "",
    customer_contact: "",
    purchased_items: [],
    total_bill: 0,
  });
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    item_info: "",
    quantity: 0,
    gstOpted: false,
    gstPercentage: 0,
    total_amount: 0,
    gst_amount: 0,
    item_amount: 0,
    item_name: "",
  });

  const [errors, setErrors] = useState({});

  const categories = useSelector((state) => {
    return state.category.categories;
  });
  const companies = useSelector((state) => {
    return state.company.companies;
  });

  const items = useSelector((state) => state?.item?.company_items);
  const shop = useSelector((state) => state?.shop?.shopDetails);
  const isLoading = useSelector((state) => {
    return state.bill.isLoading;
  });

  const isError = useSelector((state) => {
    return state.bill.isError;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShop()).then((action) => {
      if (action?.payload?.success) {
        setFormData((prevData) => ({
          ...prevData,
          shop_details: action?.payload?.data?._id,
        }));
      }
    });

    dispatch(getAllCategories());
  }, [dispatch]);

  // validate bill on onchange
  function validateOnChange(name, value) {
    switch (name) {
      case "customer_name":
      case "customer_location":
        if (!value.trim()) return "This field is required";
        return "";

      case "customer_contact":
        if (!value.trim()) return "Contact is required";
        if (value.length != 10)
          return "Contact number are not equal to 10 digits";
        if (value < 0) return "Contact number must be a positive value";
        return "";

      case "total_bill":
        if (value <= 0) return "Total bill must be greater than zero";
        return "";

      case "quantity":
        if (value <= 0) return "Quantity must be greater than zero";
        return "";

      case "gstPercentage":
        if (productData.gstOpted && value <= 0)
          return "GST Percentage must be greater than zero";
        return "";

      default:
        return "";
    }
  }

  //  changehandler for the form data
  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    let error = validateOnChange(name, value);
    setErrors((prevData) => {
      return {
        ...prevData,
        [name]: error,
      };
    });
  };

  //  producthandler for the products
  const productHandler = (event) => {
    const { name, type, checked, value } = event.target;

    let error = validateOnChange(name, value);
    setErrors((prevData) => {
      return {
        ...prevData,
        [name]: error,
      };
    });

    if (name === "item_info") {
      productData.item_name =
        event.target.selectedOptions[0].getAttribute("data-item-name");
    }

    if (name === "gstOpted" && !checked) {
      setProductData((prevData) => {
        return {
          ...prevData,
          gstPercentage: 0,
          gst_amount: 0,
          total_amount: prevData.item_amount,
        };
      });
    }
    if (name === "quantity") {
      let required_item = items.filter((item, index) => {
        if (item._id === productData?.item_info) {
          return true;
        }
      });

      if (value !== "") {
        //  update this quantity in the form
        let item_amount = required_item[0]?.item_price * +value;
        setProductData((prevData) => {
          return {
            ...prevData,
            [name]: +value,
            item_amount,
            total_amount: item_amount,
          };
        });
      }
    }

    if (name === "gstPercentage") {
      let gst_amount = (+value / 100) * productData.item_amount;
      let total_amount = productData.item_amount + gst_amount;
      if (!productData.gstOpted) {
        total_amount = productData.item_amount;
      }
      setProductData((prevData) => {
        return {
          ...prevData,
          [name]: +value,
          gst_amount: prevData.gstOpted ? gst_amount : 0,
          total_amount,
        };
      });
    }

    // generalised updation
    const numericFields = [
      "quantity",
      "gstPercentage",
      "total_amount",
      "gst_amount",
      "item_amount",
    ];

    setProductData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : numericFields.includes(name)
          ? value === ""
            ? ""
            : +value
          : value,
    }));
  };

  // product  added to the formdata
  const createProduct = () => {
    let total_amount = 0;
    if (formData.purchased_items.length > 0) {
      //  already  items are  there
      total_amount = formData.purchased_items.reduce((accumulator, current) => {
        return accumulator + current.total_amount;
      }, 0);

      total_amount = total_amount + productData.total_amount;
    } else {
      total_amount = productData.total_amount;
    }

    setFormData((prevData) => ({
      ...prevData,
      purchased_items: [...prevData.purchased_items, productData],
      total_bill: total_amount,
    }));

    setProductData({
      item_info: "",
      quantity: 0,
      gstOpted: false,
      gstPercentage: 0,
      total_amount: 0,
      gst_amount: 0,
      item_amount: 0,
    });
  };

  //  submithandler for the form
  const submitHandler = (event) => {
    event.preventDefault();

    let action = Object.values(errors).every((error) => {
      return error === "";
    });

    if (action && formData.purchased_items.length > 0) {
      dispatch(createBill(formData)).then((action) => {
        if (action.payload.success) {
          navigate("/dashboard/bills");
        }
      });
    } else {
      toast.error("Please fix the errors before submitting");
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  } else if (isError) {
    return <ErrorDisplay></ErrorDisplay>;
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="w-75">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Generate Bill</h2>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customer_name"
                    placeholder="Enter the name of customer"
                    onChange={changeHandler}
                    value={formData.customer_name}
                  />

                  {errors.customer_name && (
                    <p className="text-danger small">{errors.customer_name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Customer Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customer_location"
                    placeholder="Enter the location of customer"
                    onChange={changeHandler}
                    value={formData.customer_location}
                  />
                  {errors.customer_location && (
                    <p className="text-danger small">
                      {errors.customer_location}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Customer Contact</label>
                  <input
                    type="number"
                    className="form-control"
                    name="customer_contact"
                    placeholder="Enter the contact number of customer"
                    onChange={changeHandler}
                    value={formData.customer_contact}
                  />
                  {errors.customer_contact && (
                    <p className="text-danger small">
                      {errors.customer_contact}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select
                    className="form-select"
                    name="category_id"
                    onChange={(event) => {
                      dispatch(
                        getAllCompanies({ category_id: event.target.value })
                      );
                    }}
                  >
                    <option value="">Select any category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* companies  */}
                <div className="mb-3">
                  <label className="form-label">Select Company</label>
                  <select
                    className="form-select"
                    name="company_id"
                    onChange={(event) => {
                      //  get items by company

                      dispatch(
                        getItemsByCompany({ company_id: event.target.value })
                      );
                    }}
                  >
                    <option value="">Select any company</option>
                    {companies.map((company, index) => (
                      <option key={index} value={company._id}>
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* items and all  */}

                <div className="mb-3">
                  <label className="form-label">Select Item</label>
                  <select
                    className="form-select"
                    name="item_info"
                    onChange={productHandler}
                    value={productData.item_info}
                  >
                    <option value="">Select any item</option>
                    {items.map((item) => (
                      <option
                        key={item._id}
                        data-item-name={item.item_name}
                        value={item._id}
                      >
                        {item.item_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    placeholder="Enter the Quantity"
                    onChange={productHandler}
                    value={productData.quantity}
                  />
                  {errors.quantity && (
                    <p className="text-danger small">{errors.quantity}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Item Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="item_amount"
                    placeholder="Enter the item  Amount"
                    onChange={productHandler}
                    value={productData.item_amount}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="gstOpted"
                    id="gstOpted"
                    onChange={productHandler}
                    checked={productData.gstOpted}
                  />
                  <label className="form-check-label" htmlFor="gstOpted">
                    Opt for GST
                  </label>
                </div>

                {productData.gstOpted && (
                  <div className="mb-3">
                    <label className="form-label">GST Percentage</label>
                    <input
                      type="number"
                      className="form-control"
                      name="gstPercentage"
                      placeholder="Enter the percentage"
                      onChange={productHandler}
                      value={productData.gstPercentage}
                    />
                    {errors.gstPercentage && (
                      <p className="text-danger small">
                        {errors.gstPercentage}
                      </p>
                    )}
                  </div>
                )}

                {productData.gstOpted && (
                  <div className="mb-3">
                    <label className="form-label">GST Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="gst_amount"
                      placeholder="Enter the total Amount"
                      readOnly
                      onChange={productHandler}
                      value={productData.gst_amount}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Total Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total_amount"
                    placeholder="Enter the total Amount"
                    onChange={productHandler}
                    value={productData.total_amount}
                  />
                  {errors.total_amount && (
                    <p className="text-danger small">{errors.total_amount}</p>
                  )}
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="button"
                    onClick={createProduct}
                    className="btn btn-secondary"
                  >
                    Add Item
                  </button>
                </div>

                <div className="mb-3">
                  <h5>Added Items</h5>
                  {formData.purchased_items.length > 0 ? (
                    formData.purchased_items.map((element, index) => (
                      <div key={index} className="border p-2 mb-2 rounded">
                        <p className="mb-0">Item Name : {element.item_name}</p>
                        <p className="mb-0">Quantity: {element.quantity}</p>
                        <p className="mb-0">
                          Item Amount: {element.item_amount}
                        </p>
                        <p className="mb-0">
                          Opted for GST : {element.gstOpted ? "Yes" : "No"}
                        </p>
                        <p className="mb-0">GST Amount: {element.gst_amount}</p>
                        <p className="mb-0">
                          Total Amount: {element.total_amount}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">
                      No items are added to bill yet.
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Total Bill</label>
                  <input
                    type="number"
                    className="form-control"
                    name="total_bill"
                    placeholder="Enter the total Bill"
                    onChange={changeHandler}
                    value={formData.total_bill}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Generate Bill
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

export default GenerateBill;
