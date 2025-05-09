import React from "react";
import { CheckCircle, Headphones, Award, Users } from "lucide-react";

const AboutUs = () => {
  const stats = [
    {
      icon: <Headphones size={30} />,
      count: "10k+",
      label: "Products Sold",
    },
    {
      icon: <Users size={30} />,
      count: "5k+",
      label: "Happy Customers",
    },
    {
      icon: <Award size={30} />,
      count: "15+",
      label: "Years Experience",
    },
  ];

  const features = [
    "Premium quality audio equipment from top brands",
    "Expert technicians with decades of experience",
    "Personalized customer service",
    "Comprehensive warranty on all products",
    "After-sales support and maintenance",
  ];

  return (
    <section id="about" className="section bg-white">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="badge bg-primary text-white px-3 py-2 mb-3">
              About Us
            </span>
            <h2 className="display-5 fw-bold mb-4">
              The Sound Revolution Since 2010
            </h2>

            <p className="lead mb-4">
              Dev Electronics has been at the forefront of audio technology for
              over 15 years, providing music enthusiasts, professionals, and
              audiophiles with the very best in sound equipment.
            </p>

            <p className="text-muted mb-4">
              What started as a small repair shop has grown into a comprehensive
              audio destination, offering sales, repairs, custom installations,
              and professional consulting services. Our passion for perfect
              sound drives everything we do.
            </p>

            <ul className="list-unstyled mb-5">
              {features.map((feature, index) => (
                <li key={index} className="d-flex align-items-center mb-3">
                  <CheckCircle className="text-primary me-3" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="row g-4">
              {stats.map((stat, index) => (
                <div className="col-md-4" key={index}>
                  <div className="border rounded-4 p-4 text-center h-100">
                    <div className="text-primary mb-2">{stat.icon}</div>
                    <div className="display-6 fw-bold mb-1">{stat.count}</div>
                    <div className="small text-muted">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1600"
                alt="Dev Electronics store interior"
                className="img-fluid rounded-4 shadow"
              />

              <div
                className="position-absolute bg-white shadow p-4 rounded-4"
                style={{ bottom: "30px", right: "-30px", maxWidth: "250px" }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="devdas.jpeg"
                    alt="John Doe"
                    className="rounded-circle me-3"
                    width="80"
                    height="80"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">Devdas Repal</h5>
                    <span className="small text-muted">Founder & CEO</span>
                  </div>
                </div>
                <p className="small fst-italic mb-0">
                  "Our mission is to bring the perfect audio experience to
                  everyone."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
