import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../Hoc";
import { slideIn } from "../utils/motion";

import CustomAlert from "./CustomAlert";

const Contact = () => {
  const formRef = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [typedWords, setTypedWords] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    showAlert || showErrorAlert
      ? document.body.classList.add("prevent-scroll")
      : document.body.classList.remove("prevent-scroll");
  }, [showAlert, showErrorAlert]);

  const maxWordsCnt = 250;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      // Splitting the value by spaces to count words
      const words = value.trim().split(/\s+/);
      if (words.length > maxWordsCnt) {
        // Truncate the message to the first maxWordsCnt words
        const truncatedValue = words.slice(0, maxWordsCnt).join(" ");
        setForm({ ...form, [name]: truncatedValue });
        //Ensures that typedWords does not exceed the maximum word count maxWordsCnt.
        setTypedWords(words.length <= maxWordsCnt ? words.length : maxWordsCnt);
      } else {
        setForm({ ...form, [name]: value });
        setTypedWords(value.trim() === "" ? 0 : words.length);
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors({ ...errors, [name]: "" }); // Clear previous error for the field
  };

  const handleResetForm = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear loading state and error messages
    setLoading(false);
    setErrors({ name: "", email: "", message: "" });

    // Validate form fields
    let valid = true;
    const newErrors = {};

    if (form.name.trim() === "") {
      valid = false;
      newErrors.name = "Name is required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      valid = false;
      newErrors.email = "Invalid email format";
    }

    if (form.message.trim() === "") {
      valid = false;
      newErrors.message = "Message is required";
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_icoh0od", // service ID
        "template_rs6jmo6", // template ID
        {
          from_name: form.name,
          to_name: "Abid Humza",
          from_email: form.email,
          to_email: "ahumza289@gmail.com",
          message: form.message,
        },
        "GaAyUDdVIgWmv6F2E" // public ID
      )
      .then(
        () => {
          setLoading(false);
          setShowAlert(true); // Show success alert
        },
        (error) => {
          setLoading(false);
          console.log(error);
          setShowErrorAlert(true); // Show error alert
        }
      );
  };

  return (
    <div
      className="xl:mt-12 xl:flex-row flex-col-reverse 
      flex gap-10 overflow-hidden relative"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8
        rounded-2xl"
      >
        <p className={styles.sectionSubText}> Hire Me </p>
        <h3 className={styles.sectionHeadText}> Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-22 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span
              className="text-white font-medium
            mb-4"
            >
              Your Name
              <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="bg-tertiary py-4 px-6
              placeholder:text-secondary
              text-white rounded-lg outline-none
              border-none font-medium"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </label>
          <label className="flex flex-col">
            <span
              className="text-white font-medium
            mb-4"
            >
              Your Email
              <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="bg-tertiary py-4 px-6
              placeholder:text-secondary
              text-white rounded-lg outline-none
              border-none font-medium"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </label>
          <label className="flex flex-col">
            <span
              className="text-white font-medium
            mb-4"
            >
              Your Message
              <span className="text-red-500">*</span>
            </span>
            <textarea
              rows="8"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter Your Message"
              className="bg-tertiary py-4 px-6
              placeholder:text-secondary
              text-white rounded-lg outline-none
              border-none font-medium"
            />
            <p className="text-gray-400">
              {typedWords}/{maxWordsCnt} words
            </p>
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8
            outline-none w-fit shadow-md shadow-primary
            rounded-xl"
          >
            {loading ? "Sending...." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Show the CustomAlert component when showAlert is true */}
      {showAlert && (
        <div
          className="fixed inset-0 bg-black 
        bg-opacity-60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: "-100%" }} // Initial position outside the viewport
            animate={{ y: showAlert ? 0 : "-100%" }} // Animate to 0 when showAlert is true
            transition={{ duration: 0.3 }} // Transition duration
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <CustomAlert
              visible={showAlert}
              onClose={() => setShowAlert(false)}
              onReset={handleResetForm}
            />
          </motion.div>
        </div>
      )}

      {/* Show the CustomAlert component when showErrorAlert is true */}
      {showErrorAlert && (
        <div
          className="fixed inset-0 bg-black 
        bg-opacity-60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: showErrorAlert ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <CustomAlert
              isError={true} // Pass a prop to indicate that it's an error alert
              visible={showErrorAlert}
              onClose={() => setShowErrorAlert(false)}
              onReset={handleResetForm}
            />
          </motion.div>
        </div>
      )}

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-[600px] md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
