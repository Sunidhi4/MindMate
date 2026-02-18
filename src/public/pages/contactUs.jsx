import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // New state for loading

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await axios.post("http://localhost:8080/contact/sendMailtoPsychoTalk", formData);
      if (res.data.status === "success") {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "", subject: "" });
        setErrors({});
      } else {
        toast.error("Email not Sent! Try again")
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.error || "Failed to send message.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                bg-gradient-to-b from-[#f5f8ff] via-white to-[#fdfbff] 
                px-6 py-16">

      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md 
                  rounded-3xl shadow-lg shadow-purple-200/40 
                  p-10 border border-purple-100">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#55037b] mb-3">
            Contact Us
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Need support or have feedback? We’re here to listen and help you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 
                     focus:ring-2 focus:ring-purple-400 
                     focus:border-purple-500 outline-none 
                     transition duration-200 text-sm md:text-base"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 
                     focus:ring-2 focus:ring-purple-400 
                     focus:border-purple-500 outline-none 
                     transition duration-200 text-sm md:text-base"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 
                     focus:ring-2 focus:ring-purple-400 
                     focus:border-purple-500 outline-none 
                     transition duration-200 text-sm md:text-base"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 
                     focus:ring-2 focus:ring-purple-400 
                     focus:border-purple-500 outline-none 
                     transition duration-200 text-sm md:text-base resize-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
                   bg-gradient-to-r from-[#3C9BF9] to-[#9100BD]
                   hover:scale-[1.02] hover:shadow-lg
                   transition duration-300 disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>
    </div>

  );
};

export default ContactUs;
