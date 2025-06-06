import { useLocation, useParams } from "react-router-dom";
import withForm from "../../hoc/withForm";
import {
  createItem,
  particularItem,
  updateItem,
} from "../../redux/slices/itemSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { motion } from "framer-motion";
import { ImagePlus, Package } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";
import { getAllCompanies } from "../../redux/slices/companySlice";

const AddItem = ({
  changeHandler,
  submitHandler,
  formData,
  setFormData,
  imageHandler,
  errors,
}) => {
  const location = useLocation();
  const arrayPath = location.pathname.split("/");
  const requiredPath = arrayPath[arrayPath.length - 1];
  const dispatch = useDispatch();
  const params = useParams();
  const [previewImage, setPreviewImage] = useState(null);
  const categories = useSelector((state) => {
    return state?.category?.categories;
  });

  const companies = useSelector((state) => {
    return state?.company?.companies;
  });

  const isLoading = useSelector((state) => {
    return state?.item?.isLoading;
  });

  const isError = useSelector((state) => {
    return state?.item?.isError;
  });
  useEffect(() => {
    if (requiredPath === "update") {
      dispatch(particularItem({ _id: params.id })).then((action) => {
        if (action?.payload?.success) {
          setFormData(action?.payload?.data);
          dispatch(
            getAllCompanies({ category_id: action?.payload?.data?.category_id })
          );
          if (action?.payload?.data?.item_img) {
            setPreviewImage(action?.payload?.data?.item_img);
          }
        }
      });
    }

    dispatch(getAllCategories());
  }, [requiredPath, dispatch, params.id, setFormData]);

  const handleImageChange = (e) => {
    imageHandler(e);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <ErrorDisplay></ErrorDisplay>;
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <motion.div
            className="card shadow-sm border-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                  <Package size={32} className="text-primary" />
                </div>
                <h2 className="h4 mb-1">
                  {requiredPath === "update" ? "Update" : "Add New"} Item
                </h2>
                <p className="text-muted">
                  Enter the details of your audio equipment
                </p>
              </div>

              <form onSubmit={submitHandler}>
                <div className="form-floating mb-3">
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
                  <label htmlFor="item_name">Item Name</label>
                  {errors.item_name && (
                    <p className="text-danger small"> {errors.item_name}</p>
                  )}
                </div>

                <div className="form-floating mb-3">
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
                  <label htmlFor="item_desc">Description</label>
                  {errors.item_desc && (
                    <p className="text-danger small"> {errors.item_desc}</p>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="item_price"
                      name="item_price"
                      placeholder="Enter the item price"
                      onChange={changeHandler}
                      value={formData.item_price}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  {errors.item_price && (
                    <p className="text-danger small"> {errors.item_price}</p>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    name="category_id"
                    id="category_id"
                    onChange={(event) => {
                      //   get companies  here
                      dispatch(
                        getAllCompanies({ category_id: event.target.value })
                      );
                      changeHandler(event);
                    }}
                    value={formData.category_id}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.length > 0 &&
                      categories.map((category, index) => (
                        <option key={index} value={category?._id}>
                          {category?.category_name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="category_id">Category</label>
                  {errors.category_id && (
                    <p className="text-danger small"> {errors.category_id}</p>
                  )}
                </div>

                {/*  when the category is selected we will get companies and
                 display them  */}

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    name="company_id"
                    id="company_id"
                    onChange={changeHandler}
                    value={formData.company_id}
                    required
                  >
                    {/* get companies out here */}
                    <option value="">Select a company</option>
                    {companies.length > 0 &&
                      companies.map((company, index) => (
                        <option key={index} value={company?._id}>
                          {company?.company_name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="company_id">Company</label>
                  {errors.company_id && (
                    <p className="text-danger small"> {errors.company_id}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label d-block mb-3">Item Image</label>
                  <div className="d-flex gap-3 align-items-center">
                    <div
                      className="position-relative bg-light rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "120px",
                        height: "120px",
                        overflow: "hidden",
                      }}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <ImagePlus size={32} className="text-muted" />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <input
                        type="file"
                        className="form-control"
                        id="item_img"
                        name="item_img"
                        onChange={handleImageChange}
                        accept="image/*"
                        {...(requiredPath !== "update" && { required: true })}
                      />
                      <small className="text-muted d-block mt-2">
                        Recommended: Square image (1:1 ratio) for best display
                      </small>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary w-100 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package size={18} className="me-2" />
                  {requiredPath === "update" ? "Update" : "Add"} Item
                </motion.button>
              </form>
            </div>
          </motion.div>
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
      item_price: "",
      item_img: null,
      category_id: "",
      company_id: "",
    },
    isUpdate ? updateItem : createItem,
    "/dashboard/items",
    "items"
  );
  return <DynamicForm {...props} />;
};

export default AddItemWrapper;
