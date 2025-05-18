import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  PlusCircle,
  House,
  LaptopMinimalCheck,
  Settings,
  LogOut,
  ReceiptText,
  Columns as ChartColumnStacked,
  BadgePlus,
} from "lucide-react";
import Logo from "../components/layout/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const navLinkClass = ({ isActive }) =>
    `d-flex align-items-center py-3 px-4 text-decoration-none ${
      isActive ? "bg-primary text-white" : "text-muted"
    } rounded-3 mb-2 transition-all`;

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <motion.div
            className="col-auto position-fixed start-0 min-vh-100 bg-white shadow-sm p-4 overflow-auto"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "280px", zIndex: 1030, maxHeight: "100vh" }}
          >
            <div className="mb-5">
              <Logo size="md" />
            </div>

            <nav className="mb-5">
              <div className="text-muted small mb-3">MAIN MENU</div>
              <NavLink to="/dashboard/items" end className={navLinkClass}>
                <Package size={20} className="me-3" />
                Manage Items
              </NavLink>
              <NavLink to="/dashboard/items/add" end className={navLinkClass}>
                <PlusCircle size={20} className="me-3" />
                Add New Item
              </NavLink>
              <NavLink to="/dashboard/bills" end className={navLinkClass}>
                <ReceiptText size={20} className="me-3" />
                Manage Bills
              </NavLink>
              <NavLink
                to="/dashboard/bill/generate"
                end
                className={navLinkClass}
              >
                <PlusCircle size={20} className="me-3" />
                Generate Bill
              </NavLink>
              <NavLink to="/dashboard/categories" end className={navLinkClass}>
                <ChartColumnStacked size={20} className="me-3" />
                Manage Categories
              </NavLink>
              <NavLink
                to="/dashboard/categories/create"
                end
                className={navLinkClass}
              >
                <BadgePlus size={20} className="me-3" />
                Create Category
              </NavLink>
              <NavLink to="/dashboard/brands" end className={navLinkClass}>
                <LaptopMinimalCheck size={20} className="me-3" />
                Manage Brands
              </NavLink>
              <NavLink
                to="/dashboard/brands/create"
                end
                className={navLinkClass}
              >
                <PlusCircle size={20} className="me-3" />
                Create Brand
              </NavLink>
            </nav>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginLeft: "280px" }}
          >
            <div className="p-4">
              <div
                className="d-flex justify-content-between align-items-center mb-2 bg-white shadow-sm p-3 fixed-top"
                style={{ zIndex: 1040, marginLeft: "280px", height: "70px" }}
              >
                <div>
                  <nav aria-label="breadcrumb">
                    <NavLink to="/" className="text-decoration-none text-muted">
                      <House size={20} className="me-2" /> Home
                    </NavLink>
                  </nav>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() => {
                      dispatch(logout()).then((action) => {
                        if (action.payload.success) {
                          navigate("/");
                        }
                      });
                    }}
                    className="btn btn-outline-danger w-100 d-flex align-items-center py-3 px-4 text-decoration-none text-danger rounded-3"
                  >
                    <LogOut size={20} className="me-3" />
                    Logout
                  </button>
                </div>
              </div>
              <div
                className="bg-white rounded-4 shadow-sm p-4"
                style={{ marginTop: "80px" }}
              >
                <Outlet />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
