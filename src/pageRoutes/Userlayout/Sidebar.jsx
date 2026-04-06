import { NavLink } from "react-router-dom";
import PsychoTalkLogoTrans from "../../public/assets/psychotalk_logo_trans.webp";
import { LiaAddressCardSolid } from "react-icons/lia";
import {
  LayoutDashboard, UserRound, Settings,
  Bell, HelpCircle, X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard",        path: "/user/dashboard",     icon: LayoutDashboard     },
  { name: "Appointments",     path: "/user/appointments",  icon: LiaAddressCardSolid },
  { name: "Profile",          path: "/user/profile",       icon: UserRound           },
  { name: "Settings",         path: "/user/settings",      icon: Settings            },
  { name: "Notifications",    path: "/user/notifications", icon: Bell                },
  { name: "Help",             path: "/user/help",          icon: HelpCircle          },
];

const Sidebar = ({ open, setOpen }) => {
  const username = localStorage.getItem("username") || "User";

  return (
    <>
      <style>{`
        .sb-active {
          background: linear-gradient(90deg,#3C9BF9,#9100BD);
          color: #fff !important;
          box-shadow: 0 4px 16px rgba(145,0,189,0.22);
        }
        .sb-active svg { color: #fff !important; }

        .sb-idle {
          color: #6b7280;
          transition: background 0.18s, color 0.18s;
        }
        .dark .sb-idle { color: #9ca3af; }

        .sb-idle:hover {
          background: linear-gradient(90deg,rgba(60,155,249,0.08),rgba(145,0,189,0.08));
          color: #9100BD;
        }
        .dark .sb-idle:hover {
          background: rgba(145,0,189,0.14);
          color: #c084fc;
        }
      `}</style>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-72
          flex flex-col
          bg-white dark:bg-gray-900
          border-r border-purple-100 dark:border-gray-700
          shadow-lg
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Top gradient accent */}
        <div className="h-0.5 w-full shrink-0"
          style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

        {/* ── Logo row ── */}
        <div className="flex items-center justify-between px-2 py-2
                        border-b border-purple-100 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={PsychoTalkLogoTrans}
                alt="logo"
                className="w-10 h-10"
              />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              PsychoTalk
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 dark:text-gray-500
                       hover:bg-purple-50 dark:hover:bg-gray-800
                       hover:text-purple-600 dark:hover:text-purple-400
                       transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── User pill ── */}
        <div className="mx-3 mt-4 mb-2 px-3 py-2.5 rounded-xl
                        bg-linear-to-r from-purple-50 to-blue-50
                        dark:from-purple-900/20 dark:to-blue-900/20
                        border border-purple-100 dark:border-gray-700
                        flex items-center gap-3 shrink-0">
          <div className="p-0.5 rounded-full shrink-0"
            style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
            <img
              src={`https://i.pravatar.cc/80?u=${username}`}
              alt={username}
              className="w-8 h-8 rounded-full object-cover block"
              style={{ border: "2px solid white" }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 dark:text-white truncate">{username}</p>
            <p className="text-[10px] font-medium text-purple-500 dark:text-purple-400">Member</p>
          </div>
        </div>

        {/* ── Nav links ── */}
        <nav className="flex flex-col gap-1 px-3 py-2 flex-1 overflow-y-auto">

          {/* Section label */}
          <p className="text-[10px] font-semibold uppercase tracking-widest
                        text-gray-400 dark:text-gray-600 px-3 mb-1">
            Navigation
          </p>

          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-lg font-medium
                 ${isActive ? "sb-active" : "sb-idle"}`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span className="truncate">{name}</span>
            </NavLink>
          ))}
        </nav>

        {/* ── Bottom divider + version ── */}
        <div className="shrink-0 px-3 pb-4 pt-2
                        border-t border-purple-100 dark:border-gray-700 mt-2">
          <div className="h-px mb-3"
            style={{ background: "linear-gradient(to right,#ddd6fe,transparent)" }} />
          <p className="text-[10px] text-center text-gray-300 dark:text-gray-600 font-medium">
            PsychoTalk · v1.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;