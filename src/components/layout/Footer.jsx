import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              <div className="d-flex gap-3">
                <a href="#" className="text-white hover-bright">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover-bright">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-white hover-bright">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white hover-bright">
                  <Youtube size={20} />
                </a>
              </div>
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
                <span>123 Audio Street, Soundville, SV 12345</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Phone size={20} className="me-2 text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Mail size={20} className="me-2 text-accent" />
                <span>info@develectronics.com</span>
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
              <form>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                    aria-label="Your email"
                  />
                  <button
                    className="btn btn-accent"
                    type="button"
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
            © {currentYear} Dev Electronics. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
