import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "react-toastify";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Logo size="md" colorScheme="light" className="mb-4" />
              <p className="mb-4">
                Premier destination for high-quality audio equipment,
                professional DJ gear, and expert repair services. Your sound,
                our passion.
              </p>
            </motion.div>
          </div>

          <div className="col-lg-2 col-md-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h5 className="mb-4 fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#home"
                    className="text-white text-decoration-none hover-bright"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#services"
                    className="text-white text-decoration-none hover-bright"
                  >
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#products"
                    className="text-white text-decoration-none hover-bright"
                  >
                    Products
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#about"
                    className="text-white text-decoration-none hover-bright"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#contact"
                    className="text-white text-decoration-none hover-bright"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="col-lg-3 col-md-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h5 className="mb-4 fw-bold">Contact Us</h5>
              <div className="mb-3 d-flex align-items-start">
                <MapPin size={20} className="me-2 text-accent mt-1" />
                <span>
                  331/332/A, KOSHTI GALLI, RAVIWAR PETH, KARAD, SATARA, MH -
                  415110
                </span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Phone size={20} className="me-2 text-accent" />
                <span>8805802199</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Mail size={20} className="me-2 text-accent" />
                <span>devdas.repal81@gmail.com</span>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-3 col-md-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h5 className="mb-4 fw-bold">Newsletter</h5>
              <p className="mb-3">
                Subscribe to get the latest deals and updates!
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (email) {
                    toast.success(
                      "Subscribed to News Letter for upcoming updates"
                    );
                  }
                }}
              >
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                    aria-label="Your email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-primary text-white"
                    type="submit"
                    id="button-addon2"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="border-top border-secondary mt-4 pt-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="small mb-0">
            © {2025} Dev Electronics. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
