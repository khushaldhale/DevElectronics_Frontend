import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Package } from "lucide-react";
import { getAllCategories } from "../../redux/slices/categorySlice";
import {
  deleteCompany,
  getAllCompanies,
} from "../../redux/slices/companySlice";

const Brands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const categories = useSelector((state) => state.category.categories);
  const companies = useSelector((state) => state.company.companies);

  function changeHandler(event) {
    setCategory(event.target.value);
    if (event.target.value !== "") {
      dispatch(getAllCompanies({ category_id: event.target.value }));
    }
  }

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <h2 className="display-5 mb-4">Select Category to View Brands</h2>
      </motion.div>

      <div className="mb-4">
        <select
          name="category_id"
          id="category_id"
          className="form-select p-3"
          onChange={changeHandler}
        >
          <option value="">Select any category</option>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <option className="p-2" key={index} value={category._id}>
                {category.category_name}
              </option>
            ))}
        </select>
      </div>

      {category !== "" && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            {companies.length > 0 ? (
              <div className="row g-3">
                {companies.map((company, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="col-md-4"
                  >
                    <div className="card border-0 shadow-sm">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span className="text-muted">
                          {company.company_name}
                        </span>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            dispatch(deleteCompany({ company_id: company._id }))
                          }
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <Package size={48} className="text-muted mb-3" />
                <p className="text-muted mb-0">No companies created yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
