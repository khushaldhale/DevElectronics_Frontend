import React from "react";
import { motion } from "framer-motion";
import { UserCircle, Lock, LogIn } from "lucide-react";
import withForm from "../hoc/withForm";
import { login } from "../redux/slices/authSlice";
import Logo from "../components/layout/Logo";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";

const Login = ({ changeHandler, submitHandler, formData }) => {
  const isLoading = useSelector((state) => {
    return state?.auth?.isLoading;
  });
  const isError = useSelector((state) => {
    return state?.auth?.isError;
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  } else if (isError) {
    return <ErrorDisplay></ErrorDisplay>;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light bg-noise">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card border-0 shadow-lg"
            >
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <Logo size="lg" className="mb-4" />
                  <h2 className="fw-bold mb-3">Welcome Back!</h2>
                  <p className="text-muted">Please login to your account</p>
                </div>

                <form onSubmit={submitHandler}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-4"
                  >
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={changeHandler}
                        value={formData.email}
                      />
                      <label
                        htmlFor="email"
                        className="d-flex align-items-center"
                      >
                        <UserCircle size={18} className="me-2 text-primary" />
                        Email Address
                      </label>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-4"
                  >
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={changeHandler}
                        value={formData.password}
                      />
                      <label
                        htmlFor="password"
                        className="d-flex align-items-center"
                      >
                        <Lock size={18} className="me-2 text-primary" />
                        Password
                      </label>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="d-grid"
                  >
                    <button type="submit" className="btn btn-primary btn-lg">
                      <LogIn size={18} className="me-2" />
                      Sign In
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center mt-4"
                  >
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <a href="#" className="text-primary fw-semibold">
                        Sign Up
                      </a>
                    </p>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center mt-4"
            >
              <p className="text-muted small mb-0">
                © {new Date().getFullYear()} Dev Electronics. All rights
                reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withForm(
  Login,
  {
    email: "",
    password: "",
  },
  login,
  "/dashboard/items"
);
