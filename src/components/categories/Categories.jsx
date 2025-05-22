import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Trash2, Package, ChevronRight } from "lucide-react";
import {
  deleteCategory,
  getAllCategories,
  getItemsByCategory,
} from "../../redux/slices/categorySlice";
import { toast } from "react-toastify";
import ItemCard from "../items/ItemCard";

const Categories = () => {
  const categories = useSelector((state) => state?.category?.categories);
  const [isVisible, setIsVisible] = useState(true);
  const particularCatItems = useSelector(
    (state) => state?.category?.particularCatItems
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <h2 className="display-5 mb-4">Product Categories</h2>
        <p className="lead text-muted">
          Browse our extensive collection of audio equipment by category
        </p>
      </motion.div>

      <div className="row mb-5">
        <div className="col-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="card shadow-sm border-0"
          >
            <div className="card-body p-0">
              {categories.length > 0 ? (
                <div className="row g-0">
                  {categories.map((category, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="col-12 col-md-6 col-lg-3 border-end"
                    >
                      <div className="p-4">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <Package className="text-primary me-1" size={24} />
                            <span>{category?.category_name}</span>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-primary btn-sm me-1"
                              onClick={() => {
                                dispatch(
                                  getItemsByCategory({ _id: category?._id })
                                );
                                setIsVisible(false);
                              }}
                            >
                              <ChevronRight size={18} />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                dispatch(
                                  deleteCategory({ _id: category?._id })
                                ).then((action) => {
                                  if (action.payload.success) {
                                    toast.success(action.payload.message);
                                  }
                                });
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <Package size={48} className="text-muted mb-3" />
                  <p className="text-muted mb-0">No categories available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card shadow-sm border-0"
          >
            <div className="card-body">
              {isVisible ? (
                <div className="text-center py-5">
                  <Package size={48} className="text-muted mb-3" />
                  <p className="text-muted mb-0">
                    Select a category to view items
                  </p>
                </div>
              ) : (
                <div className="row g-4">
                  {particularCatItems.length > 0 ? (
                    particularCatItems.map((item, index) => (
                      <ItemCard
                        key={index}
                        index={index}
                        item={item}
                        required_path={"categories"}
                      />
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <p className="text-muted mb-0">
                        No items in this category
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
