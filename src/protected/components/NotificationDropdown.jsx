import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Check, CheckCheck, Loader, Inbox } from "lucide-react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [marking, setMarking]             = useState(null); // id being marked

  const isDark = document.documentElement.classList.contains("dark");
  const token  = localStorage.getItem("token");

  /* ── Fetch on mount ── */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("https://mindmate-production-81d8.up.railway.app/user/notification/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data || []);
      } catch {
        // silent — dropdown shouldn't crash the app
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  /* ── Mark single notification as read ── */
  const markAsRead = async (id) => {
    if (marking) return;
    try {
      setMarking(id);
      await axios.put(
        `https://mindmate-production-81d8.up.railway.app/user/notification/markAsRead/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, status: "READ" } : n)
      );
    } catch {
      // silent
    } finally {
      setMarking(null);
    }
  };

  /* ── Mark all as read ── */
  const markAllAsRead = async () => {
    const unread = notifications.filter(n => n.status === "UNREAD");
    if (!unread.length) return;
    try {
      await Promise.all(
        unread.map(n =>
          axios.put(
            `https://mindmate-production-81d8.up.railway.app/user/notification/markAsRead/${n.id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      setNotifications(prev => prev.map(n => ({ ...n, status: "READ" })));
    } catch {
      // silent
    }
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now  = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    if (diff < 60)   return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  };

  const unreadCount = notifications.filter(n => n.status === "UNREAD").length;

  return (
    <div
      className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl z-50"
      style={{
        background: isDark ? "#1f2937" : "white",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}`,
        boxShadow: isDark
          ? "0 20px 40px rgba(0,0,0,0.4)"
          : "0 20px 40px rgba(145,0,189,0.12)",
      }}
    >
      {/* Top accent */}
      <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f0e9ff"}` }}>

        <div className="flex items-center gap-2">
          <Bell size={15} style={{ color: "#9100BD" }} />
          <h3 className="text-sm font-bold" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ background: "linear-gradient(90deg,#9100BD,#ec4899)" }}
            >
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-[11px] font-semibold transition-colors"
            style={{ color: "#9100BD" }}
          >
            <CheckCheck size={12} /> Mark all read
          </button>
        )}
      </div>

      {/* Body */}
      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader size={20} className="animate-spin" style={{ color: "#9100BD" }} />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <Inbox size={28} style={{ color: "#9100BD", opacity: 0.3 }} />
            <p className="text-xs font-medium" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              No notifications yet
            </p>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: isDark ? "rgba(255,255,255,0.04)" : "#faf5ff" }}>
            {[...notifications]
  .sort((a, b) => new Date(b.time) - new Date(a.time)).map(n => {
              const isUnread = n.status === "UNREAD";
              return (
                <li
                  key={n.id}
                  className="px-4 py-3 flex items-start gap-3 transition-all cursor-default"
                  style={{
                    background: isUnread
                      ? isDark ? "rgba(145,0,189,0.08)" : "#faf5ff"
                      : "transparent",
                  }}
                >
                  {/* Dot indicator */}
                  <div className="mt-1.5 shrink-0">
                    {isUnread
                      ? <span className="w-2 h-2 rounded-full block" style={{ background: "#9100BD" }} />
                      : <span className="w-2 h-2 rounded-full block" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb" }} />
                    }
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: isDark ? (isUnread ? "#e9d5ff" : "#9ca3af") : (isUnread ? "#3b0764" : "#6b7280"),
                        fontWeight: isUnread ? 500 : 400,
                      }}
                    >
                      {n.note}
                    </p>
                    <p className="text-[10px] mt-1" style={{ color: isDark ? "#6b7280" : "#9ca3af" }}>
                      {formatTime(n.time)}
                    </p>
                  </div>

                  {/* Mark as read button */}
                  {isUnread && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      disabled={marking === n.id}
                      title="Mark as read"
                      className="shrink-0 p-1 rounded-lg transition-all mt-0.5"
                      style={{
                        background: isDark ? "rgba(145,0,189,0.15)" : "#f3e8ff",
                        color: "#9100BD",
                      }}
                    >
                      {marking === n.id
                        ? <Loader size={12} className="animate-spin" />
                        : <Check size={12} />
                      }
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div
          className="px-4 py-2.5 text-center"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#f0e9ff"}` }}
        >
          <p className="text-[10px]" style={{ color: isDark ? "#4b5563" : "#d1d5db" }}>
            {unreadCount === 0 ? "You're all caught up ✓" : `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;