import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "react-toastify";
import ContactForm from "./ContcatForm";

const ContactUs = () => {
  return (
    <section id="contact" className="section bg-light">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge bg-primary text-white px-3 py-2 mb-3">
            Contact Us
          </span>
          <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Have questions about our products or services? We're here to help!
          </p>
        </motion.div>

        <div className="row g-5">
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="h4 fw-bold mb-4">Contact Information</h3>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                    <MapPin className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="h6 fw-bold">Our Location</h4>
                  <p className="text-muted mb-0">
                    331/332/A, KOSHTI GALLI, RAVIWAR PETH, KARAD, SATARA, MH -
                    415110
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                    <Phone className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="h6 fw-bold">Phone Number</h4>
                  <p className="text-muted mb-0">9067577171</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                    <Mail className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="h6 fw-bold">Email Address</h4>
                  <p className="text-muted mb-0">devdas.repal81@gmail.com</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0 me-3">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                    <Clock className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h4 className="h6 fw-bold">Working Hours</h4>
                  <p className="text-muted mb-0">
                    Mon - Fri: 9:00 AM - 8:00 PM
                    <br />
                    Saturday: 10:00 AM - 6:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mt-5 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.5543609357373!2d74.17907257462487!3d17.28878180563946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc182488c17210f%3A0x90fe7aea0db9b480!2sKoshti%20Galli%2C%20Karad%2C%20Maharashtra%20415110!5e0!3m2!1sen!2sin!4v1746333396060!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Map"
                ></iframe>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-7">
            <motion.div
              className="card border-0 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-body p-4 p-lg-5">
                <h3 className="h4 fw-bold mb-4">Send us a Message</h3>

                {/*  contact form */}
                <ContactForm></ContactForm>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
