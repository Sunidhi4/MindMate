import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, RefreshCw, IndianRupee, CheckCircle, XCircle } from "lucide-react";
import { AppointmentCard } from "../components/AppointmentCard";

// User can cancel only REQUESTED or PAYMENT_PENDING
const userCanCancel = ["REQUESTED", "PAYMENT_PENDING"];

const tabs = ["ALL", "REQUESTED", "PAYMENT_PENDING", "SCHEDULED", "COMPLETED", "CANCELLED"];

const tabColor = {
  ALL: "#9100BD", REQUESTED: "#f59e0b", PAYMENT_PENDING: "#3C9BF9",
  SCHEDULED: "#9100BD", COMPLETED: "#10b981", CANCELLED: "#ef4444",
};

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [payingId, setPayingId]         = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [activeTab, setActiveTab]       = useState("ALL");
  const [isDark, setIsDark]             = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/appointment/user/getAll", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(res.data || []);
    } catch (err) {
      toast.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  // ── Cancel appointment ──
  const handleCancel = async (apptId) => {
    if (!window.confirm("Cancel this appointment request?")) return;
    try {
      setCancellingId(apptId);
      const res = await axios.put(
        `http://localhost:8080/appointment/user/cancel/${apptId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.status === 200) {
        toast.success("Appointment cancelled.");
        fetchAppointments(); // auto reload
      } else {
        toast.error("Failed to cancel.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel.");
    } finally {
      setCancellingId(null);
    }
  };

  // ── Razorpay payment ──
  const handlePay = async (appt) => {
    try {
      setPayingId(appt.id);
      const orderRes = await axios.post(
        `http://localhost:8080/user/payment/create-order/${appt.id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const { amount, orderId, key } = orderRes.data;

      const options = {
        key, amount,
        currency: appt.currency || "INR",
        name: "MindMate",
        description: `Session with ${appt.expert?.fullName}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:8080/user/payment/verify",
              response,
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (verifyRes.status === 200) {
              toast.success("Payment successful! Appointment scheduled. 🎉");
              fetchAppointments(); // auto reload
            } else {
              toast.error("Payment verification failed.");
            }
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        prefill: { name: localStorage.getItem("username") || "" },
        theme: { color: "#9100BD" },
        modal: { ondismiss: () => toast.info("Payment cancelled.") },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Failed to initiate payment.");
    } finally {
      setPayingId(null);
    }
  };

  const filtered = activeTab === "ALL"
    ? appointments
    : appointments.filter(a => a.appointmentStatus === activeTab);

  return (
    <div
      className="min-h-full w-full py-6 transition-colors duration-300"
      
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
              My Appointments
            </h1>
            <p className="text-xs mt-0.5" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Track and manage your booked sessions
            </p>
          </div>
          <button onClick={fetchAppointments}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: isDark ? "rgba(145,0,189,0.15)" : "white", color: "#9100BD", border: "1px solid rgba(145,0,189,0.25)" }}>
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tabs.map(tab => {
            const active = activeTab === tab;
            const count  = tab === "ALL" ? appointments.length : appointments.filter(a => a.appointmentStatus === tab).length;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all"
                style={{
                  background: active ? tabColor[tab] : isDark ? "rgba(255,255,255,0.05)" : "white",
                  color: active ? "white" : isDark ? "#9ca3af" : "#4b5563",
                  border: active ? "none" : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
                  boxShadow: active ? `0 3px 10px ${tabColor[tab]}40` : "none",
                }}>
                {tab.replace(/_/g, " ")}
                {count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                    style={{
                      background: active ? "rgba(255,255,255,0.25)" : isDark ? "rgba(255,255,255,0.08)" : "#f3f4f6",
                      color: active ? "white" : isDark ? "#d1d5db" : "#374151",
                    }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl animate-pulse"
                style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl p-14 text-center"
            style={{ background: isDark ? "rgba(255,255,255,0.04)" : "white", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}` }}>
            <Calendar size={36} className="mx-auto mb-3" style={{ color: "#9100BD", opacity: 0.4 }} />
            <p className="font-semibold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>No appointments found</p>
            <p className="text-xs mt-1" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              {activeTab === "ALL" ? "Book a session with an expert to get started." : `No ${activeTab.replace(/_/g," ").toLowerCase()} appointments.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered
              .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
              .map(appt => (
                <AppointmentCard key={appt.id} appt={appt} isDark={isDark} role="USER">

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-2">

                    {/* Pay button */}
                    {appt.appointmentStatus === "PAYMENT_PENDING" && (
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                          Expert confirmed — complete payment to schedule.
                        </p>
                        <button onClick={() => handlePay(appt)} disabled={payingId === appt.id}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white
                                     hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
                          {payingId === appt.id
                            ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            : <><IndianRupee size={13} /> Pay ₹{appt.amountInPaise / 100}</>
                          }
                        </button>
                      </div>
                    )}

                    {/* Scheduled message */}
                    {appt.appointmentStatus === "SCHEDULED" && (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} style={{ color: "#10b981" }} />
                        <p className="text-xs font-medium" style={{ color: "#10b981" }}>
                          Paid & scheduled. You're all set!
                        </p>
                      </div>
                    )}

                    {/* Cancel button — only for REQUESTED or PAYMENT_PENDING */}
                    {userCanCancel.includes(appt.appointmentStatus) && (
                      <button onClick={() => handleCancel(appt.id)} disabled={cancellingId === appt.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
                                   transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: isDark ? "rgba(239,68,68,0.15)" : "#fff1f2",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.25)",
                        }}>
                        {cancellingId === appt.id
                          ? <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                          : <XCircle size={13} />
                        }
                        Cancel Request
                      </button>
                    )}
                  </div>
                </AppointmentCard>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAppointments;