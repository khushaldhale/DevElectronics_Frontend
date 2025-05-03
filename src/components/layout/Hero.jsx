import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="home"
      className="hero-section d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-5">
            <motion.div
              className="text-white"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                className=" bg-accent text-white mb-3 fs-6"
                variants={itemVariants}
              >
                Premium Audio Experience
              </motion.span>

              <motion.h1
                className="display-3 fw-bold mb-4"
                variants={itemVariants}
              >
                Unleash The Power of <span className="text-accent">Sound</span>
              </motion.h1>

              <motion.p className="fs-5 mb-5" variants={itemVariants}>
                Discover top-quality audio equipment, professional DJ gear, and
                expert repair services at Dev Electronics - where passion for
                sound meets cutting-edge technology.
              </motion.p>

              <motion.div
                className="d-flex gap-3 flex-wrap"
                variants={buttonVariants}
              >
                <div className="btn btn-outline-light btn-lg">
                  Scroll Up To Explore Our Services{" "}
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="col-lg-6 d-none d-lg-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div className="position-relative">
              <img
                src="https://images.pexels.com/photos/16953468/pexels-photo-16953468/free-photo-of-back-view-of-man-in-headphones.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="High-end audio equipment"
                className="img-fluid rounded-4 shadow h-75"
              />

              <motion.div
                className="position-absolute bg-dark bg-opacity-75 text-white p-3 rounded-3"
                style={{ bottom: "30px", right: "-20px" }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="d-flex align-items-center">
                  <div className="fs-1 fw-bold me-2 text-accent">15+</div>
                  <div className="small">
                    Years of
                    <br />
                    Excellence
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
