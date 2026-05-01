import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { 
  Sparkles, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Activity 
} from "lucide-react";

const SEVERITY_CONFIG = {
  LOW: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-500 dark:text-emerald-400",
  },
  MODERATE: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-400/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  HIGH: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10 dark:bg-orange-400/10",
    border: "border-orange-500/20",
    iconColor: "text-orange-500 dark:text-orange-400",
  },
  SEVERE: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10 dark:bg-rose-400/10",
    border: "border-rose-500/20",
    iconColor: "text-rose-500 dark:text-rose-400",
  },
};

const AssessmentResults = () => {
  const token = localStorage.getItem("token");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/assessment/results",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResults(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load assessments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchResults();
    } else {
      setLoading(false);
      setError("No authentication token found.");
    }
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-slate-950/80 border border-slate-200/40 dark:border-slate-800/60 rounded-3xl p-6 shadow-2xl max-w-4xl mx-auto backdrop-blur-xl">
        <div className="animate-pulse space-y-5">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          </div>
          <div className="h-20 bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
          <div className="h-20 bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 dark:bg-slate-950/80 border border-red-500/20 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto text-center space-y-4 backdrop-blur-xl">
        <div className="mx-auto w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-500/5">
          <AlertTriangle className="h-6 w-6 animate-pulse" />
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">Something Went Wrong</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{error}</p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-white/80 dark:bg-slate-950/80 border border-slate-200/40 dark:border-slate-800/60 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto text-center space-y-5 backdrop-blur-xl">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 dark:from-indigo-400 dark:via-purple-400 dark:to-fuchsia-400">
          No Assessment Insights Yet
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Take your first assessment to unlock personalized AI insights and professional recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-200/40 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl mx-auto">
      {/* Premium Gradient Banner */}
      <div className="h-2.5 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-400 dark:to-fuchsia-400" />

      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-400 dark:to-fuchsia-400">
              Assessment Insights
            </h2>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1.5 flex items-center gap-1">
              <Activity size={14} />
              Review your historical assessments and recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-indigo-600 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/40 px-4 py-2 rounded-2xl font-black border border-indigo-500/10 shadow-sm shadow-indigo-500/5">
            <TrendingUp size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span>{results.length} Assessments Tracked</span>
          </div>
        </div>

        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-2">
          {results
            .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
            .map((r, index) => {
              const severityKey = r.severity?.toUpperCase();
              const cfg = SEVERITY_CONFIG[severityKey] || {
                text: "text-slate-600 dark:text-slate-400",
                bg: "bg-slate-100 dark:bg-slate-800/50",
                border: "border-slate-200/50 dark:border-slate-700/50",
                iconColor: "text-slate-500 dark:text-slate-400",
              };
              
              const isExpanded = expandedId === r.id;

              return (
                <div
                  key={r.id || index}
                  className={clsx(
                    "group rounded-2xl border bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900/60 dark:to-slate-900/20 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-xl",
                    isExpanded 
                      ? "border-indigo-500/30 dark:border-indigo-400/30 ring-2 ring-indigo-500/5 dark:ring-indigo-400/5" 
                      : "border-slate-200/40 dark:border-slate-800/40 hover:border-indigo-400/20 dark:hover:border-indigo-400/20"
                  )}
                >
                  {/* Header / Trigger */}
                  <button
                    onClick={() => toggleExpand(r.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded-2xl"
                  >
                    <div>
                      <p className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                        {r.assessmentType}
                      </p>
                      <div className="flex items-center gap-2.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-2">
                        <Calendar size={12} />
                        {new Date(r.createAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={clsx(
                          "text-[10px] font-black px-3.5 py-1.5 rounded-2xl border shadow-sm flex items-center gap-1.5",
                          cfg.bg,
                          cfg.text,
                          cfg.border
                        )}
                      >
                        <span className={clsx("w-1.5 h-1.5 rounded-full animate-ping", cfg.bg, cfg.iconColor)}></span>
                        {severityKey || "UNKNOWN"}
                      </span>

                      <div className="text-slate-400 dark:text-slate-600 bg-slate-100/50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200/30 dark:border-slate-700/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-all duration-300">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-0 space-y-5 border-t border-slate-100/50 dark:border-slate-800/40 animate-fadeIn">
                      
                      {/* Score row */}
                      <div className="flex items-center justify-between border-b border-dashed border-slate-200 dark:border-slate-800 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-400 dark:text-slate-500">Assessment Score:</span>
                        <span className="font-black text-slate-900 dark:text-slate-100 text-sm bg-slate-100/40 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200/30 dark:border-slate-700/30">
                          {r.totalScore}
                        </span>
                      </div>

                      {/* AI Interpretation */}
                      {r.aiInterpretation && r.aiInterpretation !== "Unknown" && (
                        <div className="rounded-2xl border border-indigo-500/10 bg-gradient-to-r from-indigo-50/10 via-purple-50/5 to-fuchsia-50/10 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-fuchsia-950/20 p-5 space-y-2.5 shadow-sm">
                          <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                            <Sparkles size={13} />
                            AI Insight
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {r.aiInterpretation}
                          </p>
                        </div>
                      )}

                      {/* AI Recommendation */}
                      {r.recommendationSummary && r.recommendationSummary !== "Unknown" && (
                        <div className="rounded-2xl border border-fuchsia-500/10 bg-gradient-to-r from-fuchsia-50/10 via-purple-50/5 to-indigo-50/10 dark:from-fuchsia-950/20 dark:via-purple-950/10 dark:to-indigo-950/20 p-5 space-y-2.5 shadow-sm">
                          <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-fuchsia-600 dark:text-fuchsia-400 uppercase">
                            <Sparkles size={13} />
                            AI Recommendation
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {r.recommendationSummary}
                          </p>
                        </div>
                      )}

                      {/* Expert Warning */}
                      {r.expertConsultationRequired && (
                        <div className="flex items-start sm:items-center gap-4 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 shadow-sm">
                          <AlertTriangle size={18} className="text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                          <div className="space-y-0.5">
                            <span className="block font-black text-sm tracking-tight text-rose-800 dark:text-rose-300">
                              Expert Consultation Required
                            </span>
                            <span className="block text-[10px] text-rose-600/80 dark:text-rose-400/80 font-semibold">
                              These assessment results may require a professional review. Please consult with an expert.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;