import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  PlusCircle,
  LayoutDashboard,
  Settings,
  LogOut,
  ReceiptText,
  ChartColumnStacked,
  BadgePlus,
} from "lucide-react";
import Logo from "../components/layout/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => {
    return state.auth.userInfo;
  });

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
            className="col-auto min-vh-100 bg-white shadow-sm p-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "280px" }}
          >
            <div className="mb-5">
              <Logo size="md" />
            </div>

            <nav className="mb-5">
              <div className="text-muted small mb-3">MAIN MENU</div>
              {/*  willl show analytics of sales later on here */}

              {/* <NavLink to="/dashboard" end className={navLinkClass}>
                <LayoutDashboard size={20} className="me-3" />
                Dashboard Overview
              </NavLink> */}

              <NavLink to="/dashboard/items" end className={navLinkClass}>
                <Package size={20} className="me-3" />
                Manage Items
              </NavLink>
              <NavLink to="/dashboard/items/add" end className={navLinkClass}>
                <PlusCircle size={20} className="me-3" />
                Add New Item
              </NavLink>
              <NavLink
                to="/dashboard/bill/generate"
                end
                className={navLinkClass}
              >
                <PlusCircle size={20} className="me-3" />
                Generate Bill
              </NavLink>

              <NavLink to="/dashboard/bills" end className={navLinkClass}>
                <ReceiptText size={20} className="me-3" />
                Manage Bills
              </NavLink>

              <NavLink
                to="/dashboard/categories/create"
                end
                className={navLinkClass}
              >
                <BadgePlus size={20} className="me-3" />
                Create Category
              </NavLink>

              <NavLink to="/dashboard/categories" end className={navLinkClass}>
                <ChartColumnStacked size={20} className="me-3" />
                Manage Categories
              </NavLink>
            </nav>

            <div className="mt-auto">
              <div className="text-muted small mb-3">SETTINGS</div>
              <button className="w-100 d-flex align-items-center py-3 px-4 text-decoration-none text-muted rounded-3 mb-2">
                <Settings size={20} className="me-3" />
                Account Settings
              </button>
              <button
                onClick={() => {
                  dispatch(logout()).then((action) => {
                    if (action.payload.success) {
                      navigate("/login");
                    }
                  });
                }}
                className="w-100 d-flex align-items-center py-3 px-4 text-decoration-none text-danger rounded-3"
              >
                <LogOut size={20} className="me-3" />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h1 className="h3 fw-bold mb-2">Dashboard</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <a href="#" className="text-decoration-none text-muted">
                          Home
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Dashboard
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="d-flex align-items-center">
                  <div className="position-relative me-3">
                    <img
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="Admin"
                      className="rounded-circle"
                      width="40"
                      height="40"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                      style={{ width: "10px", height: "10px" }}
                    ></span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-semibold">
                      {userInfo.fname + "  " + userInfo.lname}
                    </h6>
                    <small className="text-muted">{userInfo.accountType}</small>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="bg-white rounded-4 shadow-sm p-4">
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
