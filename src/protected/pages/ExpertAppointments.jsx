import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, RefreshCw, CheckCircle, XCircle, Flag, FileText, X } from "lucide-react";
import { AppointmentCard } from "../components/AppointmentCard";

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

// ─── Report Modal ────────────────────────────────────────────────────────────
const ReportModal = ({ report, loading, onClose, isDark }) => {
  const sections = report
    ? report.reportText
        .split(/\n\n/)
        .map(s => s.trim())
        .filter(Boolean)
    : [];

  const isRiskSection = (text) =>
    /risk/i.test(text.split("\n")[0]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: isDark ? "#1a1a2e" : "white",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#ede9fe"}`,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Color bar */}
        <div className="h-1 shrink-0" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f0e9ff"}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: isDark ? "rgba(145,0,189,0.2)" : "#f3e8ff" }}
            >
              <FileText size={14} style={{ color: "#9100BD" }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                Patient Report
              </p>
              {report && (
                <p className="text-[11px]" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                  Appointment #{report.appointmentId} ·{" "}
                  {new Date(report.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: isDark ? "rgba(255,255,255,0.07)" : "#f3f4f6",
              color: isDark ? "#9ca3af" : "#6b7280",
              border: "none",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[80, 60, 90, 70].map((w, i) => (
                <div key={i}>
                  <div
                    className="h-3 rounded-full mb-2 animate-pulse"
                    style={{ width: "35%", background: isDark ? "rgba(255,255,255,0.08)" : "#e9d5ff" }}
                  />
                  <div
                    className="h-3 rounded-full animate-pulse"
                    style={{ width: `${w}%`, background: isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6" }}
                  />
                </div>
              ))}
            </div>
          ) : !report ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ background: isDark ? "rgba(145,0,189,0.12)" : "#f3e8ff" }}
              >
                <FileText size={20} style={{ color: "#9100BD", opacity: 0.5 }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                Report not generated yet
              </p>
              <p className="text-xs mt-1" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                The patient report will appear here once it has been created.
              </p>
            </div>
          ) : (
            sections.map((section, i) => {
              const lines = section.split("\n");
              const heading = lines[0].replace(/[*#]/g, "").trim();
              const body = lines.slice(1).join("\n").replace(/\*\*/g, "").trim();
              const risk = isRiskSection(section);

              return (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3"
                  style={{
                    background: risk
                      ? isDark ? "rgba(239,68,68,0.1)" : "#fff1f2"
                      : isDark ? "rgba(255,255,255,0.04)" : "#f8f7ff",
                    border: `1px solid ${
                      risk
                        ? isDark ? "rgba(239,68,68,0.25)" : "#fecdd3"
                        : isDark ? "rgba(255,255,255,0.06)" : "#ede9fe"
                    }`,
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: risk ? "#dc2626" : "#9100BD" }}
                  >
                    {heading}
                  </p>
                  <p
                    className="text-xs leading-relaxed whitespace-pre-line"
                    style={{ color: risk
                      ? isDark ? "#fca5a5" : "#991b1b"
                      : isDark ? "#d1d5db" : "#374151"
                    }}
                  >
                    {body || heading}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex justify-end shrink-0"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f0e9ff"}` }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#9100BD,#3b82f6)" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const ExpertAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [marking, setMarking]           = useState(null);
  const [activeTab, setActiveTab]       = useState("ALL");
  const [isDark, setIsDark]             = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const [reportModal, setReportModal] = useState({ open: false, apptId: null, report: null, loading: false });

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
      const res = await axios.get("https://mindmate-production-81d8.up.railway.app/appointment/expert/getAll", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(res.data || []);
    } catch {
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
        `https://mindmate-production-81d8.up.railway.app/appointment/expert/markStatus/${apptId}?status=${cfg.apiStatus}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.status === 200) {
        toast.success(`Appointment ${cfg.label.toLowerCase()}ed.`);
        fetchAppointments();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    } finally {
      setMarking(null);
    }
  };

  // ── View Report ─────────────────────────────────────────────────────────────
  const handleViewReport = async (apptId) => {
    setReportModal({ open: true, apptId, report: null, loading: true });
    try {
      const res = await axios.get(
        `https://mindmate-production-81d8.up.railway.app/api/care-journey/report/${apptId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      // Treat null / empty / missing reportText as "not generated yet"
      const report = res.data?.reportText ? res.data : null;
      setReportModal({ open: true, apptId, report, loading: false });
    } catch {
      // 404 or any network error → not generated
      setReportModal({ open: true, apptId, report: null, loading: false });
    }
  };

  const closeReportModal = () =>
    setReportModal({ open: false, apptId: null, report: null, loading: false });

  const filtered = activeTab === "ALL"
    ? appointments
    : appointments.filter(a => a.appointmentStatus === activeTab);

  return (
    <div className="min-h-full w-full py-6 transition-colors duration-300">
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
              { label: "Requested",    status: "REQUESTED",       color: "#f59e0b" },
              { label: "Awaiting Pay", status: "PAYMENT_PENDING", color: "#3C9BF9" },
              { label: "Scheduled",    status: "SCHEDULED",       color: "#9100BD" },
              { label: "Completed",    status: "COMPLETED",       color: "#10b981" },
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
                  <AppointmentCard
                    key={appt.id}
                    appt={appt}
                    isDark={isDark}
                    role="EXPERT"
                    headerAction={
                      <button
                        onClick={() => handleViewReport(appt.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all hover:opacity-80"
                        style={{
                          background: isDark ? "rgba(145,0,189,0.15)" : "#f3e8ff",
                          color: "#9100BD",
                          border: "1px solid rgba(145,0,189,0.2)",
                        }}
                      >
                        <FileText size={11} />
                        View Report
                      </button>
                    }
                  >
                    {(actions.length > 0 || appt.appointmentStatus === "SCHEDULED" || appt.appointmentStatus === "COMPLETED") && (
                      <div className="pt-3 flex flex-wrap items-center gap-2">
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

      {/* Report Modal */}
      {reportModal.open && (
        <ReportModal
          report={reportModal.report}
          loading={reportModal.loading}
          onClose={closeReportModal}
          isDark={isDark}
        />
      )}
    </div>
  );
};

export default ExpertAppointments;