import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderPlus } from "lucide-react";
import withForm from "../../hoc/withForm";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { createCompany } from "../../redux/slices/companySlice";

const CreateBrand = ({ changeHandler, submitHandler, formData, errors }) => {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="row justify-content-center"
      >
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                  <FolderPlus size={32} className="text-primary" />
                </div>
                <h2 className="h4">Create New Brand</h2>
                <p className="text-muted">
                  Add a new brand associated with a category
                </p>
              </div>
              <form onSubmit={submitHandler}>
                <div className="form-floating mb-2">
                  <select
                    name="category_id"
                    id="category_id"
                    className="form-select"
                    onChange={changeHandler}
                    value={formData.category_id}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category_name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="category_id">Category</label>
                  {errors.category_id && (
                    <p className="text-danger small">{errors.category_id}</p>
                  )}
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="form-control"
                    placeholder="Enter the Name of Company"
                    onChange={changeHandler}
                    value={formData.company_name}
                    required
                  />
                  <label htmlFor="company_name">Brand Name</label>
                  {errors.company_name && (
                    <p className="text-danger small">{errors.company_name}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary w-100 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FolderPlus size={18} className="me-2" />
                  Create Brand
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default withForm(
  CreateBrand,
  { category_id: "", company_name: "" },
  createCompany,
  "/dashboard/brands",
  "brand"
);
