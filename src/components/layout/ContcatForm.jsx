import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation logic
  function validate(name, value) {
    let error = "";

    switch (name) {
      case "fname":
        if (!value.trim()) error = "First name is required";
        break;
      case "lname":
        if (!value.trim()) error = "Last name is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email address";
        break;
      case "contact":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[0-9]{10}$/.test(value))
          error = "Enter valid 10-digit number";
        break;
      case "subject":
        if (!value.trim()) error = "Please select a subject";
        break;
      case "message":
        if (!value.trim()) error = "Message cannot be empty";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validate(name, value); // Validate on change
  }

  async function submitHandler(event) {
    event.preventDefault();

    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      validate(key, value);
    });

    const hasError = Object.values(errors).some((error) => error);
    if (hasError) {
      toast.error("Kindly rectify the errors before submitting");
      return;
    }

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

      if (!response.ok) {
        toast.error("Unable to contact");
        return;
      }

      toast.success("Query submitted successfully");

      // Reset form
      setFormData({
        fname: "",
        lname: "",
        email: "",
        contact: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating mb-1">
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
          {errors.fname && <p className="text-danger small">{errors.fname}</p>}
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lname"
              placeholder="Last Name"
              onChange={changeHandler}
              value={formData.lname}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          {errors.lname && <p className="text-danger small">{errors.lname}</p>}
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating mb-1">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email Address"
              onChange={changeHandler}
              value={formData.email}
            />
            <label htmlFor="email">Email Address</label>
          </div>
          {errors.email && <p className="text-danger small">{errors.email}</p>}
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-1">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="contact"
              placeholder="Phone Number"
              onChange={changeHandler}
              value={formData.contact}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
          {errors.contact && (
            <p className="text-danger small">{errors.contact}</p>
          )}
        </div>
      </div>

      <div className="form-floating mb-1">
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
          <option value={"Custom Installation"}>Custom Installation</option>
          <option value={"Other"}>Other</option>
        </select>
        <label htmlFor="subject">Subject</label>
      </div>
      {errors.subject && <p className="text-danger small">{errors.subject}</p>}

      <div className="form-floating mb-1">
        <textarea
          className="form-control"
          id="message"
          name="message"
          placeholder="Your Message"
          style={{ height: "150px" }}
          onChange={changeHandler}
          value={formData.message}
        ></textarea>
        <label htmlFor="message">Your Message</label>
      </div>
      {errors.message && <p className="text-danger small">{errors.message}</p>}

      <motion.button
        className="btn btn-primary p-2 w-100 mt-3"
        type="submit"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Send size={18} className="me-2" />
        Send Message
      </motion.button>
    </form>
  );
};

export default ContactForm;
