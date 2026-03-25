import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, RefreshCw, CheckCircle, XCircle, Flag } from "lucide-react";
import { AppointmentCard } from "../components/AppointmentCard";

/*
  Expert actions per status:
  - REQUESTED      → Confirm (sends to PAYMENT_PENDING) | Cancel
  - PAYMENT_PENDING→ Cancel (payment not done yet, expert can still cancel)
  - SCHEDULED      → Complete (payment done, no cancel allowed)
  - Others         → no actions
*/
const actionMap = {
  REQUESTED:       ["CONFIRM", "CANCEL"],
  PAYMENT_PENDING: ["CANCEL"],
  SCHEDULED:       ["COMPLETE"],
  COMPLETED:       [],
  CANCELLED:       [],
};

const actionConfig = {
  CONFIRM:  { label: "Confirm",  icon: <CheckCircle size={13} />, gradient: "linear-gradient(90deg,#10b981,#059669)", apiStatus: "CONFIRMED"  },
  CANCEL:   { label: "Cancel",   icon: <XCircle size={13} />,     gradient: "linear-gradient(90deg,#ef4444,#dc2626)", apiStatus: "CANCELLED"  },
  COMPLETE: { label: "Complete", icon: <Flag size={13} />,         gradient: "linear-gradient(90deg,#9100BD,#3b82f6)", apiStatus: "COMPLETED"  },
};

const tabs = ["ALL", "REQUESTED", "PAYMENT_PENDING", "SCHEDULED", "COMPLETED", "CANCELLED"];

const tabColor = {
  ALL: "#9100BD", REQUESTED: "#f59e0b", PAYMENT_PENDING: "#3C9BF9",
  SCHEDULED: "#9100BD", COMPLETED: "#10b981", CANCELLED: "#ef4444",
};

const ExpertAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [marking, setMarking]           = useState(null);
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
      const res = await axios.get("http://localhost:8080/appointment/expert/getAll", {
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

  const handleMarkStatus = async (apptId, actionKey) => {
    const cfg = actionConfig[actionKey];
    try {
      setMarking({ id: apptId, action: actionKey });
      const res = await axios.put(
        `http://localhost:8080/appointment/expert/markStatus/${apptId}?status=${cfg.apiStatus}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.status === 200) {
        toast.success(`Appointment ${cfg.label.toLowerCase()}ed.`);
        fetchAppointments(); // auto reload
      } else {
        toast.error("Failed to update status.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    } finally {
      setMarking(null);
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
              Patient Appointments
            </h1>
            <p className="text-xs mt-0.5" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Manage and respond to appointment requests
            </p>
          </div>
          <button onClick={fetchAppointments}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: isDark ? "rgba(145,0,189,0.15)" : "white", color: "#9100BD", border: "1px solid rgba(145,0,189,0.25)" }}>
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Stats */}
        {!loading && appointments.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Requested",  status: "REQUESTED",       color: "#f59e0b" },
              { label: "Awaiting Pay",status: "PAYMENT_PENDING",color: "#3C9BF9" },
              { label: "Scheduled",  status: "SCHEDULED",       color: "#9100BD" },
              { label: "Completed",  status: "COMPLETED",       color: "#10b981" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-3 text-center"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "white", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}` }}>
                <p className="text-2xl font-extrabold" style={{ color: s.color }}>
                  {appointments.filter(a => a.appointmentStatus === s.status).length}
                </p>
                <p className="text-[11px]" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

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
            <p className="font-semibold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>No appointments here</p>
            <p className="text-xs mt-1" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              {activeTab === "ALL" ? "No appointments yet." : `No ${activeTab.replace(/_/g," ").toLowerCase()} appointments.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered
              .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
              .map(appt => {
                const actions = actionMap[appt.appointmentStatus] || [];
                return (
                  <AppointmentCard key={appt.id} appt={appt} isDark={isDark} role="EXPERT">

                    {(actions.length > 0 || appt.appointmentStatus === "SCHEDULED" || appt.appointmentStatus === "COMPLETED") && (
                      <div className="pt-3 flex flex-wrap items-center gap-2">

                        {/* Action buttons */}
                        {actions.map(actionKey => {
                          const cfg       = actionConfig[actionKey];
                          const isLoading = marking?.id === appt.id && marking?.action === actionKey;
                          return (
                            <button key={actionKey}
                              onClick={() => handleMarkStatus(appt.id, actionKey)}
                              disabled={!!marking}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                                         text-white transition-all hover:opacity-90 hover:-translate-y-0.5
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ background: cfg.gradient }}>
                              {isLoading
                                ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                : cfg.icon
                              }
                              {cfg.label}
                            </button>
                          );
                        })}

                        {/* Status notes */}
                        {appt.appointmentStatus === "PAYMENT_PENDING" && (
                          <p className="text-xs ml-1" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                            ⏳ Waiting for patient payment.
                          </p>
                        )}
                        {appt.appointmentStatus === "SCHEDULED" && (
                          <p className="text-xs font-medium" style={{ color: "#9100BD" }}>
                            💳 Payment received — session confirmed.
                          </p>
                        )}
                        {appt.appointmentStatus === "COMPLETED" && (
                          <p className="text-xs font-medium" style={{ color: "#10b981" }}>
                            ✓ Session completed successfully.
                          </p>
                        )}
                      </div>
                    )}
                  </AppointmentCard>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertAppointments;