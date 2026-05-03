import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, Clock, FileText, ArrowLeft, BadgeCheck, MapPin, Star, CheckCircle, XCircle, Loader } from "lucide-react";

const DURATIONS = [15, 30, 45, 60];

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const expert   = location.state?.expert;

  const [form, setForm] = useState({
    reason:            "",
    appointmentTime:   "",
    durationInMinutes: 15,
  });

  const [loading, setLoading]       = useState(false);
  const [focused, setFocused]       = useState("");
  const [slotStatus, setSlotStatus] = useState(null); // null | "checking" | "available" | "unavailable"
  const [isDark, setIsDark]         = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const chargePerMinute = expert ? expert.fees / 15 : 0;
  const totalFee        = Math.round(chargePerMinute * form.durationInMinutes);

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expert) { toast.error("No expert selected."); navigate(-1); }
  }, []);

  if (!expert) return null;

  // ── Check time slot whenever time or duration changes ──
  const checkSlot = useCallback(async (time, duration) => {
    if (!time || !duration) return;
    try {
      setSlotStatus("checking");
      const res = await axios.post(
        "https://mindmate-production-81d8.up.railway.app/appointment/user/checkTimeSlot",
        { appointmentTime: time, durationInMinutes: Number(duration), expertId: expert.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      // true = available, false = not available
      setSlotStatus(res.data === true ? "available" : "unavailable");
    } catch {
      setSlotStatus(null);
    }
  }, [expert.id]);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setForm(f => ({ ...f, appointmentTime: time }));
    if (time) checkSlot(time, form.durationInMinutes);
    else setSlotStatus(null);
  };

  const handleDuration = (d) => {
    setForm(f => ({ ...f, durationInMinutes: d }));
    if (form.appointmentTime) checkSlot(form.appointmentTime, d);
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reason.trim())     return toast.error("Please enter a reason.");
    if (!form.appointmentTime)   return toast.error("Please select a date & time.");
    if (new Date(form.appointmentTime) <= new Date())
                                  return toast.error("Please select a future date and time.");
    if (slotStatus === "unavailable")
                                  return toast.error("This time slot is unavailable. Please choose another.");

    const payload = {
      reason:            form.reason,
      appointmentTime:   form.appointmentTime,
      durationInMinutes: Number(form.durationInMinutes),
      expertId:          expert.id,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://mindmate-production-81d8.up.railway.app/appointment/user/request",
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.status === 201) {
        toast.success("Appointment request sent successfully!");
        navigate("/user/appointments");
      } else {
        toast.error("Request not sent. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Request not sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const minDateTime = new Date(Date.now() + 60000).toISOString().slice(0, 16);

  const inputCls = (field) => [
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
    focused === field
      ? "border-2 border-purple-500 ring-2 ring-purple-200"
      : "border border-gray-200 hover:border-purple-300",
    isDark ? "bg-gray-700/50 text-gray-100 placeholder-gray-500 border-gray-600"
           : "bg-gray-50 text-gray-800 placeholder-gray-400",
  ].join(" ");

  // Slot indicator
  const SlotIndicator = () => {
    if (!slotStatus) return null;
    if (slotStatus === "checking") return (
      <div className="flex items-center gap-1.5 text-xs font-medium mt-1.5" style={{ color: "#9ca3af" }}>
        <Loader size={12} className="animate-spin" /> Checking availability...
      </div>
    );
    if (slotStatus === "available") return (
      <div className="flex items-center gap-1.5 text-xs font-semibold mt-1.5" style={{ color: "#10b981" }}>
        <CheckCircle size={13} /> Time slot is available ✓
      </div>
    );
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold mt-1.5" style={{ color: "#ef4444" }}>
        <XCircle size={13} /> This slot is unavailable — please choose another time
      </div>
    );
  };

  return (
    <div
      className="min-h-screen py-10 transition-colors duration-300"
      
    >
      <style>{`
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: ${isDark ? "invert(1) opacity(0.5)" : "opacity(0.5)"};
          cursor: pointer;
        }
        .dur-btn { transition: all 0.15s ease; }
      `}</style>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-5">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium w-fit transition-colors"
          style={{ color: isDark ? "#c084fc" : "#9100BD" }}>
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Expert summary ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden shadow-sm"
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "white",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}`,
              }}>
              <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                  Booking session with
                </p>

                <div className="flex items-start gap-3 mb-4">
                  <div className="p-0.5 rounded-full shrink-0"
                    style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-extrabold"
                      style={{ background: isDark ? "#1f2937" : "#f3e8ff", color: "#9100BD", border: "2px solid white" }}>
                      {expert.fullName?.charAt(0)}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <p className="font-bold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                        {expert.fullName}
                      </p>
                      {expert.verified && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: "#f3e8ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {expert.qualifications?.slice(0, 2).map((q, i) => (
                        <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{ background: "#faf5ff", color: "#7c3aed", border: "1px solid #ede9fe" }}>
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: <Clock size={12} />,    color: "#3C9BF9", text: `${expert.experience} yrs experience` },
                    { icon: <MapPin size={12} />,   color: "#ec4899", text: expert.address },
                    { icon: <Star size={12} />,     color: "#f59e0b", text: expert.rating ? `${expert.rating} / 5` : "Not rated yet" },
                    { icon: <BadgeCheck size={12}/>,color: "#10b981", text: expert.verified ? "Verified Expert" : "Pending verification" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span style={{ color: m.color }}>{m.icon}</span>
                      <span className="text-xs" style={{ color: isDark ? "#d1d5db" : "#4b5563" }}>{m.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fee card — live updates with duration */}
            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
              <p className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">
                Estimated Fee
              </p>
              <p className="text-3xl font-extrabold text-white mb-0.5">₹{totalFee}</p>
              <p className="text-xs text-white/60">
                for {form.durationInMinutes} min · ₹{expert.fees} base (15 min)
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-sm"
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "white",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}`,
              }}>
              <div className="h-1" style={{ background: "linear-gradient(90deg,#9100BD,#3C9BF9)" }} />

              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                <div>
                  <h2 className="text-base font-bold" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                    Book a Session
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                    Fill in the details below and we'll send your request to the expert.
                  </p>
                </div>

                {/* Date & Time */}
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                    <Calendar size={11} /> Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="appointmentTime"
                    min={minDateTime}
                    value={form.appointmentTime}
                    onChange={handleTimeChange}
                    onFocus={() => setFocused("appointmentTime")}
                    onBlur={() => setFocused("")}
                    className={inputCls("appointmentTime")}
                    required
                  />
                  <SlotIndicator />
                </div>

                {/* Duration */}
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-2"
                    style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                    <Clock size={11} /> Session Duration
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map(d => {
                      const active = form.durationInMinutes === d;
                      const fee    = Math.round(chargePerMinute * d);
                      return (
                        <button key={d} type="button" onClick={() => handleDuration(d)}
                          className="dur-btn flex flex-col items-center px-4 py-2 rounded-xl text-xs font-semibold"
                          style={{
                            background: active ? "linear-gradient(90deg,#3C9BF9,#9100BD)" : isDark ? "rgba(255,255,255,0.06)" : "#f5f3ff",
                            color: active ? "white" : isDark ? "#9ca3af" : "#374151",
                            border: active ? "none" : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#ddd6fe"}`,
                            boxShadow: active ? "0 4px 14px rgba(145,0,189,0.25)" : "none",
                          }}>
                          <span>{d} min</span>
                          <span className="text-[10px] opacity-75">₹{fee}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] mt-1.5" style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
                    Expert may adjust duration based on availability.
                  </p>
                </div>

                {/* Reason */}
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                    <FileText size={11} /> Reason for Session
                  </label>
                  <textarea name="reason" rows={4}
                    placeholder="Briefly describe what you'd like to discuss..."
                    value={form.reason}
                    onChange={handleChange}
                    onFocus={() => setFocused("reason")}
                    onBlur={() => setFocused("")}
                    className={`${inputCls("reason")} resize-none`}
                    required
                  />
                </div>

                {/* Summary strip */}
                {form.appointmentTime && (
                  <div className="rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 text-xs font-medium"
                    style={{
                      background: isDark ? "rgba(145,0,189,0.12)" : "#faf5ff",
                      border: `1px solid ${isDark ? "rgba(145,0,189,0.25)" : "#ddd6fe"}`,
                      color: isDark ? "#d1d5db" : "#374151",
                    }}>
                    <span>📅 {new Date(form.appointmentTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                    <span>·</span>
                    <span>⏱ {form.durationInMinutes} min</span>
                    <span>·</span>
                    <span style={{ color: "#9100BD", fontWeight: 700 }}>₹{totalFee}</span>
                    {slotStatus === "available" && <span style={{ color: "#10b981" }}>· ✓ Available</span>}
                    {slotStatus === "unavailable" && <span style={{ color: "#ef4444" }}>· ✗ Unavailable</span>}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading || slotStatus === "unavailable" || slotStatus === "checking"}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2
                             transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <>📅 Send Appointment Request</>
                  }
                </button>

                <p className="text-[11px] text-center" style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
                  🔒 Your request is private. The expert will confirm or suggest an alternative time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;