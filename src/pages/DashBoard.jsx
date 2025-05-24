import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  PlusCircle,
  ReceiptText,
  Columns as ChartColumnStacked,
  BadgePlus,
  LaptopMinimalCheck,
  LogOut,
} from "lucide-react";
import Logo from "../components/layout/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-decoration-none d-block py-2 px-3 ${
      isActive ? "text-primary" : "text-muted"
    }`;

  return (
    <div className="min-vh-100 bg-light position-relative">
      <div className="container-fluid">
        <div className="row">
          {/* Header */}
          <div
            className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 fixed-top"
            style={{ zIndex: 1040, height: "70px" }}
          >
            <Logo size="md" />
            <button
              className="btn btn-outline-secondary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="bi bi-list"></i> Menu
            </button>
          </div>

          {/* Main Content */}
          <motion.div
            className="col-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ paddingTop: "80px" }}
          >
            <div className="bg-white rounded-4 shadow-sm p-0 p-sm-4">
              <Outlet />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1049 }}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Right Slide Menu */}
      <motion.div
        ref={menuRef}
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="position-fixed top-0 end-0 bg-white shadow p-4"
        style={{ height: "100vh", width: "280px", zIndex: 1050 }}
      >
        <h5 className="mb-4">Dashboard Menu</h5>
        <div className="mb-3">
          <div className="text-muted small mb-2">Items</div>
          <NavLink
            to="/dashboard/items"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Manage Items
          </NavLink>
          <NavLink
            to="/dashboard/items/add"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Add New Item
          </NavLink>
        </div>
        <div className="mb-3">
          <div className="text-muted small mb-2">Bills</div>
          <NavLink
            to="/dashboard/bills"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Manage Bills
          </NavLink>
          <NavLink
            to="/dashboard/bill/generate"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Generate Bill
          </NavLink>

          <NavLink
            to="/dashboard/bills/search"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Search Bill
          </NavLink>
        </div>
        <div className="mb-3">
          <div className="text-muted small mb-2">Categories</div>
          <NavLink
            to="/dashboard/categories"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Manage Categories
          </NavLink>
          <NavLink
            to="/dashboard/categories/create"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Create Category
          </NavLink>
        </div>
        <div className="mb-3">
          <div className="text-muted small mb-2">Brands</div>
          <NavLink
            to="/dashboard/brands"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Manage Brands
          </NavLink>
          <NavLink
            to="/dashboard/brands/create"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Create Brand
          </NavLink>
        </div>
        <button
          onClick={() => {
            dispatch(logout()).then((action) => {
              if (action.payload.success) {
                navigate("/");
              }
            });
          }}
          className="btn btn-outline-danger w-100 d-flex align-items-center"
        >
          <LogOut size={20} className="me-2" /> Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
