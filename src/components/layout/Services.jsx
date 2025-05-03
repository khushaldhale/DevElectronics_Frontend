import React from "react";
import { motion } from "framer-motion";
import {
  HeadphonesIcon,
  Settings,
  PenTool as Tool,
  Music,
  Truck,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <HeadphonesIcon size={40} />,
      title: "Premium Audio Equipment",
      description:
        "Shop the latest and greatest audio equipment from top brands. From headphones to professional speakers, we have it all.",
      color: "primary",
    },
    {
      icon: <Music size={40} />,
      title: "DJ Equipment",
      description:
        "Professional DJ gear for performers of all levels. Mixers, controllers, turntables, and everything you need to rock the crowd.",
      color: "secondary",
    },
    {
      icon: <Tool size={40} />,
      title: "Expert Repair Services",
      description:
        "Our certified technicians can diagnose and repair all types of audio equipment with quick turnaround times.",
      color: "accent",
    },
    {
      icon: <Settings size={40} />,
      title: "Custom Installation",
      description:
        "On-site setup and installation services for home theaters, studio spaces, and professional venues.",
      color: "primary",
    },
    {
      icon: <Truck size={40} />,
      title: "Same-Day Delivery",
      description:
        "Get your equipment delivered to your doorstep the same day for local orders placed before 2 PM.",
      color: "secondary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const serviceVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="services" className="section bg-light bg-noise">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="display-5 fw-bold mb-3">What We Offer</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            We provide a comprehensive range of audio services and products to
            meet all your sound needs.
          </p>
        </motion.div>

        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              className="col-md-6 col-lg-4"
              key={index}
              variants={serviceVariants}
            >
              <div className="card h-100 border-0 shadow-sm card-hover-effect">
                <div className="card-body p-4">
                  <div
                    className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-${service.color} bg-opacity-10 p-3 mb-4`}
                    style={{ width: "80px", height: "80px" }}
                  >
                    <div className={`text-${service.color}`}>
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3">{service.title}</h3>
                  <p className="text-muted mb-4">{service.description}</p>
                  <a
                    href="#"
                    className={`btn btn-link text-${service.color} p-0 text-decoration-none d-flex align-items-center`}
                  >
                    Learn More <ArrowRight size={16} className="ms-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="row mt-5 pt-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="col-12">
            <div className="bg-primary rounded-4 overflow-hidden">
              <div className="row g-0 align-items-center">
                <div className="col-lg-6">
                  <div className="p-5 text-white">
                    <h3 className="h2 fw-bold mb-3">
                      Need Custom Audio Solutions?
                    </h3>
                    <p className="mb-4">
                      Our team of experts can design custom audio solutions for
                      your specific needs. From home theaters to professional
                      studio setups, we've got you covered.
                    </p>
                    <a href="#contact" className="btn btn-accent">
                      Get in Touch
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative">
                    <img
                      src="https://images.pexels.com/photos/4156467/pexels-photo-4156467.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="Custom audio setup"
                      className="img-fluid"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-25"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
