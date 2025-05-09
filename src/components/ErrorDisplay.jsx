import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorDisplay = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mb-6 text-accent-500"
      >
        <AlertCircle size={48} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-3">Oops!</h2>
        <p className="text-dark-300 mb-6 max-w-md">{message}</p>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-accent"
            onClick={onRetry}
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;
