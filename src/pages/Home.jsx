import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Services from "../components/layout/Services";
import Products from "../components/layout/Products";
import AboutUs from "../components/layout/AboutUs";
import Testimonials from "../components/layout/Testimonials";
import ContactUs from "../components/layout/ContactUs";
import Footer from "../components/layout/Footer";

const Home = () => {
  useEffect(() => {
    // Set page title
    document.title = "Dev Electronics - Premium Audio Equipment";
  }, []);

  return (
    <div className="home-container">
      <Header />
      <Hero />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Services />
        <Products />
        <AboutUs />
        <Testimonials />
        <ContactUs />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
