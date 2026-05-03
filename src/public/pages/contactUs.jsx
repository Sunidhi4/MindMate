import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Send, Mail, User, MessageSquare, FileText, Phone, MapPin, Clock } from "lucide-react";

const ContactUs = () => {
  // Field names match exactly what the API expects
  const [formData, setFormData] = useState({
    senderName:   "",
    emailAddress: "",
    subject:      "",
    message:      "",
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.senderName.trim())   newErrors.senderName   = "Name is required";
    if (!formData.emailAddress.trim()) newErrors.emailAddress = "Email is required";
    else if (!validateEmail(formData.emailAddress)) newErrors.emailAddress = "Invalid email format";
    if (!formData.subject.trim())      newErrors.subject      = "Subject is required";
    if (!formData.message.trim())      newErrors.message      = "Message is required";

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://mindmate-production-81d8.up.railway.app/public/contact/mail",
        formData          // sends { senderName, emailAddress, subject, message }
      );

      // 200 success
      if (res.data.status === "success" || res.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ senderName: "", emailAddress: "", subject: "", message: "" });
        setErrors({});
      }
    } catch (error) {
      // 400 — server sends { message, status: "BAD_REQUEST", ... }
      const serverMsg = error.response?.data?.message;
      toast.error(serverMsg || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared input class ── */
  const inputBase = [
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
    "bg-gray-50 dark:bg-gray-700/50",
    "border border-gray-200 dark:border-gray-600",
    "text-gray-800 dark:text-gray-100",
    "placeholder-gray-400 dark:placeholder-gray-500",
  ].join(" ");

  const focusRing = (field) =>
    focused === field
      ? "border-purple-500 dark:border-purple-400 ring-2 ring-purple-200 dark:ring-purple-900/40 bg-white dark:bg-gray-700"
      : "";

  const contactInfo = [
    { icon: <Mail size={15} />,  color: "#9100BD", label: "Email",    value: "support@MindMate.in"  },
    { icon: <Phone size={15} />, color: "#3C9BF9", label: "Phone",    value: "+91 98765 43210"         },
    { icon: <MapPin size={15}/>, color: "#ec4899", label: "Location", value: "Mumbai, India"           },
    { icon: <Clock size={15} />, color: "#10b981", label: "Hours",    value: "Mon–Sat, 9am – 6pm IST"  },
  ];

  return (
    <div className="min-h-full w-full bg-gradient dark:bg-gray-900">
      <style>{`*, *::before, *::after { box-sizing: border-box; }`}</style>

      <div className="w-full max-w-5xl mx-auto px-4 py-10">

        {/* ══ HEADER ══ */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                           text-purple-600 dark:text-purple-400
                           bg-purple-100 dark:bg-purple-900/30
                           px-3 py-1 rounded-full
                           border border-purple-200 dark:border-purple-700/50 mb-3">
            ✦ Get in Touch
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            We'd Love to{" "}
            <span style={{
              background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Hear From You
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Need support or have feedback? We're here to listen and help every step of the way.
          </p>
          <div className="mt-5 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#ddd6fe,transparent)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-4">

            {/* Contact info card */}
            <div className="rounded-2xl overflow-hidden shadow-sm
                            bg-white dark:bg-gray-800
                            border border-purple-100 dark:border-gray-700">
              <div style={{ height: 4, background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />
              <div className="p-5 space-y-4">
                <h2 className="text-sm font-bold text-gray-800 dark:text-white">Contact Information</h2>
                {contactInfo.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}>
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide
                                    text-gray-400 dark:text-gray-500">{c.label}</p>
                      <p className="text-xs font-medium truncate
                                    text-gray-700 dark:text-gray-300">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reassurance card */}
            <div className="rounded-2xl p-5 text-white"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              <MessageSquare size={20} className="mb-3 opacity-80" />
              <p className="text-sm font-bold mb-1">We're here for you</p>
              <p className="text-xs text-white/75 leading-relaxed">
                Every message is read with care. We typically respond within 24 hours.
              </p>
            </div>

            {/* Help nudge */}
            <div className="rounded-2xl p-4 shadow-sm
                            bg-white dark:bg-gray-800
                            border border-purple-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-800 dark:text-white mb-1">Have a quick question?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Check our Help section — most common questions are answered instantly.
              </p>
              <a href="/user/help"
                className="inline-flex items-center gap-1 text-xs font-semibold mt-2 transition-colors
                           text-purple-500 hover:text-purple-700 dark:hover:text-purple-400">
                Visit Help Center →
              </a>
            </div>
          </div>

          {/* ══ RIGHT: FORM ══ */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-sm
                          bg-white dark:bg-gray-800
                          border border-purple-100 dark:border-gray-700">
            <div style={{ height: 4, background: "linear-gradient(90deg,#9100BD,#3C9BF9)" }} />

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">

              <h2 className="text-sm font-bold text-gray-800 dark:text-white">Send us a message</h2>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* senderName */}
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-1
                                    text-gray-400 dark:text-gray-500">
                    <User size={11} /> Name
                  </label>
                  <input
                    type="text" name="senderName"
                    placeholder="Your full name"
                    value={formData.senderName}
                    onChange={handleChange}
                    onFocus={() => setFocused("senderName")}
                    onBlur={() => setFocused("")}
                    className={`${inputBase} ${focusRing("senderName")}`}
                  />
                  {errors.senderName && <p className="text-red-500 text-xs mt-1">{errors.senderName}</p>}
                </div>

                {/* emailAddress */}
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-1
                                    text-gray-400 dark:text-gray-500">
                    <Mail size={11} /> Email
                  </label>
                  <input
                    type="email" name="emailAddress"
                    placeholder="your@email.com"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    onFocus={() => setFocused("emailAddress")}
                    onBlur={() => setFocused("")}
                    className={`${inputBase} ${focusRing("emailAddress")}`}
                  />
                  {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-1
                                  text-gray-400 dark:text-gray-500">
                  <FileText size={11} /> Subject
                </label>
                <input
                  type="text" name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused("")}
                  className={`${inputBase} ${focusRing("subject")}`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-1
                                  text-gray-400 dark:text-gray-500">
                  <MessageSquare size={11} /> Message
                </label>
                <textarea
                  name="message" rows={5}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  className={`${inputBase} ${focusRing("message")} resize-none`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2
                           py-3 rounded-xl text-sm font-semibold text-white
                           transition-all duration-200
                           hover:opacity-90 hover:-translate-y-0.5
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>

              <p className="text-[11px] text-center text-gray-400 dark:text-gray-500">
                🔒 Your message is private and secure. We never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;