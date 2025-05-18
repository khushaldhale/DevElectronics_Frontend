import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  function changeHandler(event) {
    const { name, type, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contacts`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setFormData({
        fname: "",
        lname: "",
        email: "",
        contact: "",
        subject: "",
        message: "",
      });

      if (!response.ok) {
        toast.error("Unable to contact");
        return;
      }

      toast.success("Query is submitted successfully");
    } catch (error) {
      console.log(error);
    }
  }
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

                <form onSubmit={submitHandler}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="fname"
                          placeholder="First Name"
                          onChange={changeHandler}
                          value={formData.fname}
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
                          name="lname"
                          onChange={changeHandler}
                          value={formData.lname}
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
                          name="email"
                          onChange={changeHandler}
                          value={formData.email}
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
                          name="contact"
                          onChange={changeHandler}
                          value={formData.contact}
                        />
                        <label htmlFor="phone">Phone Number</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      name="subject"
                      onChange={changeHandler}
                      value={formData.subject}
                      className="form-select"
                      id="subject"
                    >
                      <option value={""}>Select any option</option>

                      <option value={"Product Inquiry"}>Product Inquiry</option>
                      <option value={"Repair Service"}>Repair Service</option>
                      <option value={"Custom Installation"}>
                        Custom Installation
                      </option>
                      <option value={"Other"}>Other</option>
                    </select>
                    <label htmlFor="subject">Subject</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      id="message"
                      placeholder="Your Message"
                      style={{ height: "150px" }}
                      name="message"
                      onChange={changeHandler}
                      value={formData.message}
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
