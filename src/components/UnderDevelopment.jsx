import React from "react";
import { motion } from "framer-motion";

const UnderDevelopment = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card shadow-sm p-5 text-center border-0"
      >
        <h2 className="display-6 mb-3">Under Development</h2>
        <p className="text-muted">
          Our website is currently under development. We will provide online
          services soon.
        </p>
      </motion.div>
    </div>
  );
};

export default UnderDevelopment;
