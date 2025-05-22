import { motion } from "framer-motion";
import ContactForm from "./layout/ContcatForm";

const UnderDevelopment = () => {
  return (
    <div>
      <div className="container d-flex gap-4 flex-column justify-content-start align-items-center min-vh-100">
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
          <p>Kindly provide your data our Admin will connect you </p>
        </motion.div>

        <ContactForm></ContactForm>
      </div>
    </div>
  );
};

export default UnderDevelopment;
