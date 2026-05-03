import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { Link } from "react-router-dom";

const LEVEL_CONFIG = {
  LOW: {
    label: "LOW",
    text: "text-green-800",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  MODERATE: {
    label: "MODERATE",
    text: "text-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  HIGH: {
    label: "HIGH",
    text: "text-red-800",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  SEVERE: {
    label: "SEVERE",
    text: "text-purple-800",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
};

const RiskStatusWidget = () => {
  const [risk, setRisk] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError(true);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch the data
        const [riskRes, eligibleRes] = await Promise.all([
          axios.get("https://mindmate-production-81d8.up.railway.app/api/escalation/getRiskStatus", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://mindmate-production-81d8.up.railway.app/api/assessment/isEligible", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const rawRisk = riskRes.data?.riskLevel;
        const normalizedRisk =
          typeof rawRisk === "string"
            ? rawRisk.trim().toUpperCase()
            : null;

        setRisk(normalizedRisk);
        setEligible(eligibleRes.data === true);
        setError(false);
      } catch (err) {
        console.error("❌ API error:", err);
        // Only set error if we don't already have risk data to display
        if (!risk) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately on mount
    fetchData();

    // Set up an interval to automatically hit the backend every 30 seconds (30,000 ms)
    const intervalId = setInterval(fetchData, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [token, risk]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="p-3">
        <div className="h-20 rounded-2xl bg-gray-200 animate-pulse" />
      </div>
    );
  }

  // Error or Unknown State
  if (error || !risk || !LEVEL_CONFIG[risk]) {
    return (
      <div className="p-3">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-center text-xs text-gray-500 shadow-sm">
          {error ? "Unable to load risk status." : "Risk status unavailable."}
        </div>
      </div>
    );
  }

  const cfg = LEVEL_CONFIG[risk];

  return (
    <div className="p-1">
      <div
        className={clsx(
          "rounded-2xl shadow-sm p-4 space-y-3 border transition-all",
          cfg.bg,
          cfg.border
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className={clsx("text-sm font-semibold", cfg.text)}>
            Your Risk Status
          </span>

          <span
            className={clsx(
              "text-xs font-bold px-3 py-1 rounded-full bg-white/70",
              cfg.text
            )}
          >
            {cfg.label}
          </span>
        </div>

        {/* Message */}
        <p className={clsx("text-xs leading-relaxed", cfg.text)}>
          {risk === "LOW" && "You're doing well. Keep maintaining your mental wellness."}
          {risk === "MODERATE" && "Some concerns detected. A quick check-in could help."}
          {risk === "HIGH" && "Elevated stress detected. Consider taking assessment soon."}
          {risk === "SEVERE" && "Immediate attention recommended. Please take assessment."}
        </p>

        {/* CTA */}
        {eligible && (
          <>
            <div className="h-px bg-black/5" />

            <Link
              to="/user/assessments"
              className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white 
                         bg-gradient-to-r from-purple-500 to-blue-500 
                         hover:opacity-90 transition"
            >
              Take Risk Assessment →
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RiskStatusWidget;