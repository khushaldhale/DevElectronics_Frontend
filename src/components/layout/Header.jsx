import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Detect scroll and close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5 },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "About Us", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Mobile Toggle Button Always Visible on Top */}
      <div
        className="d-lg-none position-fixed top-0 end-0 mt-2 me-3 z-1035"
        style={{ zIndex: 1040 }}
      >
        <button
          className={`navbar-toggler border-0 ${
            scrolled ? "text-dark" : "text-white"
          }`}
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={28} color="white" /> : <Menu size={28} />}
        </button>
      </div>

      <motion.nav
        className={`navbar navbar-expand-lg fixed-top ${
          scrolled ? "bg-white shadow" : "bg-transparent"
        }`}
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            <Logo size="md" colorScheme={scrolled ? "dark" : "light"} />
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {menuItems.map((item, i) => (
                <motion.li
                  className="nav-item"
                  key={item.id}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a
                    className={`nav-link ${
                      scrolled ? "text-dark" : "text-white"
                    }`}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}

              <motion.li className="nav-item" variants={navItemVariants}>
                <NavLink
                  className={`nav-link ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </NavLink>
              </motion.li>

              <motion.li className="nav-item" variants={navItemVariants}>
                <NavLink
                  className={`nav-link ${
                    scrolled ? "text-dark" : "text-white"
                  }`}
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <motion.div
        className="position-fixed top-0 end-0 h-100 bg-dark text-white p-4 d-flex flex-column w-75 d-lg-none"
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        style={{ zIndex: 1030 }}
      >
        <ul className="navbar-nav pt-5">
          {menuItems.map((item, i) => (
            <motion.li
              className="nav-item mb-2"
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <a
                className="nav-link text-white"
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.name}
              </a>
            </motion.li>
          ))}

          <motion.li className="nav-item mb-2">
            <NavLink
              className="nav-link text-white"
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </NavLink>
          </motion.li>

          <motion.li className="nav-item">
            <NavLink
              className="nav-link text-white"
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          </motion.li>
        </ul>

        <div className="mt-auto">
          <button className="btn btn-accent w-100 mb-3">Shop Now</button>
          <p className="text-light small">© 2025 Dev Electronics</p>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
