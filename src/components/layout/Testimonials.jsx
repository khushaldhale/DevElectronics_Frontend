import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Khushal Dhale",
      role: "Home Theater Enthusiast",
      text: "Dev Electronics has been my go-to for DJ equipment for years. The quality of their products and expertise of their staff are unmatched. They helped me set up my entire studio with top-notch gear.",
      image:
        " https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png",
      rating: 5,
    },
    {
      id: 2,
      name: "Kunal Sharma",
      role: "Professional DJ",
      text: "When my studio monitors needed repair, Dev Electronics had them fixed in no time. Their technical expertise and fast turnaround saved my recording session. Truly a lifesaver!",
      image:
        " https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png",
      rating: 5,
    },
    {
      id: 3,
      name: "Shreyash Patil",
      role: "Home Theater Enthusiast",
      text: "The custom installation team at Dev Electronics transformed my living room into an immersive home theater experience. Their attention to detail and sound calibration skills are exceptional.",
      image:
        " https://skiblue.co.uk/wp-content/uploads/2015/06/dummy-profile.png",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      className="section-sm bg-noise"
      style={{
        background:
          "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)",
      }}
    >
      <div className="container">
        <motion.div
          className="text-center text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="display-6 fw-bold mb-2">What Our Customers Say</h2>
          <p className="lead mb-0">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <motion.div
              className="card border-0 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="card-body p-5">
                <div className="d-flex justify-content-center mb-4">
                  <div className="position-relative">
                    <motion.div
                      key={testimonials[activeIndex].id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="position-relative d-inline-block mb-4">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="rounded-circle"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="position-absolute bottom-0 end-0 bg-primary p-2 rounded-circle">
                          <Quote size={20} className="text-white" />
                        </div>
                      </div>

                      <div className="mb-3">
                        {Array(testimonials[activeIndex].rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className="text-warning"
                              fill="#ffc107"
                            />
                          ))}
                      </div>

                      <p className="mb-4 px-lg-5 " style={{ fontSize: "18px" }}>
                        "{testimonials[activeIndex].text}"
                      </p>

                      <h5 className="fw-bold mb-1">
                        {testimonials[activeIndex].name}
                      </h5>
                      <p className="text-muted">
                        {testimonials[activeIndex].role}
                      </p>
                    </motion.div>
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-primary rounded-circle p-2"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`btn ${
                        index === activeIndex
                          ? "btn-primary"
                          : "btn-outline-primary"
                      } rounded-circle p-1`}
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => setActiveIndex(index)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-primary rounded-circle p-2"
                    onClick={handleNext}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
