import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

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
                    123 Audio Street, Soundville, SV 12345
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
                  <p className="text-muted mb-0">+1 (555) 123-4567</p>
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
                  <p className="text-muted mb-0">info@develectronics.com</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3040591144004!2d-73.98825118459412!3d40.748440679326604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1645048203325!5m2!1sen!2sus"
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

                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                        />
                        <label htmlFor="firstName">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                        />
                        <label htmlFor="lastName">Last Name</label>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email Address"
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Phone Number"
                        />
                        <label htmlFor="phone">Phone Number</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <select className="form-select" id="subject">
                      <option>Product Inquiry</option>
                      <option>Repair Service</option>
                      <option>Custom Installation</option>
                      <option>Other</option>
                    </select>
                    <label htmlFor="subject">Subject</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      id="message"
                      placeholder="Your Message"
                      style={{ height: "150px" }}
                    ></textarea>
                    <label htmlFor="message">Your Message</label>
                  </div>

                  <motion.button
                    className="btn btn-primary btn-lg px-5 py-3"
                    type="submit"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} className="me-2" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
