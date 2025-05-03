import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "../../redux/slices/shopSlice";
import { getAllItems } from "../../redux/slices/itemSlice";
import { createBill } from "../../redux/slices/billSlice";
import { useNavigate } from "react-router-dom";

//  total_amount should not be set and
//  handle gst ,  checked or not , that case
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
  });

  const items = useSelector((state) => state.item.items);
  const shop = useSelector((state) => state.shop.shopDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShop()).then((action) => {
      if (action.payload.success) {
        setFormData((prevData) => ({
          ...prevData,
          shop_details: action.payload.data._id,
        }));
      }
    });
    dispatch(getAllItems());
  }, [dispatch]);

  //  changehandler for the form data
  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //  producthandler for the products
  const productHandler = (event) => {
    const { name, type, checked, value } = event.target;

    if (name === "gstOpted" && !checked) {
      console.log("have  to remove percentage");
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
        if (item._id === productData.item_info) {
          return true;
        }
      });

      if (value !== "") {
        //  update this quantity in the form
        let item_amount = required_item[0]?.price * +value;
        console.log("data ", required_item, typeof +value, +value, item_amount);
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

    dispatch(createBill(formData)).then((action) => {
      if (action.payload.success) {
        navigate("/dashboard/bills");
      }
    });
  };

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
                </div>

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
                        data-item-price={item.price}
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
                        <p className="mb-0">Item ID: {element.item_info}</p>
                        <p className="mb-0">Quantity: {element.quantity}</p>
                        <p className="mb-0">
                          Item Amount: {element.item_amount}
                        </p>
                        <p className="mb-0">
                          Opted for GST ?: {element.gstOpted ? "True" : "False"}
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
