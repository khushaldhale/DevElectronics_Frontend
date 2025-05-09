import React from "react";
import { motion } from "framer-motion";
import { FolderPlus } from "lucide-react";
import withForm from "../../hoc/withForm";
import { createCategory } from "../../redux/slices/categorySlice";

const CreateCategory = ({ changeHandler, submitHandler, formData }) => {
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
                <h2 className="h4">Create New Category</h2>
                <p className="text-muted">
                  Add a new category for audio equipment
                </p>
              </div>

              <form onSubmit={submitHandler}>
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="category_name"
                    name="category_name"
                    placeholder="Enter the Category"
                    onChange={changeHandler}
                    value={formData.category_name}
                    required
                  />
                  <label htmlFor="category_name">Category Name</label>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary w-100 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FolderPlus size={18} className="me-2" />
                  Create Category
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
  CreateCategory,
  { category_name: "" },
  createCategory,
  "/dashboard/categories"
);
