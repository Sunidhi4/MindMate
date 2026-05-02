import { Clock, Calendar, FileText, IndianRupee } from "lucide-react";
import {differenceInYears} from "date-fns";

const statusConfig = {
  REQUESTED:       { label: "Requested",      bg: "#fffbeb", dark: "rgba(245,158,11,0.15)",  text: "#d97706", border: "#fde68a",  dot: "#f59e0b" },
  PAYMENT_PENDING: { label: "Payment Pending", bg: "#eff6ff", dark: "rgba(60,155,249,0.15)", text: "#1d4ed8", border: "#bfdbfe", dot: "#3C9BF9" },
  SCHEDULED:       { label: "Scheduled",       bg: "#faf5ff", dark: "rgba(145,0,189,0.15)",  text: "#7c3aed", border: "#ddd6fe", dot: "#9100BD" },
  COMPLETED:       { label: "Completed",       bg: "#f0fdf4", dark: "rgba(16,185,129,0.12)", text: "#15803d", border: "#bbf7d0", dot: "#10b981" },
  CANCELLED:       { label: "Cancelled",       bg: "#fff1f2", dark: "rgba(239,68,68,0.12)",  text: "#dc2626", border: "#fecdd3", dot: "#ef4444" },
};

const paymentConfig = {
  CREATED: { label: "Unpaid",  color: "#f59e0b" },
  SUCCESS:  { label: "Paid ✓", color: "#10b981" },
  FAILED:   { label: "Failed", color: "#ef4444" },
};

export const AppointmentCard = ({ appt, isDark, role = "USER", headerAction, children }) => {

  const status    = statusConfig[appt.appointmentStatus] || statusConfig.REQUESTED;
  const payment   = paymentConfig[appt.paymentStatus]    || paymentConfig.CREATED;
  const amountINR = appt.amountInPaise ? (appt.amountInPaise / 100) : 0;

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-IN", {
      weekday: "short", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const person = role === "USER" ? appt.expert : appt.user;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "white",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}`,
      }}
    >
      <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">

          {/* Left: Avatar + Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-base font-extrabold shrink-0"
              style={{ background: isDark ? "rgba(145,0,189,0.2)" : "#f3e8ff", color: "#9100BD" }}
            >
              {(role === "USER"
                ? person?.fullName?.charAt(0)
                : person?.username?.charAt(0)
              )?.toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                {role === "USER" ? person?.fullName || "Expert" : `@${person?.username || "User"}`}
              </p>
              <p className="text-[11px]" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                {role === "USER"
                  ? person?.qualifications?.slice(0, 1).join(", ") || "Mental Health Expert"
                  : `${differenceInYears(new Date(), new Date(person.dob))} | ${person.gender}`
                }
              </p>
            </div>
          </div>

          {/* Right: headerAction (e.g. View Report) + Status badge */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {headerAction && headerAction}

            <span
              className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: isDark ? status.dark : status.bg,
                color: status.text,
                border: `1px solid ${isDark ? status.dot + "40" : status.border}`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
              {status.label}
            </span>
          </div>

        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {[
            { icon: <Calendar size={12} />,   color: "#9100BD", label: "Appointment", value: formatDate(appt.appointmentTime) },
            { icon: <Clock size={12} />,       color: "#3C9BF9", label: "Duration",    value: `${appt.durationInMinutes} minutes` },
            { icon: <IndianRupee size={12} />, color: "#10b981", label: "Amount",      value: `₹${amountINR} (${payment.label})`, payColor: payment.color },
            { icon: <FileText size={12} />,    color: "#ec4899", label: "Reason",      value: appt.reason },
          ].map((row, i) => (
            <div key={i}
              className="flex items-start gap-2 px-3 py-2 rounded-xl"
              style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f8f7ff" }}
            >
              <span className="mt-0.5 shrink-0" style={{ color: row.color }}>{row.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
                  {row.label}
                </p>
                <p className="text-xs font-medium truncate"
                  style={{ color: row.payColor || (isDark ? "#d1d5db" : "#374151") }}>
                  {row.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions slot */}
        {children && (
          <div className="pt-2 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "#f0e9ff" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export { statusConfig };