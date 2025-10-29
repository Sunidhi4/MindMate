import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject : ""
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
      const res = await axios.post("http://localhost:8080/contact/sendMailtoPsychoTalk" , formData);
      if(res.data.status === "success"){
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" , subject:"" });
      setErrors({});
      }else{
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
      <div className="flex justify-center items-center p-10 bg-gradient">
        <div className="bg-[#52b7e9]/25  p-10 rounded-2xl shadow-lg w-[600px] text-black border-3 border-black-400 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Contact Us
          </h2>
          <div className="w-full flex flex-col items-center">
            
            <div className="w-full text-center">
              <p className="text-lg font-semibold text-gray-800">
                Let's Connect with us!
              </p>
              <p className="text-gray-700 mb-6">
                Got trouble or need support? We're here to help! Reach out for
                support, feedback, or assistance.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg focus:outline-none border border-black`}
        
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg focus:outline-none border border-black`}
             
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg focus:outline-none border border-black`}
              
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg  focus:outline-none border border-black`}
              
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 cursor-pointer rounded-lg bg-linear-to-r from-blue-400 to-purple-500 hover:from-blue-700 transition duration-300 border-2 border-blue-600"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default ContactUs;
