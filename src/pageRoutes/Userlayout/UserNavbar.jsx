import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import NotificationDropdown from "../../protected/components/NotificationDropdown";
import ProfileDropdown from "../../protected/components/ProfileDropdown";
import { NavLink } from "react-router-dom";

export const UserNavbar = ({ setSidebarOpen }) => {
  const navItems = [

   // { name: "Motivations", path: "/user/motivations" },
     { name: "QuickChat",        path: "/user/quickChat" },
   { name: "WellnessExpert",        path: "/user/wellness" },
    { name: "Assessments",        path: "/user/assessments" },
    { name: "CareJourney",        path: "/user/care-journey" },
   
  ];

  const [darkMode, setDarkMode]                 = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu]   = useState(false);
  const [mobileNavOpen, setMobileNavOpen]       = useState(false);
  const notificationRef = useRef(null);
  const profileRef      = useRef(null);

  /* ── Restore saved theme ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  /* ── Close dropdowns on outside click ── */
  useEffect(() => {
    const handle = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target))
        setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <>
      <style>{`
        .nav-link-active {
          color: #9100BD;
          position: relative;
        }
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #3C9BF9, #9100BD);
        }
        .nav-link-idle {
          color: #6b7280;
          transition: color 0.15s ease;
        }
        .dark .nav-link-idle { color: #9ca3af; }
        .nav-link-idle:hover { color: #9100BD; }
        .dark .nav-link-idle:hover { color: #c084fc; }
      `}</style>

      {/* ════════════════════════════════════════
          MAIN NAVBAR
      ════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 w-full
                         bg-white dark:bg-gray-900
                         border-b border-purple-100 dark:border-gray-700
                         shadow-sm">

        {/* Gradient accent line */}
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

        <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-4">

          {/* ── LEFT: hamburger + brand ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen?.(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400
                         hover:bg-purple-50 dark:hover:bg-gray-800
                         hover:text-purple-600 dark:hover:text-purple-400
                         transition-colors"
            >
              <Menu size={22} />
            </button>

            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-base font-bold text-gray-800 dark:text-white hidden sm:block">
                MindSpace
              </span>
            </div>
          </div>

          {/* ── MIDDLE: nav links (desktop) ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 rounded-lg text-lg font-medium transition-all duration-150
                   ${isActive
                    ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {name}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── RIGHT: actions ── */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* Mobile nav toggle */}
            <button
              onClick={() => setMobileNavOpen(p => !p)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400
                         hover:bg-purple-50 dark:hover:bg-gray-800
                         hover:text-purple-600 transition-colors"
            >
              {mobileNavOpen ? <X size={20} /> : (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md"
                  style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)", color: "white" }}>
                  Nav
                </span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400
                         hover:bg-purple-50 dark:hover:bg-gray-800
                         hover:text-purple-600 dark:hover:text-yellow-400
                         transition-colors"
              title={darkMode ? "Switch to light" : "Switch to dark"}
            >
              {darkMode ? (
                /* Sun icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1"  x2="12" y2="3"  />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3"  y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => { setShowNotifications(p => !p); setShowProfileMenu(false); }}
                className="relative p-1.5 rounded-lg text-gray-500 dark:text-gray-400
                           hover:bg-purple-50 dark:hover:bg-gray-800
                           hover:text-purple-600 transition-colors"
              >
                <Bell size={20} />
                {/* unread dot */}
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ background: "linear-gradient(135deg,#ec4899,#9100BD)" }} />
              </button>
              {showNotifications && <NotificationDropdown />}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => { setShowProfileMenu(p => !p); setShowNotifications(false); }}
                className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-xl
                           border border-gray-100 dark:border-gray-700
                           bg-gray-50 dark:bg-gray-800
                           hover:border-purple-300 dark:hover:border-purple-600
                           transition-colors"
              >
                <div className="p-0.5 rounded-full"
                  style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)" }}>
                  <img
                    src={"https://i.pravatar.cc/80?u=" + sessionStorage.getItem("name")}
                    alt="Avatar"
                    className="w-7 h-7 rounded-full object-cover block"
                    style={{ border: "2px solid white" }}
                  />
                </div>
                <ChevronDown size={14}
                  className={`text-gray-500 dark:text-gray-400 transition-transform duration-200
                              ${showProfileMenu ? "rotate-180" : "rotate-0"}`} />
              </button>
              {showProfileMenu && <ProfileDropdown />}
            </div>

          </div>
        </div>

        {/* ── MOBILE NAV DROPDOWN ── */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-purple-100 dark:border-gray-700
                          bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-1">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition-colors
                   ${isActive
                    ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
};